"use client";

import { useEffect, useRef, type ReactNode } from "react";

declare global {
  interface Window {
    __ledgifyIntro?: { finish: () => void };
  }
}

export function HomepageIntro({ children }: { children: ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const intro = window.__ledgifyIntro;
    if (!content || !intro || !document.documentElement.hasAttribute("data-homepage-intro")) return;

    content.inert = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => intro.finish();
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") finish();
    };
    motion.addEventListener("change", onMotionChange);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("pagehide", finish);
    onMotionChange();

    return () => {
      motion.removeEventListener("change", onMotionChange);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pagehide", finish);
      // Defer the unmount check so React Strict Mode's effect rehearsal does
      // not consume the intro. Route changes still release the document lock.
      queueMicrotask(() => {
        if (!content.isConnected) finish();
      });
    };
  }, []);

  return (
    <>
      <div
        className="homepage-intro"
        aria-hidden="true"
        onAnimationEnd={(event) => {
          if (event.animationName === "homepage-intro-bottom") {
            window.__ledgifyIntro?.finish();
          }
        }}
      >
        {["top", "bottom"].map((half) => (
          <div className={`homepage-intro-panel homepage-intro-${half}`} key={half}>
            <div className="homepage-intro-canvas">
              <div className="homepage-intro-brand">
                <span className="homepage-intro-wordmark">LEDGIFYBPO</span>
                <span className="homepage-intro-tagline">Care behind every detail.</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        ref={contentRef}
        className="homepage-intro-content"
        data-homepage-content
        // The fail-open timer may mark completion before slow hydration.
        suppressHydrationWarning
      >
        {children}
      </div>
    </>
  );
}
