"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { CHAT_BUSY_EVENT, OPEN_CHAT_EVENT, chatEnabled, openChat } from "@/lib/chat-client";

// Clawd, the Claude Code mascot, redrawn from the block-character sprite in
// Claude Code's welcome banner. One unit is a quarter of a terminal cell, so
// it is 1 wide and 2 tall; the sprite is 16 x 10 units.
const W = 64;
const H = 40;
const EDGE = 24;
const SPEED = 70; // px per second
// Space kept from the dock, enough for it to magnify under the cursor (about
// 20px a side) without covering Clawd.
const DOCK_GAP = 32;
// How often a stroll crosses to the other side of the dock.
const SWITCH_CHANCE = 0.15;
const VERBS = [
  "Clauding",
  "Pondering",
  "Noodling",
  "Percolating",
  "Cogitating",
  "Schlepping",
  "Marinating",
  "Moseying",
  "Ruminating",
  "Vibing",
  "Honking",
  "Reticulating",
  "Finagling",
  "Smooshing",
  "Simmering",
];
// Claude Code's spinner, played forward then back.
const SPINNER = ["·", "✢", "✳", "✶", "✻", "✽", "✻", "✶", "✳", "✢"];
// Until the chat has been opened, Clawd offers it now and then.
const HINT_EVERY = 45_000;
const HINT_FOR = 5_000;
const CHAT_OPENED_KEY = "chat:opened";

type Look = -1 | 0 | 1;
type Poke = { id: number; verb: string };

/**
 * A desktop pet: Clawd wanders the bottom of the viewport, sometimes heads
 * for the cursor, watches it while resting, and jumps when clicked. It keeps
 * to one side of the dock and never goes behind it; to change sides it walks
 * off the screen and back in from the other edge. With the chat on, a poke
 * opens it, and Clawd stops to think while an answer streams.
 */
