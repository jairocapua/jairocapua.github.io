"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { playClick } from "@/lib/click-sound";

// What the pointer grows over: real controls plus anything the site already
// marks clickable with Tailwind's cursor-pointer.
const INTERACTIVE = "a, button, summary, label, select, [role='button'], .cursor-pointer";

const STATE_SPRING = { type: "spring", stiffness: 500, damping: 26 } as const;
const BURST_MS = 550;
const SPARKS = 8;

type Burst = { id: number; x: number; y: number };

/**
 * Triangle pointer for mouse and trackpad, a spark burst on every click
 * (touch taps too), and the click sound. The layer is mix-blend-difference
 * with white marks, so it inverts whatever is under it in either theme.
 */
export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [fine, setFine] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);
  const visibleRef = useRef(false);
  const nextId = useRef(0);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setFine(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // globals.css hides the native cursor under this class.
  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor", fine);
    return () => document.documentElement.classList.remove("custom-cursor");
  }, [fine]);

  useEffect(() => {
    const show = (next: boolean) => {
      if (visibleRef.current === next) return;
      visibleRef.current = next;
      setVisible(next);
    };

    const burst = (bx: number, by: number) => {
      if (reduceMotion) return;
      const id = nextId.current++;
      setBursts((all) => [...all.slice(-5), { id, x: bx, y: by }]);
      window.setTimeout(() => setBursts((all) => all.filter((b) => b.id !== id)), BURST_MS);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x.set(e.clientX);
      y.set(e.clientY);
      show(true);
    };

    const onOver = (e: PointerEvent) => {
      if (e.target instanceof Element) setHovering(!!e.target.closest(INTERACTIVE));
    };

    const onDown = (e: PointerEvent) => {
      // Touch waits for pointerup: a scroll cancels the pointer instead, so
      // swiping through the page stays silent.
      if (e.button !== 0 || e.pointerType === "touch") return;
      setPressed(true);
      playClick("press");
      burst(e.clientX, e.clientY);
    };

    const onUp = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (e.pointerType === "touch") {
        show(false);
        playClick("press");
        burst(e.clientX, e.clientY);
        return;
      }
      setPressed(false);
      playClick("release");
    };

    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) show(false);
    };
    const onBlur = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseout", onOut);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("blur", onBlur);
    };
  }, [reduceMotion, x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
      {bursts.map((b) => (
        <span key={b.id} className="click-burst" style={{ left: b.x, top: b.y }}>
          <span className="click-burst-ring" />
          {Array.from({ length: SPARKS }, (_, i) => (
            <span
              key={i}
              className="click-burst-spark"
              style={{ "--angle": `${(360 / SPARKS) * i}deg` } as CSSProperties}
            />
          ))}
        </span>
      ))}
      {fine && (
        // The outer div follows the mouse 1:1; the svg scales from its tip,
        // which sits on the hotspot, so the point never drifts off target.
        <motion.div className="absolute left-0 top-0" style={{ x, y }}>
          <motion.svg
            viewBox="0 0 20 20"
            className="-ml-px -mt-px size-5 fill-white stroke-white"
            strokeWidth={1.5}
            strokeLinejoin="round"
            style={{ originX: "1px", originY: "1px" }}
            initial={false}
            animate={{
              opacity: visible ? 1 : 0,
              scale: pressed ? 0.8 : hovering ? 1.2 : 1,
              rotate: hovering && !pressed ? -8 : 0,
            }}
            transition={STATE_SPRING}
          >
            <path d="M1 1 18 7.5 10.5 10.5 7.5 18Z" />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
}
