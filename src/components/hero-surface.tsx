"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./hero-surface.module.css";

// A compact, smooth pressure field: value and slope both reach zero at the edge.
function pressure(dx: number, dy: number, radius: number) {
  const distance = (dx * dx + dy * dy) / (radius * radius);
  return distance < 1 ? (1 - distance) ** 3 : 0;
}

const lanes = [
  { label: "FINANCE", y: 112, end: 198 },
  { label: "OPERATIONS", y: 212, end: 212 },
  { label: "PEOPLE", y: 312, end: 226 },
];

function OperatingWeave() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <svg className={styles.weave} data-hero-weave viewBox="0 0 400 420" fill="none">
        <g className={styles.registration}>
          <path d="M24 54V30H48 M352 30H376V54 M24 366V390H48 M352 390H376V366" />
          <path d="M24 62H376 M24 358H376" />
          <path d="M200 24V36 M200 384V396" />
        </g>
        {lanes.map(({ label, y, end }, index) => (
          <g key={label} data-hero-lane className={styles.lane} style={{ "--lane-index": index } as CSSProperties}>
            <text x="40" y={y - 22}>{label}</text>
            <path className={styles.rail} d={`M40 ${y} H112 C174 ${y} 172 ${end} 242 ${end}`} />
            <path className={styles.railEcho} d={`M40 ${y + 8} H112 C174 ${y + 8} 172 ${end + 5} 242 ${end + 5}`} />
            <path className={styles.signal} pathLength="1" d={`M40 ${y} H112 C174 ${y} 172 ${end} 242 ${end}`} />
            <circle className={styles.nodeHalo} cx="112" cy={y} r="12" />
            <rect className={styles.node} x="108" y={y - 4} width="8" height="8" rx="1" />
            <circle className={styles.terminal} cx="40" cy={y} r="2.5" />
          </g>
        ))}
        <g className={styles.core}>
          <rect className={styles.coreBack} x="230" y="175" width="68" height="74" rx="5" />
          <rect className={styles.coreFront} x="238" y="181" width="68" height="62" rx="4" />
          <path d="M254 181V243 M263 198H292 M263 212H292 M263 226H282" />
          <path className={styles.output} d="M306 212H360 M352 204L360 212L352 220" />
          <circle className={styles.coreAnchor} cx="254" cy="212" r="3" />
        </g>
        <g className={styles.registerTicks}>
          {Array.from({ length: 17 }, (_, index) => (
            <path key={index} d={`M${40 + index * 20} 358v${index % 4 === 0 ? 8 : 4}`} />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function HeroSurface({ children }: { children: ReactNode }) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<SVGFEImageElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const filterId = `hero-lens-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const mapImage = imageRef.current;
    const displacement = displacementRef.current;
    if (!hero || !canvas || !mapImage || !displacement) return;
    const context = canvas.getContext("2d");
    const heading = hero.querySelector("h1");
    const weave = hero.querySelector<SVGSVGElement>("[data-hero-weave]");
    if (!context || !heading || !weave) return;
    const laneElements = Array.from(hero.querySelectorAll<SVGGElement>("[data-hero-lane]"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let lastTime = 0;
    let initialized = false;
    let disposed = false;
    let visible = true;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    let strength = 0, targetStrength = 0;
    let touch = false;
    let width = 0, height = 0, spacing = 64, ratio = 1;
    let headingBox = { x: 0, y: 0, width: 0, height: 0 };
    let weaveBox = { x: 0, y: 0, scale: 1 };
    let releaseTimer: ReturnType<typeof setTimeout> | undefined;
    const brand = getComputedStyle(hero).getPropertyValue("--accent").trim();
    const deep = getComputedStyle(hero).getPropertyValue("--accent-deep").trim();

    // Build a displacement texture once, never rasterize the real headline.
    // R/G encode inverse radial displacement; neutral pixels leave text exact.
    const texture = document.createElement("canvas");
    texture.width = texture.height = 192;
    const textureContext = texture.getContext("2d");
    if (textureContext) {
      const pixels = textureContext.createImageData(192, 192);
      for (let row = 0; row < 192; row++) {
        for (let column = 0; column < 192; column++) {
          const dx = (column - 95.5) / 96;
          const dy = (row - 95.5) / 96;
          const field = pressure(dx, dy, 1);
          const offset = (row * 192 + column) * 4;
          pixels.data[offset] = Math.round(127.5 - dx * field * 255);
          pixels.data[offset + 1] = Math.round(127.5 - dy * field * 255);
          pixels.data[offset + 2] = 128;
          pixels.data[offset + 3] = 255;
        }
      }
      textureContext.putImageData(pixels, 0, 0);
      mapImage.setAttribute("href", texture.toDataURL());
    }

    function paint() {
      if (!context || !hero || !canvas || !heading || !mapImage || !displacement) return;
      const desktop = finePointer.matches && width >= 1000 && !touch && !motion.matches;
      const amount = motion.matches ? 0 : strength;
      const radius = desktop ? 190 : 140;
      const swell = amount * (desktop ? 0.24 : 0.075);
      const depthX = desktop ? (x / width - 0.5) * amount * 4 : 0;
      const depthY = desktop ? (y / height - 0.5) * amount * 4 : 0;
      const point = (px: number, py: number) => {
        const dx = px - x, dy = py - y;
        const lens = pressure(dx, dy, radius) * swell;
        return [px + dx * lens - depthX, py + dy * lens - depthY];
      };
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const grid = new Path2D();
      for (let column = 0; column <= width + spacing; column += spacing) {
        for (let row = -12; row <= height + 12; row += 12) {
          const [px, py] = point(column, row);
          if (row === -12) grid.moveTo(px, py); else grid.lineTo(px, py);
        }
      }
      for (let row = 0; row <= height + spacing; row += spacing) {
        for (let column = -12; column <= width + 12; column += 12) {
          const [px, py] = point(column, row);
          if (column === -12) grid.moveTo(px, py); else grid.lineTo(px, py);
        }
      }
      context.globalAlpha = 0.14;
      context.strokeStyle = deep;
      context.lineWidth = 0.8;
      context.stroke(grid);
      if (amount > 0.001) {
        const light = context.createRadialGradient(x, y, 0, x, y, radius);
        light.addColorStop(0, brand);
        light.addColorStop(0.3, brand);
        light.addColorStop(1, "transparent");
        context.globalAlpha = amount * 0.7;
        context.strokeStyle = light;
        context.lineWidth = 1.35;
        context.stroke(grid);
        context.fillStyle = brand;
        for (let column = Math.max(0, Math.floor((x - radius) / spacing) * spacing); column <= Math.min(width, x + radius); column += spacing) {
          for (let row = Math.max(0, Math.floor((y - radius) / spacing) * spacing); row <= Math.min(height, y + radius); row += spacing) {
            const near = pressure(column - x, row - y, radius);
            if (!near) continue;
            const [px, py] = point(column, row);
            context.globalAlpha = near * amount * 0.8;
            context.beginPath();
            context.arc(px, py, 1 + near * 1.8, 0, Math.PI * 2);
            context.fill();
          }
        }
      }
      context.globalAlpha = 1;
      hero.style.setProperty("--pointer-x", `${x}px`);
      hero.style.setProperty("--pointer-y", `${y}px`);
      hero.style.setProperty("--field-strength", String(amount));
      hero.style.setProperty("--visual-x", `${depthX * 1.5}px`);
      hero.style.setProperty("--visual-y", `${depthY * 1.5}px`);

      const nearHeading = x > headingBox.x - 160 && x < headingBox.x + headingBox.width + 160 && y > headingBox.y - 160 && y < headingBox.y + headingBox.height + 160;
      const warp = desktop && textureContext && nearHeading && amount > 0.001;
      if (warp) {
        mapImage.setAttribute("x", String(x - headingBox.x - 160));
        mapImage.setAttribute("y", String(y - headingBox.y - 160));
        displacement.setAttribute("scale", String(42 * amount));
        heading.style.filter = `url(#${filterId})`;
      } else {
        heading.style.removeProperty("filter");
        displacement.setAttribute("scale", "0");
      }
      laneElements.forEach((lane, index) => {
        const localX = (x - weaveBox.x) / weaveBox.scale;
        const localY = (y - weaveBox.y) / weaveBox.scale;
        const near = pressure(localX - 140, localY - lanes[index].y, 180) * amount;
        lane.style.setProperty("--proximity", String(near));
      });
    }

    function stop() {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    }

    function draw(time: number) {
      const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
      lastTime = time;
      const blend = 1 - Math.exp(-elapsed / 65);
      x += (targetX - x) * blend;
      y += (targetY - y) * blend;
      strength += (targetStrength - strength) * (1 - Math.exp(-elapsed / 110));
      const settled = Math.abs(targetX - x) + Math.abs(targetY - y) < 0.2 && Math.abs(targetStrength - strength) < 0.002;
      if (settled) { x = targetX; y = targetY; strength = targetStrength; }
      paint();
      frame = settled ? 0 : requestAnimationFrame(draw);
      if (!frame) lastTime = 0;
    }

    function schedule() {
      if (!frame && visible && !motion.matches) frame = requestAnimationFrame(draw);
    }

    function measure() {
      if (!hero || !canvas || !heading || !weave || disposed) return;
      const bounds = hero.getBoundingClientRect();
      const title = heading.getBoundingClientRect();
      const diagram = weave.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      spacing = width < 768 ? 48 : 64;
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      headingBox = { x: title.left - bounds.left, y: title.top - bounds.top, width: title.width, height: title.height };
      weaveBox = { x: diagram.left - bounds.left, y: diagram.top - bounds.top, scale: diagram.width / 400 || 1 };
      paint();
      hero.dataset.gridReady = "true";
    }

    function track(event: PointerEvent) {
      if (!hero || motion.matches || !event.isPrimary || document.documentElement.hasAttribute("data-homepage-intro")) return;
      clearTimeout(releaseTimer);
      const bounds = hero.getBoundingClientRect();
      targetX = event.clientX - bounds.left;
      targetY = event.clientY - bounds.top;
      touch = event.pointerType !== "mouse";
      targetStrength = touch ? 0.55 : 1;
      if (!initialized) { x = targetX; y = targetY; initialized = true; }
      schedule();
    }

    function release() {
      clearTimeout(releaseTimer);
      targetStrength = 0;
      schedule();
    }
    function leave(event: PointerEvent) {
      if (event.pointerType !== "touch") release();
    }
    function touchEnd(event: PointerEvent) {
      if (event.pointerType === "mouse") return;
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(release, 320);
    }
    function reset() {
      stop();
      clearTimeout(releaseTimer);
      strength = targetStrength = 0;
      initialized = false;
      measure();
    }
    function onVisibility() {
      if (document.hidden) reset();
    }
    // One observer for size changes; pointer frames never read element geometry.
    const resize = new ResizeObserver(reset);
    resize.observe(hero);
    resize.observe(heading);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) reset();
    });
    intersection.observe(hero);
    measure();
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    // Passive listeners preserve native touch scrolling and all CTA events.
    hero.addEventListener("pointerenter", track, { passive: true });
    hero.addEventListener("pointerdown", track, { passive: true });
    hero.addEventListener("pointermove", track, { passive: true });
    hero.addEventListener("pointerleave", leave, { passive: true });
    hero.addEventListener("pointerup", touchEnd, { passive: true });
    hero.addEventListener("pointercancel", release, { passive: true });
    hero.addEventListener("animationend", measure);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", onVisibility);
    motion.addEventListener("change", reset);
    finePointer.addEventListener("change", reset);

    return () => {
      disposed = true;
      stop();
      clearTimeout(releaseTimer);
      resize.disconnect();
      intersection.disconnect();
      heading.style.removeProperty("filter");
      delete hero.dataset.gridReady;
      hero.removeEventListener("pointerenter", track);
      hero.removeEventListener("pointerdown", track);
      hero.removeEventListener("pointermove", track);
      hero.removeEventListener("pointerleave", leave);
      hero.removeEventListener("pointerup", touchEnd);
      hero.removeEventListener("pointercancel", release);
      hero.removeEventListener("animationend", measure);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", onVisibility);
      motion.removeEventListener("change", reset);
      finePointer.removeEventListener("change", reset);
    };
  }, [filterId]);

  return (
    <section className={styles.surface} ref={heroRef} aria-label="LedgifyBPO finance and operations">
      <div className={styles.grid} aria-hidden="true">
        <div className={styles.base} />
        <canvas className={styles.gridCanvas} ref={canvasRef} />
        <div className={styles.illumination} />
      </div>
      <svg className={styles.filterDefinitions} aria-hidden="true" width="0" height="0">
        <defs>
          <filter id={filterId} x="-15%" y="-25%" width="130%" height="150%" colorInterpolationFilters="sRGB" primitiveUnits="userSpaceOnUse">
            <feFlood floodColor="rgb(50%, 50%, 50%)" result="neutral" />
            <feImage ref={imageRef} x="0" y="0" width="320" height="320" preserveAspectRatio="none" result="lens" />
            <feComposite in="lens" in2="neutral" operator="over" result="field" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="field" scale="0" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div className={styles.composition}>
        {children}
        <OperatingWeave />
      </div>
    </section>
  );
}
