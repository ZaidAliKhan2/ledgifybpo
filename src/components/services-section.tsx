"use client";

import Link from "next/link";
import {
  ArrowUpRight, Check, ReceiptText, ArrowLeftRight, Repeat2,
  BookOpen, FileSpreadsheet, Search, Files, FolderOpen, ListChecks,
  FileCheck2, GitBranch, Compass, ChartNoAxesCombined, ContactRound,
  UserRoundPlus, UsersRound, type LucideIcon,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { services } from "@/lib/content";
import styles from "./services-section.module.css";

// Presentation only: names, responsibilities and deliverables stay in shared data.
const serviceMarks: Record<string, readonly LucideIcon[]> = {
  bookkeeping: [ReceiptText, ArrowLeftRight, BookOpen],
  accounting: [FileSpreadsheet, Search, Files],
  tax: [FolderOpen, ListChecks, FileCheck2],
  advisory: [GitBranch, ChartNoAxesCombined, Compass],
  "remote-hr-services": [ContactRound, UserRoundPlus, UsersRound],
};

// A long runway on both sides matters on iOS: native momentum can travel past
// a three-set loop before WebKit accepts a scripted scrollLeft correction.
const serviceSetCopies = 15;
const primaryServiceSet = Math.floor(serviceSetCopies / 2);

function WorkMarker({ slug, index }: { slug: string; index: number }) {
  const Icon = serviceMarks[slug]?.[index] ?? Check;
  return (
    <span className={styles.workMarker} aria-hidden="true">
      <Icon size={17} strokeWidth={1.5} />
    </span>
  );
}

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabSets = useRef<(HTMLDivElement | null)[]>([]);
  const rail = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollFrame = useRef<number | null>(null);
  const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    if (loopTimer.current) clearTimeout(loopTimer.current);
  }, []);

  useLayoutEffect(() => {
    const track = rail.current;
    const mobile = window.matchMedia("(max-width: 767px)");
    function placeAtPrimarySet() {
      const primarySet = tabSets.current[primaryServiceSet];
      if (!track || !primarySet) return;
      track.scrollLeft = mobile.matches ? primarySet.offsetLeft : 0;
    }
    placeAtPrimarySet();
    mobile.addEventListener("change", placeAtPrimarySet);
    return () => mobile.removeEventListener("change", placeAtPrimarySet);
  }, []);

  useEffect(() => {
    function positionIndicator() {
      const tab = tabs.current[active];
      if (!tab || !indicator.current) return;
      indicator.current.style.width = `${tab.offsetWidth}px`;
      indicator.current.style.transform = `translateX(${tab.offsetLeft}px)`;
    }
    positionIndicator();
    const observer = new ResizeObserver(positionIndicator);
    if (rail.current) observer.observe(rail.current);
    tabs.current.forEach((tab) => { if (tab) observer.observe(tab); });
    return () => observer.disconnect();
  }, [active]);

  function select(index: number, selectedTab?: HTMLButtonElement) {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tab = selectedTab ?? tabs.current[index];
    const track = rail.current;
    if (tab && track) {
      track.scrollTo({ left: tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2, behavior: reduced ? "instant" : "smooth" });
    }
    if (index === active) return;
    setActive(index);
    if (timer.current) clearTimeout(timer.current);
    if (reduced) {
      setDisplayed(index);
      setPhase("idle");
      return;
    }
    setPhase("exiting");
    timer.current = setTimeout(() => {
      setDisplayed(index);
      setPhase("entering");
    }, 180);
  }

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % services.length;
    else if (event.key === "ArrowLeft") next = (index + services.length - 1) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    tabs.current[next]?.focus({ preventScroll: true });
    select(next);
  }

  function normalizeLoopPosition() {
    const track = rail.current;
    if (!track || !window.matchMedia("(max-width: 767px)").matches) return;
    const primarySet = tabSets.current[primaryServiceSet];
    const trailingSet = tabSets.current[primaryServiceSet + 1];
    if (!primarySet || !trailingSet) return;
    const loopDistance = trailingSet.offsetLeft - primarySet.offsetLeft;
    if (!loopDistance) return;

    const cyclesFromPrimary = Math.round(
      (track.scrollLeft - primarySet.offsetLeft) / loopDistance,
    );
    if (cyclesFromPrimary === 0) return;

    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = "auto";
    track.scrollLeft -= cyclesFromPrimary * loopDistance;
    requestAnimationFrame(() => {
      track.style.scrollBehavior = previousBehavior;
    });
  }

  function scheduleLoopNormalization() {
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const track = rail.current;
      if (!track) return;
      const primarySet = tabSets.current[primaryServiceSet];
      const trailingSet = tabSets.current[primaryServiceSet + 1];
      const loopDistance =
        primarySet && trailingSet
          ? trailingSet.offsetLeft - primarySet.offsetLeft
          : 0;
      const edgeGuard = loopDistance * 2;
      if (
        edgeGuard > 0 &&
        (track.scrollLeft < edgeGuard ||
          track.scrollLeft > track.scrollWidth - track.clientWidth - edgeGuard)
      ) {
        normalizeLoopPosition();
      }
      if (loopTimer.current) clearTimeout(loopTimer.current);
      // Debouncing until native momentum settles avoids fighting WebKit while
      // it owns the touch gesture, then silently returns to the middle copy.
      loopTimer.current = setTimeout(normalizeLoopPosition, 90);
    });
  }

  function renderTabSet(setIndex: number, clone: boolean) {
    return (
      <div
        key={setIndex}
        className={styles.tabSet}
        data-clone={clone || undefined}
        aria-hidden={clone || undefined}
        role="presentation"
        ref={(element) => { tabSets.current[setIndex] = element; }}
      >
        {services.map((item, index) => (
          <button
            key={item.slug}
            ref={clone ? undefined : (element) => { tabs.current[index] = element; }}
            type="button"
            role={clone ? undefined : "tab"}
            id={clone ? undefined : `service-tab-${index}`}
            aria-controls={clone ? undefined : "service-brief"}
            aria-selected={clone ? undefined : active === index}
            data-active={active === index || undefined}
            tabIndex={clone ? -1 : active === index ? 0 : -1}
            onClick={(event) => select(index, event.currentTarget)}
            onKeyDown={clone ? undefined : (event) => navigate(event, index)}
          >
            <span className={styles.tabNumber} aria-hidden="true">0{index + 1}</span>{item.name}
          </button>
        ))}
      </div>
    );
  }

  const service = services[displayed];
  return (
    <section className={`section ${styles.section}`} id="services" aria-labelledby="services-heading">
      <div className="container">
        <header className={styles.heading}>
          <div><p className="eyebrow">OUR SERVICES</p><h2 id="services-heading">Your finance and operations.<br /><span>Taken care of.</span></h2></div>
          <p>From financial operations and reporting to compliance, advisory, and people support, we&apos;re an organized extension of your team.</p>
        </header>
        <div className={styles.navigation}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Explore our services"
            ref={rail}
            onScroll={scheduleLoopNormalization}
            onTouchStart={normalizeLoopPosition}
            onTouchEnd={scheduleLoopNormalization}
          >
            <span className={styles.indicator} ref={indicator} aria-hidden="true" />
            {Array.from({ length: serviceSetCopies }, (_, setIndex) =>
              renderTabSet(setIndex, setIndex !== primaryServiceSet),
            )}
          </div>
          <p className={styles.mobileHint}><Repeat2 size={13} aria-hidden="true" /> Five services · continuous loop</p>
        </div>
        <div className={styles.brief} id="service-brief" role="tabpanel" tabIndex={0}
          aria-labelledby={`service-tab-${displayed}`} aria-busy={phase === "exiting"} data-phase={phase} data-service={service.slug}>
          <div className={styles.content} key={service.slug}>
            <div className={styles.overview}>
              <div className={styles.label}><span className={styles.monogram} aria-hidden="true">0{displayed + 1}</span><h3>{service.name}</h3></div>
              <p className={styles.statement}>{service.brief.headline}</p>
              <p className={styles.introduction}>{service.brief.introduction}</p>
              <Link className={styles.cta} href={`/services/${service.slug}`} aria-label={`Explore ${service.name}`}>
                Explore this service <span><ArrowUpRight size={21} aria-hidden="true" /></span>
              </Link>
              <div className={styles.linework} aria-hidden="true"><i /><i /><i /><b /></div>
            </div>
            <div className={styles.responsibilities}>
              <p className={styles.kicker}>THE WORK WE TAKE ON</p>
              <ol>
                {service.brief.responsibilities.map((item, index) => (
                  <li key={item.title} style={{ "--step": index } as CSSProperties}>
                    <span className={styles.itemNumber} aria-hidden="true"><WorkMarker slug={service.slug} index={index} /></span>
                    <div><h4>{item.title}</h4><p>{item.copy}</p></div>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.deliverables}>
              <div><p className={styles.kicker}>WHAT COMES BACK TO YOU</p><p>Clarity you can work with.</p></div>
              <ul>{service.brief.deliverables.map((item, index) => {
                const Icon = serviceMarks[service.slug]?.[index] ?? Check;
                return (
                  <li key={item} style={{ "--step": index } as CSSProperties}>
                    <Icon size={16} aria-hidden="true" /><span>{item}</span>
                  </li>
                );
              })}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
