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
let keyOut: GainNode | null = null;
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
    // Typing gets its own, louder bus. A compressor keeps fast runs of keys
    // from stacking into clipping.
    const limiter = ctx.createDynamicsCompressor();
    limiter.threshold.value = -10;
    limiter.knee.value = 6;
    limiter.ratio.value = 8;
    limiter.attack.value = 0.002;
    limiter.release.value = 0.08;
    limiter.connect(ctx.destination);
    keyOut = ctx.createGain();
    keyOut.gain.value = 0.75;
    keyOut.connect(limiter);
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

// A loud, creamy thock: a soft-edged, muffled knock for the keycap bottoming
// out, a rounded mid "pop" for the keycap itself, and a low falling body for
// the case. Stabilized keys (space, enter, backspace) are bigger, so they sit
// lower and ring longer.
type KeyVoice = { knock: number; pop: number; body: number; gain: number; decay: number };

const KEY_VOICES: Record<"alpha" | "space" | "enter" | "backspace", KeyVoice> = {
  alpha: { knock: 700, pop: 420, body: 140, gain: 0.9, decay: 0.075 },
  space: { knock: 480, pop: 290, body: 88, gain: 1, decay: 0.13 },
  enter: { knock: 560, pop: 330, body: 105, gain: 1, decay: 0.11 },
  backspace: { knock: 600, pop: 360, body: 115, gain: 0.95, decay: 0.1 },
};

function keyVoice(key: string) {
  if (key === " ") return KEY_VOICES.space;
  if (key === "Enter") return KEY_VOICES.enter;
  if (key === "Backspace" || key === "Delete") return KEY_VOICES.backspace;
  return KEY_VOICES.alpha;
}

export function playKey(key: string) {
  if (!isClickSoundOn()) return;
  const ac = audio();
  if (!ac || !keyOut || !noise) return;

  const voice = keyVoice(key);
  const t = ac.currentTime;
  // Every key on a real board sounds a little different; so should these.
  const drift = 1 + (Math.random() - 0.5) * 0.12;
  const level = voice.gain * (0.85 + Math.random() * 0.15);

  // The knock fades in over a couple of milliseconds: an instant edge is
  // what makes a switch sound clacky instead of creamy.
  const knock = ac.createBufferSource();
  knock.buffer = noise;
  const muffle = ac.createBiquadFilter();
  muffle.type = "lowpass";
  muffle.frequency.value = voice.knock * drift;
  muffle.Q.value = 0.7;
  const knockGain = ac.createGain();
  knockGain.gain.setValueAtTime(0.001, t);
  knockGain.gain.exponentialRampToValueAtTime(level * 1.2, t + 0.002);
  knockGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);
  knock.connect(muffle).connect(knockGain).connect(keyOut);
  knock.start(t);
  knock.stop(t + 0.03);

  const pop = ac.createOscillator();
  pop.type = "sine";
  pop.frequency.setValueAtTime(voice.pop * drift, t);
  pop.frequency.exponentialRampToValueAtTime(voice.pop * 0.8, t + 0.04);
  const popGain = ac.createGain();
  popGain.gain.setValueAtTime(0.001, t);
  popGain.gain.exponentialRampToValueAtTime(level * 0.9, t + 0.003);
  popGain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
  pop.connect(popGain).connect(keyOut);
  pop.start(t);
  pop.stop(t + 0.05);

  // Triangle, not sine: its overtones keep the low body audible on laptop
  // and phone speakers that can't reproduce the fundamental.
  const body = ac.createOscillator();
  body.type = "triangle";
  body.frequency.setValueAtTime(voice.body * drift, t);
  body.frequency.exponentialRampToValueAtTime(voice.body * 0.5, t + voice.decay);
  const bodyGain = ac.createGain();
  bodyGain.gain.setValueAtTime(0.001, t);
  bodyGain.gain.exponentialRampToValueAtTime(level * 1.8, t + 0.004);
  bodyGain.gain.exponentialRampToValueAtTime(0.001, t + voice.decay);
  body.connect(bodyGain).connect(keyOut);
  body.start(t);
  body.stop(t + voice.decay + 0.01);
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
