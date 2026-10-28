"use client";

import { useEffect } from "react";
import { playKey } from "@/lib/click-sound";

// Fields that take typing; checkboxes, radios and buttons stay silent.
const TYPEABLE = "textarea, [contenteditable=''], [contenteditable='true'], input";
const SILENT_INPUTS = new Set(["checkbox", "radio", "button", "submit", "reset", "range", "color", "file"]);

function isTypeable(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  const field = target.closest(TYPEABLE);
  if (!field) return false;
  return !(field instanceof HTMLInputElement && SILENT_INPUTS.has(field.type));
}

/**
 * A mechanical keyboard thock for every key typed into a text field, under
 * the same toggle as the click sounds. Held keys don't repeat the sound, and
 * phone keyboards (which report "Unidentified" keys) already click on their own.
 */
export function KeyboardSound() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.key === "Unidentified" || !isTypeable(e.target)) return;
      playKey(e.key);
    };
    window.addEventListener("keydown", onKeyDown, { capture: true, passive: true });
    return () => window.removeEventListener("keydown", onKeyDown, { capture: true });
  }, []);

  return null;
}
