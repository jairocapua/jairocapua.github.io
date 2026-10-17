// A synthesized UI click: a filtered noise tick for the transient plus a
// short falling blip for body. Nothing to download, and the AudioContext is
// only created inside a user gesture, which browsers' autoplay rules require.

export type ClickKind = "press" | "release";

const STORAGE_KEY = "click-sound";

// The release is the switch springing back: higher and quieter than the press.
const VOICES: Record<ClickKind, { tick: number; blip: number; gain: number; decay: number }> = {
  press: { tick: 2600, blip: 1100, gain: 0.9, decay: 0.035 },
  release: { tick: 4200, blip: 1700, gain: 0.4, decay: 0.02 },
};

let ctx: AudioContext | null = null;
let out: GainNode | null = null;
let noise: AudioBuffer | null = null;
let enabled: boolean | null = null;
const listeners = new Set<() => void>();

function audio() {
  if (!ctx) {
    if (typeof AudioContext === "undefined") return null;
    ctx = new AudioContext();
    out = ctx.createGain();
    out.gain.value = 0.3;
    out.connect(ctx.destination);
    noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.03), ctx.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function isClickSoundOn() {
  if (enabled === null) {
    try {
      enabled = localStorage.getItem(STORAGE_KEY) !== "off";
    } catch {
      enabled = true;
    }
  }
  return enabled;
}

export function setClickSoundOn(on: boolean) {
  enabled = on;
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Storage blocked (private mode): the choice lasts for this page view.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeClickSound(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function playClick(kind: ClickKind = "press") {
  if (!isClickSoundOn()) return;
  const ac = audio();
  if (!ac || !out || !noise) return;

  const voice = VOICES[kind];
  const t = ac.currentTime;
  // A few percent of pitch drift so a run of clicks doesn't sound looped.
  const drift = 1 + (Math.random() - 0.5) * 0.08;

  const tick = ac.createBufferSource();
  tick.buffer = noise;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = voice.tick * drift;
  band.Q.value = 1.4;
  const tickGain = ac.createGain();
  tickGain.gain.setValueAtTime(voice.gain, t);
  tickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
  tick.connect(band).connect(tickGain).connect(out);
  tick.start(t);
  tick.stop(t + 0.02);

  const blip = ac.createOscillator();
  blip.type = "triangle";
  blip.frequency.setValueAtTime(voice.blip * drift, t);
  blip.frequency.exponentialRampToValueAtTime(voice.blip * 0.3, t + voice.decay);
  const blipGain = ac.createGain();
  blipGain.gain.setValueAtTime(0.001, t);
  blipGain.gain.exponentialRampToValueAtTime(voice.gain * 0.5, t + 0.002);
  blipGain.gain.exponentialRampToValueAtTime(0.001, t + voice.decay);
  blip.connect(blipGain).connect(out);
  blip.start(t);
  blip.stop(t + voice.decay + 0.01);
}
