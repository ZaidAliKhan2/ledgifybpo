"use client";

import { useEffect, type ReactNode, type RefObject } from "react";

/**
 * Keeps the real heading text/typography intact.
 * GSAP uses this inner element for masked heading reveals.
 */
export function ScrollText({ children }: { children: ReactNode }) {
  return (
    <span data-scroll-text style={{ display: "block", color: "inherit" }}>
      {children}
    </span>
  );
}

/**
 * Homepage-only scroll choreography.
 *
 * Design language:
 * - important headings reveal through a mask instead of merely fading
 * - supporting copy enters directionally
 * - section layouts assemble from their natural sides
 * - cards use controlled stagger
 * - existing interactive components remain untouched after entrance
 */
export function useHomeScrollMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const motionRoot: HTMLElement = rootElement;

    let disposed = false;
    let cleanup = () => {};
    let frame = 0;

    // Prevent arrived sections replaying after resize / matchMedia rebuilds.
    const played = new WeakSet<Element>();

    async function initialize() {
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

        if (disposed) return;

        gsap.registerPlugin(ScrollTrigger);

        const media = gsap.matchMedia();
        const context = gsap.context(() => {}, motionRoot);

        cleanup = () => {
          media.revert();
          context.revert();
        };

        context.add(() => {
          media.add(
            {
              reduced: "(prefers-reduced-motion: reduce)",
              mobile: "(max-width: 767px)",
              desktop: "(min-width: 768px)",
            },
            ({ conditions }) => {
              if (conditions?.reduced) return;

              const mobile = Boolean(conditions?.mobile);

              /*
               * These values are intentionally more visible than the previous
               * implementation. Opacity supports the motion rather than being
               * the main visual effect.
               */
              const rise = mobile ? 32 : 62;
              const side = mobile ? 30 : 78;
              const softSide = mobile ? 20 : 46;

              const cleanupHandlers: Array<() => void> = [];

              function section(element: HTMLElement, kind: string) {
                if (
                  played.has(element) ||
                  element.getBoundingClientRect().bottom <= 0
                ) {
                  return;
                }

                const timeline = gsap.timeline({
                  paused: true,
                  defaults: {
                    duration: mobile ? 0.68 : 0.82,
                    ease: "power3.out",
                  },
                });

                const select = (selector: string) =>
                  Array.from(element.querySelectorAll<HTMLElement>(selector));

                /*
                 * General reveal helper.
                 *
                 * Unlike the old system, x/y values are intentionally large
                 * enough to communicate direction on desktop.
                 */
                function reveal(
                  selector: string,
                  at: number,
                  vars: gsap.TweenVars = {},
                  stagger = 0,
                ) {
                  const targets = select(selector);
                  if (!targets.length) return;

                  const { transition, ...motion } = vars as gsap.TweenVars & {
                    transition?: string;
                  };

                  if (transition) {
                    gsap.set(targets, { transition });
                  }

                  timeline.from(
                    targets,
                    {
                      y: rise,
                      opacity: 0,
                      ...motion,
                      stagger,
                      immediateRender: true,

                      onComplete() {
                        gsap.set(this.targets(), {
                          clearProps:
                            "transform,opacity,visibility,clipPath,transition",
                        });
                      },
                    },
                    at,
                  );
                }

                /*
                 * TRUE masked heading reveal.
                 *
                 * The old version moved the heading only ~48px while fading it.
                 * This moves the complete text from below its own clipping
                 * boundary, so the user actually sees the heading swipe into
                 * view.
                 */
                function revealHeadings(
                  at = 0.12,
                  duration = mobile ? 0.72 : 0.94,
                ) {
                  select("h2 > [data-scroll-text]").forEach((text) => {
                    const heading = text.parentElement;
                    if (!heading) return;

                    const previousOverflow = heading.style.overflow;

                    gsap.set(heading, {
                      overflow: "hidden",
                    });

                    timeline.from(
                      text,
                      {
                        yPercent: 108,
                        duration,
                        ease: "power4.out",
                        immediateRender: true,

                        onComplete() {
                          gsap.set(text, {
                            clearProps: "transform",
                          });

                          heading.style.overflow = previousOverflow;
                        },
                      },
                      at,
                    );
                  });
                }

                function revealTargets(
                  targets: HTMLElement[],
                  at: number,
                  vars: gsap.TweenVars,
                  stagger = 0,
                ) {
                  if (!targets.length) return;

                  timeline.from(
                    targets,
                    {
                      opacity: 0,
                      ...vars,
                      stagger,
                      immediateRender: true,

                      onComplete() {
                        gsap.set(this.targets(), {
                          clearProps:
                            "transform,opacity,visibility,clipPath,transition",
                        });
                      },
                    },
                    at,
                  );
                }

                const arrive = () => {
                  if (played.has(element)) return;

                  played.add(element);

                  /*
                   * ---------------------------------------------------------
                   * SHARED SECTION INTRODUCTION
                   * ---------------------------------------------------------
                   */

                  reveal(".eyebrow, .contact-cta-eyebrow", 0, {
                    x: -side,
                    y: 0,
                    duration: mobile ? 0.56 : 0.68,
                    ease: "power3.out",
                  });

                  revealHeadings(0.12);

                  /*
                   * Supporting text deliberately comes from the opposite
                   * direction from the eyebrow.
                   */
                  reveal(
                    ".section-description, [data-scroll-copy], .why-intro > p:not(.eyebrow), .contact-cta-description",
                    0.3,
                    {
                      x:
                        kind === "founders" || kind === "testimonials"
                          ? 0
                          : side,
                      y:
                        kind === "founders" || kind === "testimonials" ? 24 : 0,
                      duration: mobile ? 0.62 : 0.78,
                    },
                  );

                  /*
                   * ---------------------------------------------------------
                   * SECTION-SPECIFIC CHOREOGRAPHY
                   * ---------------------------------------------------------
                   */

                  switch (kind) {
                    /*
                     * Software integration strip:
                     * intentionally restrained because it sits immediately
                     * below the Hero.
                     */
                    case "trust": {
                      reveal(".trust-heading", 0, {
                        y: mobile ? 22 : 32,
                        duration: 0.65,
                      });

                      reveal(".tool-window", 0.22, {
                        y: mobile ? 18 : 28,
                        clipPath: "inset(0 8% 0 8%)",
                        duration: mobile ? 0.7 : 0.9,
                      });

                      break;
                    }

                    /*
                     * Ledgify Difference:
                     * heading performs the mask reveal, then the four value
                     * items rise sequentially.
                     */
                    case "values": {
                      reveal(
                        ".value-item",
                        0.42,
                        {
                          y: mobile ? 38 : 66,
                          scale: mobile ? 0.985 : 0.97,
                          duration: mobile ? 0.66 : 0.8,
                          transition: "none",
                        },
                        mobile ? 0.07 : 0.11,
                      );

                      break;
                    }

                    /*
                     * Services:
                     *
                     * LEFT  -> navigation
                     * RIGHT -> service panel
                     *
                     * This gives the section an assembling motion without
                     * touching its existing tab-switch animation.
                     */
                    case "services": {
                      reveal("[data-scroll-navigation]", 0.48, {
                        x: -softSide,
                        y: mobile ? 18 : 24,
                        duration: mobile ? 0.68 : 0.8,
                      });

                      reveal("#service-brief", 0.62, {
                        x: mobile ? 0 : side * 0.72,
                        y: mobile ? 36 : 46,
                        scale: mobile ? 0.985 : 0.965,
                        duration: mobile ? 0.74 : 0.92,
                        ease: "power3.out",
                      });

                      break;
                    }

                    /*
                     * Industries:
                     * keep the carousel mechanics completely untouched.
                     * Animate only its stable outer container.
                     */
                    case "industries": {
                      reveal(".industry-carousel", 0.5, {
                        x: mobile ? 0 : side,
                        y: mobile ? 38 : 46,
                        scale: mobile ? 0.99 : 0.975,
                        duration: mobile ? 0.72 : 0.92,
                        ease: "power3.out",
                      });

                      break;
                    }

                    /*
                     * Why LedgifyBPO has a genuine two-column layout.
                     *
                     * Left copy establishes itself first.
                     * Right-side reasons then arrive from the opposite side.
                     */
                    case "why": {
                      reveal(
                        ".why-reasons > article",
                        0.42,
                        {
                          x: mobile ? 0 : side,
                          y: mobile ? 34 : 18,
                          duration: mobile ? 0.7 : 0.84,
                        },
                        mobile ? 0.08 : 0.13,
                      );

                      reveal(".why-intro > .button", 0.66, {
                        x: mobile ? 0 : -softSide,
                        y: mobile ? 20 : 0,
                        duration: 0.7,
                      });

                      break;
                    }

                    /*
                     * Founders:
                     * paired cards enter from opposite sides on desktop,
                     * creating a much more visible composition.
                     *
                     * Mobile stays vertical to avoid horizontal overflow.
                     */
                    case "founders": {
                      const cards = select(".founder-card");

                      revealTargets(
                        cards,
                        0.48,
                        {
                          x: (index: number) =>
                            mobile
                              ? 0
                              : index % 2 === 0
                                ? -side * 0.72
                                : side * 0.72,
                          y: mobile ? 42 : 58,
                          scale: mobile ? 0.98 : 0.96,
                          duration: mobile ? 0.7 : 0.86,
                          ease: "power3.out",
                        },
                        mobile ? 0.09 : 0.14,
                      );

                      break;
                    }

                    /*
                     * Testimonials:
                     *
                     * Preserve the CSS marquee transform itself.
                     * Only animate cards, with the two rows arriving from
                     * opposite horizontal directions.
                     */
                    case "testimonials": {
                      const groups = select(".marquee-group");

                      groups.forEach((group, groupIndex) => {
                        const row = Math.floor(groupIndex / 2);

                        timeline.from(
                          group.children,
                          {
                            x: mobile
                              ? row === 0
                                ? 24
                                : -24
                              : row === 0
                                ? side * 0.8
                                : -side * 0.8,
                            y: mobile ? 26 : 36,
                            opacity: 0,
                            duration: mobile ? 0.66 : 0.8,
                            stagger: mobile ? 0.06 : 0.08,
                            ease: "power3.out",
                            immediateRender: true,

                            onComplete() {
                              gsap.set(this.targets(), {
                                clearProps: "transform,opacity,transition",
                              });
                            },
                          },
                          0.46 + Math.floor(groupIndex / 2) * 0.1,
                        );
                      });

                      break;
                    }

                    /*
                     * CTA:
                     *
                     * Left invitation builds in place.
                     * Right conversation panel comes strongly from the right.
                     */
                    case "cta": {
                      reveal(".contact-cta-panel", 0.46, {
                        x: mobile ? 0 : side * 1.05,
                        y: mobile ? 42 : 26,
                        scale: mobile ? 0.985 : 0.955,
                        duration: mobile ? 0.76 : 0.94,
                        ease: "power3.out",
                      });

                      reveal(".contact-cta-action", 0.58, {
                        x: mobile ? 0 : -softSide,
                        y: mobile ? 22 : 0,
                        duration: 0.7,
                      });

                      reveal(".contact-cta-reassurance", 0.7, {
                        x: mobile ? 0 : -softSide * 0.65,
                        y: mobile ? 16 : 0,
                        duration: 0.66,
                      });

                      break;
                    }

                    /*
                     * Footer remains intentionally calm.
                     */
                    case "footer": {
                      reveal(
                        ".footer-grid > div",
                        0,
                        {
                          y: mobile ? 24 : 34,
                          duration: 0.68,
                        },
                        mobile ? 0.05 : 0.08,
                      );

                      break;
                    }
                  }

                  /*
                   * Bottom links arrive after the main section composition,
                   * rather than appearing simultaneously with everything else.
                   */
                  reveal(".section-bottom-link", 0.78, {
                    x: mobile || kind === "founders" ? 0 : -softSide,
                    y: mobile ? 18 : 0,
                    duration: 0.64,
                  });

                  timeline.play();
                };

                const trigger = ScrollTrigger.create({
                  trigger: element,
                  start: kind === "footer" ? "clamp(top 90%)" : "top 86%",
                  once: true,
                  onEnter: arrive,

                  /*
                   * If somebody scrolls rapidly past the section, finish it
                   * instead of leaving partially transformed content behind.
                   */
                  onLeave: () => {
                    timeline.progress(1);
                  },
                });

                /*
                 * Keyboard users should never have to tab into content that is
                 * currently halfway through an entrance animation.
                 */
                const onFocus = () => {
                  played.add(element);
                  timeline.progress(1);
                  trigger.kill();
                };

                element.addEventListener("focusin", onFocus);

                cleanupHandlers.push(() => {
                  element.removeEventListener("focusin", onFocus);
                  trigger.kill();
                  timeline.kill();
                });
              }

              const sections: Array<[string, string]> = [
                [".trust-strip", "trust"],
                [".value-section", "values"],
                ["#services", "services"],
                [".industries-section", "industries"],
                [".why-section", "why"],
                [".founders-section", "founders"],
                [".testimonials-section", "testimonials"],
                [".final-cta", "cta"],
              ];

              sections.forEach(([selector, kind]) => {
                const element = motionRoot.querySelector<HTMLElement>(selector);

                if (element) {
                  section(element, kind);
                }
              });

              const footer =
                motionRoot.parentElement?.querySelector<HTMLElement>(
                  ".site-footer",
                );

              if (footer) {
                section(footer, "footer");
              }

              return () => {
                cleanupHandlers.forEach((remove) => remove());
              };
            },
          );
        });

        /*
         * Fonts can change geometry after hydration.
         * Recalculate trigger locations once font metrics settle.
         */
        void document.fonts.ready.then(() => {
          if (!disposed) {
            ScrollTrigger.refresh();
          }
        });

        ScrollTrigger.refresh();
      } catch (error) {
        cleanup();

        /*
         * GSAP is enhancement only.
         * Server-rendered content stays visible if it cannot load.
         */
        console.warn(
          "Homepage scroll motion unavailable; content remains visible.",
          error,
        );
      }
    }

    /*
     * Preserve the existing preloader contract.
     * ScrollTrigger initializes only once the homepage intro has finished.
     */
    const introObserver = new MutationObserver(startWhenReady);

    function startWhenReady() {
      if (document.documentElement.hasAttribute("data-homepage-intro")) {
        return;
      }

      introObserver.disconnect();

      frame = requestAnimationFrame(() => {
        void initialize();
      });
    }

    introObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-homepage-intro"],
    });

    startWhenReady();

    return () => {
      disposed = true;
      introObserver.disconnect();
      cancelAnimationFrame(frame);
      cleanup();
    };
  }, [rootRef]);
}
