/**
 * Homepage intro bootstrap.
 *
 * Runs before React hydration so the intro state exists before
 * homepage client components initialize.
 */

const root = document.documentElement;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const navigationEntry = performance.getEntriesByType("navigation")[0] as
  | PerformanceNavigationTiming
  | undefined;

const shouldRunHomepageIntro =
  window.location.pathname === "/" &&
  !reducedMotion.matches &&
  navigationEntry?.type !== "back_forward";

if (shouldRunHomepageIntro) {
  let timer = 0;

  const introWindow = window as Window & {
    __ledgifyIntro?: {
      finish: () => void;
    };
  };

  const finish = () => {
    window.clearTimeout(timer);

    const content = document.querySelector<HTMLElement>(
      "[data-homepage-content]",
    );

    if (content) {
      content.removeAttribute("inert");
      content.setAttribute("data-intro-complete", "true");
    }

    root.removeAttribute("data-homepage-intro");
  };

  introWindow.__ledgifyIntro = {
    finish,
  };

  root.setAttribute("data-homepage-intro", "playing");

  // Fail open if hydration or animation completion is interrupted.
  timer = window.setTimeout(finish, 4000);
}
