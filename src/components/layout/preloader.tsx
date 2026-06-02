"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { DATA } from "@/data/resume";

/** Minimum time the overlay stays up so it doesn't flicker on fast loads. */
const MIN_DISPLAY_MS = 650;
/** Safety net — never trap the user behind the overlay if `load` never fires. */
const MAX_DISPLAY_MS = 4000;

/**
 * Full-screen brand preloader shown on the initial page load. It mounts with
 * the server-rendered HTML (so there's no flash of bare content), then fades
 * out once the window has finished loading. Theme-aware via `bg-background`.
 */
export function Preloader() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const start = performance.now();

    const finish = () => {
      const remaining = MIN_DISPLAY_MS - (performance.now() - start);
      window.setTimeout(() => setLoading(false), Math.max(0, remaining));
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    const safety = window.setTimeout(() => setLoading(false), MAX_DISPLAY_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(safety);
    };
  }, []);

  // Lock background scroll while the overlay is up.
  React.useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          role="status"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {/* spinning ring */}
              <span className="absolute -inset-2 rounded-full border-[3px] border-fb-blue/20 border-t-fb-blue animate-spin motion-reduce:animate-none" />
              {/* avatar */}
              <Image
                src={DATA.avatarUrl}
                alt=""
                width={96}
                height={96}
                priority
                className="size-24 rounded-full object-cover shadow-md ring-4 ring-background"
              />
            </div>

            <div className="flex flex-col items-center gap-3">
              <span className="text-base font-semibold tracking-tight text-foreground">
                {DATA.name}
              </span>
              {/* bouncing dots */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-2 rounded-full bg-fb-blue animate-bounce motion-reduce:animate-none"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>

            <span className="sr-only">Loading…</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
