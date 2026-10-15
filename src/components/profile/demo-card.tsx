"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { FeedPost } from "@/lib/posts";

/**
 * A project card with a demo video, after Aceternity's Expandable Card
 * (ui.aceternity.com/components/expandable-card): clicking the card grows it
 * into a centred dialog through shared `layoutId`s, and the demo plays there.
 * Esc, the close button or a click outside shrink it back into the feed.
 *
 * `children` is the card's server-rendered header and body, `footer` its links.
 */
export function DemoCard({
  post,
  video,
  footer,
  children,
}: {
  post: FeedPost;
  video: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => setMounted(true), []);

  // Hand focus back to the card's play button once the dialog closes.
  useEffect(() => {
    if (wasOpen.current && !open) triggerRef.current?.focus({ preventScroll: true });
    wasOpen.current = open;
  }, [open]);

  // Lock page scroll while open; pad for the scrollbar so nothing shifts.
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Anywhere on the card opens it, except its own links and buttons
  // ("Show more", Source) and the end of a text selection.
  const onCardClick = (e: React.MouseEvent) => {
    if ((e.target as Element).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    setOpen(true);
  };

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", duration: 0.45, bounce: 0.12 }}
    >
      <motion.article
        layoutId={`card-${id}`}
        onClick={onCardClick}
        className="fb-card cursor-pointer overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
      >
        {children}

        <motion.div
          layoutId={`media-${id}`}
          className="relative mt-2.5 aspect-[16/10] w-full bg-fb-hover"
        >
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-label={`Watch the ${post.title} demo`}
            className="group absolute inset-0 grid place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-fb-blue"
          >
            {post.image && (
              <Image
                src={post.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            )}
            <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
            <PlayPill label="Watch demo" />
          </button>
        </motion.div>

        {footer}
      </motion.article>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px]"
              />
            )}
            {open && (
              <DemoDialog
                key="dialog"
                id={id}
                post={post}
                video={video}
                onClose={() => setOpen(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </MotionConfig>
  );
}

function DemoDialog({
  id,
  post,
  video,
  onClose,
}: {
  id: string;
  post: FeedPost;
  video: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const pressedOutside = useRef(false);
  const titleId = `${id}-title`;
  const paragraphs = (post.details ?? "")
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  useEffect(() => {
    playRef.current?.focus({ preventScroll: true });
  }, []);

  // Keep Tab inside the dialog.
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])'
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    // A click outside closes only if it also began outside, so dragging the
    // video's seek bar past the panel's edge doesn't.
    <div
      className="fixed inset-0 z-[80] grid place-items-center sm:p-4"
      onPointerDown={(e) => (pressedOutside.current = e.target === e.currentTarget)}
      onClick={(e) => {
        if (pressedOutside.current && e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        layoutId={`card-${id}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={trapTab}
        className="relative flex h-full w-full flex-col overflow-hidden bg-fb-card text-fb-text shadow-2xl ring-1 ring-black/5 dark:ring-white/10 sm:h-auto sm:max-h-[90dvh] sm:w-[min(56rem,calc(100vw_-_2rem),calc((90dvh_-_14rem)*16/9))] sm:rounded-xl"
      >
        <motion.div
          layoutId={`media-${id}`}
          className="relative aspect-video w-full flex-none bg-black"
        >
          <DemoVideo src={video} poster={post.image} title={post.title} playRef={playRef} />
        </motion.div>

        <motion.button
          type="button"
          onClick={onClose}
          aria-label="Close"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="size-5" />
        </motion.button>

        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.05 } }}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <p className="text-sm text-fb-text-secondary">{post.lead}</p>
              <h2 id={titleId} className="text-lg font-bold leading-snug">
                {post.title}
              </h2>
              {post.meta && <p className="text-sm text-fb-text-secondary">{post.meta}</p>}
            </div>
            {post.links && post.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-fb-blue px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-fb-blue-hover"
                  >
                    <ArrowUpRight className="size-4" /> {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 pb-8 pt-3 [mask-image:linear-gradient(to_bottom,black_calc(100%_-_2rem),transparent)] sm:px-5">
            {post.description && (
              <p className="text-[15px] leading-relaxed">{post.description}</p>
            )}
            {paragraphs.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-fb-text-secondary">
                {p}
              </p>
            ))}
            {post.stack && post.stack.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-fb-text-secondary">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-fb-hover px-2 py-0.5 text-xs text-fb-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/**
 * The demo, behind its thumbnail until Play is pressed. `play()` runs inside
 * the click itself, so browsers allow it with sound; nothing downloads before.
 */
function DemoVideo({
  src,
  poster,
  title,
  playRef,
}: {
  src: string;
  poster?: string;
  title: string;
  playRef: React.RefObject<HTMLButtonElement>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {});
    // The Play button is about to unmount; keep focus in the dialog.
    videoRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        preload="none"
        playsInline
        controls={started}
        tabIndex={started ? 0 : -1}
        aria-label={`${title} demo`}
        className="absolute inset-0 size-full bg-black object-contain"
      />
      {!started && (
        <button
          ref={playRef}
          type="button"
          onClick={start}
          aria-label={`Play the ${title} demo`}
          className="group absolute inset-0 grid place-items-center focus-visible:outline-none"
        >
          {poster && (
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 896px"
              className="object-cover object-top"
            />
          )}
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
          <PlayPill label="Play demo" large />
        </button>
      )}
    </>
  );
}

function PlayPill({ label, large = false }: { label: string; large?: boolean }) {
  return (
    <span
      className={`relative flex items-center rounded-full bg-black/65 font-semibold text-white shadow-lg ring-1 ring-white/15 backdrop-blur-sm transition-transform duration-200 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-white ${
        large ? "gap-3 py-2.5 pl-2.5 pr-5 text-base" : "gap-2.5 py-2 pl-2 pr-4 text-sm"
      }`}
    >
      <span
        className={`grid place-items-center rounded-full bg-white text-black ${large ? "size-10" : "size-8"}`}
      >
        <Play className={`ml-0.5 fill-current ${large ? "size-5" : "size-4"}`} />
      </span>
      {label}
    </span>
  );
}