export function ClaudePet() {
  const reduceMotion = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState<Look>(-1);
  const [gaze, setGaze] = useState<Look>(0);
  const [poke, setPoke] = useState<Poke | null>(null);
  const [thinking, setThinking] = useState(false);
  const [hint, setHint] = useState(false);
  const x = useMotionValue(-W);
  const y = useMotionValue(0);
  const pointerX = useRef<number | null>(null);
  const gazeRef = useRef<Look>(0);
  const pokeTimer = useRef<number>(undefined);
  const pokeCount = useRef(0);
  // Let the chat pause the stroll loop from outside its effect.
  const paused = useRef(false);
  const walkRef = useRef<ReturnType<typeof animate>>(undefined);
  const restRef = useRef<() => void>(undefined);

  // Phones get the dock across the whole floor, so the pet stays home.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!wide) return;
    const onMove = (e: PointerEvent) => {
      pointerX.current = e.clientX;
      const offset = e.clientX - (x.get() + W / 2);
      const next: Look = offset > 40 ? 1 : offset < -40 ? -1 : 0;
      if (next !== gazeRef.current) {
        gazeRef.current = next;
        setGaze(next);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [wide, x]);

  useEffect(() => {
    if (!wide) return;
    const floor = () => document.documentElement.clientWidth;
    // Which side of the dock Clawd is on. He never walks behind it.
    let right = true;

    // The range x can take on Clawd's side, between the screen edge and the dock.
    const lane = () => {
      const dock = document.querySelector("[data-dock]")?.firstElementChild?.getBoundingClientRect();
      const min = right && dock ? dock.right + DOCK_GAP : EDGE;
      const max = !right && dock ? dock.left - DOCK_GAP - W : floor() - W - EDGE;
      return [min, max] as const;
    };
    const clamp = (v: number) => {
      const [min, max] = lane();
      return Math.min(Math.max(v, min), max);
    };

    if (reduceMotion) {
      x.set(clamp(floor()));
      return;
    }

    let timer: number | undefined;
    let walk: ReturnType<typeof animate> | undefined;

    const pickTarget = () => {
      const [min, max] = lane();
      for (let i = 0; i < 6; i++) {
        const chase = pointerX.current !== null && Math.random() < 0.35;
        const tx = clamp(chase ? pointerX.current! - W / 2 : min + Math.random() * (max - min));
        if (Math.abs(tx - x.get()) > 80) return tx;
      }
      return null;
    };

    const rest = () => {
      setWalking(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(stroll, 1500 + Math.random() * 4000);
    };
    restRef.current = rest;

    const walkTo = (tx: number, then: () => void) => {
      const from = x.get();
      setDir(tx > from ? 1 : -1);
      setWalking(true);
      walk = walkRef.current = animate(x, tx, {
        duration: Math.abs(tx - from) / SPEED,
        ease: "linear",
        onComplete: then,
      });
    };

    // Off one screen edge and back in from the other, landing on the far side of the dock.
    const switchSides = () =>
      walkTo(right ? floor() : -W, () => {
        right = !right;
        x.set(right ? floor() : -W);
        const [min, max] = lane();
        walkTo(min + Math.random() * (max - min), rest);
      });

    const stroll = () => {
      if (paused.current) return rest();
      if (Math.random() < SWITCH_CHANCE) return switchSides();
      const tx = pickTarget();
      if (tx === null) return rest();
      walkTo(tx, rest);
    };

    const onResize = () => {
      walk?.stop();
      window.clearTimeout(timer);
      x.set(clamp(x.get()));
      rest();
    };

    // Walk in from the right edge.
    x.set(floor());
    timer = window.setTimeout(stroll, 800);
    window.addEventListener("resize", onResize);
    return () => {
      walk?.stop();
      window.clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, [wide, reduceMotion, x]);

  useEffect(() => () => window.clearTimeout(pokeTimer.current), []);

  // Stand still and think while the chat streams an answer.
  useEffect(() => {
    if (!chatEnabled) return;
    const onBusy = (e: Event) => {
      const busy = (e as CustomEvent<boolean>).detail;
      paused.current = busy;
      setThinking(busy);
      if (busy) {
        walkRef.current?.stop();
        restRef.current?.();
      }
    };
    window.addEventListener(CHAT_BUSY_EVENT, onBusy);
    return () => window.removeEventListener(CHAT_BUSY_EVENT, onBusy);
  }, []);

  useEffect(() => {
    if (!chatEnabled || !wide) return;
    try {
      if (sessionStorage.getItem(CHAT_OPENED_KEY) === "1") return;
    } catch {}

    let hide: number | undefined;
    const every = window.setInterval(() => {
      setHint(true);
      hide = window.setTimeout(() => setHint(false), HINT_FOR);
    }, HINT_EVERY);
    const stop = () => {
      window.clearInterval(every);
      window.clearTimeout(hide);
    };
    const onOpen = () => {
      try {
        sessionStorage.setItem(CHAT_OPENED_KEY, "1");
      } catch {}
      stop();
      setHint(false);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => {
      stop();
      window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
    };
  }, [wide]);

  const onPoke = () => {
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    setPoke({ id: pokeCount.current++, verb });
    if (!reduceMotion) {
      animate(y, [0, -26, 0], { duration: 0.5, times: [0, 0.4, 1], ease: ["easeOut", "easeIn"] });
    }
    window.clearTimeout(pokeTimer.current);
    pokeTimer.current = window.setTimeout(() => setPoke(null), 2200);
    if (chatEnabled) openChat();
  };

  if (!wide) return null;

  const look = walking ? dir : gaze;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed bottom-0 left-0 z-20"
      style={{ x, width: W, height: H }}
    >
      <AnimatePresence>
        {thinking ? (
          <Bubble key="thinking" verb="Thinking" />
        ) : poke ? (
          <Bubble key={poke.id} verb={poke.verb} />
        ) : hint ? (
          <Bubble key="hint" text="Ask me about Jairo!" />
        ) : null}
      </AnimatePresence>
      <motion.svg
        viewBox="1 0 16 10"
        width={W}
        height={H}
        shapeRendering="crispEdges"
        className="clawd pointer-events-auto block cursor-pointer"
        data-walking={walking}
        data-excited={!!poke || thinking}
        style={{ y }}
        onClick={onPoke}
      >
        <g fill="#D77757">
          <rect x={3} y={0} width={12} height={8} />
          <rect className="clawd-arm" x={1} y={4} width={2} height={2} />
          <rect className="clawd-arm" x={15} y={4} width={2} height={2} />
          <rect className="clawd-leg-a" x={4} y={8} width={1} height={2} />
          <rect className="clawd-leg-b" x={6} y={8} width={1} height={2} />
          <rect className="clawd-leg-a" x={11} y={8} width={1} height={2} />
          <rect className="clawd-leg-b" x={13} y={8} width={1} height={2} />
        </g>
        <g fill="#141414" className="clawd-eyes" style={{ transform: `translateX(${look}px)` }}>
          <rect className="clawd-eye" x={5} y={2} width={1} height={2} />
          <rect className="clawd-eye" x={12} y={2} width={1} height={2} />
        </g>
      </motion.svg>
    </motion.div>
  );
}

/** A speech bubble: a spinner and "<verb>…", or plain `text`. */
function Bubble({ verb, text }: { verb?: string; text?: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!verb) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 120);
    return () => window.clearInterval(id);
  }, [verb]);

  return (
    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="whitespace-nowrap rounded-md border bg-card px-2 py-1 font-mono text-xs text-card-foreground shadow-sm"
      >
        {verb ? (
          <>
            <span className="inline-block w-3 text-[#D77757]">{SPINNER[frame]}</span>
            {verb}…
          </>
        ) : (
          text
        )}
      </motion.div>
    </div>
  );
}
