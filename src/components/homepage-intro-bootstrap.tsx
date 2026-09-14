import "./homepage-intro.css";

// Runs before page markup is painted. The flag belongs to this document, so
// client navigation cannot replay it; a reload gets a new document and intro.
const bootstrap = `(() => {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.pathname !== '/' || motion.matches || navigation?.type === 'back_forward') return;
  let timer;
  const finish = () => {
    clearTimeout(timer);
    const content = document.querySelector('[data-homepage-content]');
    if (content) {
      content.removeAttribute('inert');
      content.setAttribute('data-intro-complete', 'true');
    }
    root.removeAttribute('data-homepage-intro');
  };
  window.__ledgifyIntro = { finish };
  root.setAttribute('data-homepage-intro', 'playing');
  // Fail open even if hydration never completes or animation events are lost.
  timer = setTimeout(finish, 4000);
})();`;

export function HomepageIntroBootstrap() {
  return <script dangerouslySetInnerHTML={{ __html: bootstrap }} />;
}
