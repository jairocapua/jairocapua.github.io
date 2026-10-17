"use client";

import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Clawd, the Claude Code mascot, redrawn from the block-character sprite in
// Claude Code's welcome banner. One unit is a quarter of a terminal cell, so
// it is 1 wide and 2 tall; the sprite is 16 x 10 units.
const W = 64;
const H = 40;
const EDGE = 24;
const SPEED = 70; // px per second
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

type Look = -1 | 0 | 1;
type Poke = { id: number; verb: string };

/**
 * A desktop pet: Clawd wanders the bottom of the viewport, sometimes heads
 * for the cursor, watches it while resting, and jumps when clicked. It walks
 * behind the dock but never stops there.
 */
export function ClaudePet() {
  const reduceMotion = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [walking, setWalking] = useState(false);
  const [dir, setDir] = useState<Look>(-1);
  const [gaze, setGaze] = useState<Look>(0);
  const [poke, setPoke] = useState<Poke | null>(null);
  const x = useMotionValue(-W);
  const y = useMotionValue(0);
  const pointerX = useRef<number | null>(null);
  const gazeRef = useRef<Look>(0);
  const pokeTimer = useRef<number>(undefined);
  const pokeCount = useRef(0);

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
    const clamp = (v: number) => Math.min(Math.max(v, EDGE), floor() - W - EDGE);

    if (reduceMotion) {
      x.set(clamp(floor()));
      return;
    }

    let timer: number | undefined;
    let walk: ReturnType<typeof animate> | undefined;

    const behindDock = (tx: number) => {
      const dock = document.querySelector("[data-dock]")?.firstElementChild?.getBoundingClientRect();
      return !!dock && tx + W > dock.left - 12 && tx < dock.right + 12;
    };

    const pickTarget = () => {
      for (let i = 0; i < 6; i++) {
        const chase = pointerX.current !== null && Math.random() < 0.35;
        const tx = clamp(
          chase ? pointerX.current! - W / 2 : EDGE + Math.random() * (floor() - W - 2 * EDGE)
        );
        if (!behindDock(tx) && Math.abs(tx - x.get()) > 80) return tx;
      }
      return null;
    };

    const rest = () => {
      setWalking(false);
      timer = window.setTimeout(stroll, 1500 + Math.random() * 4000);
    };

    const stroll = () => {
      const tx = pickTarget();
      if (tx === null) return rest();
      const from = x.get();
      setDir(tx > from ? 1 : -1);
      setWalking(true);
      walk = animate(x, tx, {
        duration: Math.abs(tx - from) / SPEED,
        ease: "linear",
        onComplete: rest,
      });
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

  const onPoke = () => {
    const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
    setPoke({ id: pokeCount.current++, verb });
    if (!reduceMotion) {
      animate(y, [0, -26, 0], { duration: 0.5, times: [0, 0.4, 1], ease: ["easeOut", "easeIn"] });
    }
    window.clearTimeout(pokeTimer.current);
    pokeTimer.current = window.setTimeout(() => setPoke(null), 2200);
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
        {poke && <Bubble key={poke.id} verb={poke.verb} />}
      </AnimatePresence>
      <motion.svg
        viewBox="1 0 16 10"
        width={W}
        height={H}
        shapeRendering="crispEdges"
        className="clawd pointer-events-auto block cursor-pointer"
        data-walking={walking}
        data-excited={!!poke}
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

function Bubble({ verb }: { verb: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => (f + 1) % SPINNER.length), 120);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 6, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 4, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="whitespace-nowrap rounded-md border bg-card px-2 py-1 font-mono text-xs text-card-foreground shadow-sm"
      >
        <span className="inline-block w-3 text-[#D77757]">{SPINNER[frame]}</span>
        {verb}…
      </motion.div>
    </div>
  );
}
