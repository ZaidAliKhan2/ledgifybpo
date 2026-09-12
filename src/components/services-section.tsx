"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, ReceiptText, ArrowLeftRight,
  BookOpen, FileSpreadsheet, Search, Files, FolderOpen, ListChecks,
  FileCheck2, GitBranch, Compass, ChartNoAxesCombined, ContactRound,
  UserRoundPlus, UsersRound, type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
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
  const rail = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

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

  function select(index: number) {
    if (index === active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(index);
    const tab = tabs.current[index];
    const track = rail.current;
    if (tab && track) {
      track.scrollTo({ left: tab.offsetLeft - (track.clientWidth - tab.offsetWidth) / 2, behavior: reduced ? "instant" : "smooth" });
    }
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

  const service = services[displayed];
  return (
    <section className={`section ${styles.section}`} id="services" aria-labelledby="services-heading">
      <div className="container">
        <header className={styles.heading}>
          <div><p className="eyebrow">OUR SERVICES</p><h2 id="services-heading">Your back office.<br /><span>Taken care of.</span></h2></div>
          <p>From the daily detail to the bigger picture, an organized extension of your team.</p>
        </header>
        <div className={styles.navigation}>
          <div className={styles.tabs} role="tablist" aria-label="Explore our services" ref={rail}>
            <span className={styles.indicator} ref={indicator} aria-hidden="true" />
            {services.map((item, index) => (
              <button key={item.slug} ref={(element) => { tabs.current[index] = element; }} type="button" role="tab"
                id={`service-tab-${index}`} aria-controls="service-brief" aria-selected={active === index}
                tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={(event) => navigate(event, index)}>
                <span className={styles.tabNumber} aria-hidden="true">0{index + 1}</span>{item.name}
              </button>
            ))}
          </div>
          <p className={styles.mobileHint}>Explore all five services <ArrowRight size={14} aria-hidden="true" /></p>
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
