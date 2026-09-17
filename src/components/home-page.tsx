"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Building2,
  ShieldCheck,
  Cloud,
  Check,
  ChevronLeft,
  ChevronRight,
  Layers3,
  UsersRound,
  Workflow,
} from "lucide-react";
import {
  SiClickup,
  SiQuickbooks,
  SiNotion,
  SiOdoo,
  SiSap,
  SiGusto,
  SiStripe,
  SiExpensify,
  SiXero,
} from "react-icons/si";
import { FaMicrosoft, FaSlack } from "react-icons/fa6";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ConsultationButton, Logo } from "@/components/site";
import { founders, services, industries, values } from "@/lib/content";
import { ServicesSection } from "./services-section";
import { HeroSurface } from "./hero-surface";
import { ScrollText, useHomeScrollMotion } from "./home-scroll-motion";

export { ServicesSection } from "./services-section";

const valueIcons = [Clock, Building2, ShieldCheck, Cloud];
const tools = [
  { Icon: SiQuickbooks, name: "QuickBooks" },
  { Icon: SiXero, name: "Xero" },
  { Icon: SiGusto, name: "Gusto" },
  { Icon: SiStripe, name: "Stripe" },
  { Icon: SiExpensify, name: "Expensify" },
  { Icon: SiSap, name: "SAP" },
  { Icon: SiOdoo, name: "Odoo" },
  { Icon: FaSlack, name: "Slack" },
  { Icon: FaMicrosoft, name: "Microsoft 365" },
  { Icon: Building2, name: "Buildium" },
  { Icon: SiNotion, name: "Notion" },
  { Icon: SiClickup, name: "ClickUp" },
];

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  scrollMotion = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  scrollMotion?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{scrollMotion ? <ScrollText>{title}</ScrollText> : title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function greatestCommonDivisor(left: number, right: number) {
  let a = left;
  let b = right;
  while (b !== 0) [a, b] = [b, a % b];
  return a;
}

function industryPageCount(itemsPerPage: number) {
  return industries.length /
    greatestCommonDivisor(industries.length, itemsPerPage);
}

function buildIndustryPages(itemsPerPage: number) {
  return Array.from(
    { length: industryPageCount(itemsPerPage) },
    (_, pageIndex) => {
      const startIndex = (pageIndex * itemsPerPage) % industries.length;
      return Array.from(
        { length: itemsPerPage },
        (_, cardIndex) =>
          industries[(startIndex + cardIndex) % industries.length],
      );
    },
  );
}

export function DashboardWidgets({ active }: { active: number }) {
  const service = services[active];

  function renderWidgets() {
    switch (service.slug) {
      case "bookkeeping":
        return (
          <>
            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Account reconciliations</h4>
                <span className="sd-pill">3 of 3 complete</span>
              </div>

              <ul className="sd-checklist">
                {[
                  ["Operating account", "Matched"],
                  ["Savings account", "Matched"],
                  ["Business credit card", "Matched"],
                ].map(([label, status]) => (
                  <li key={label}>
                    <span className="sd-check-icon">
                      <Check size={15} aria-hidden="true" />
                    </span>
                    <span className="sd-list-label">{label}</span>
                    <span className="sd-muted">{status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sd-card sd-card-tinted">
              <div className="sd-card-header">
                <h4>Monthly close</h4>
                <span className="sd-muted">June</span>
              </div>

              <ol className="sd-timeline">
                {[
                  ["Records received", "Complete"],
                  ["Accounts reconciled", "Complete"],
                  ["Reports prepared", "Ready for review"],
                ].map(([label, status], index) => (
                  <li key={label}>
                    <span className="sd-timeline-marker">
                      {index < 2 ? (
                        <Check size={13} aria-hidden="true" />
                      ) : (
                        <span className="sd-timeline-dot" />
                      )}
                    </span>
                    <strong>{label}</strong>
                    <span className="sd-muted">{status}</span>
                  </li>
                ))}
              </ol>
            </div>
          </>
        );

      case "accounting":
        return (
          <>
            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Financial statement snapshot</h4>
                <span className="sd-pill">June</span>
              </div>

              <dl className="sd-statement">
                <div>
                  <dt>Revenue</dt>
                  <dd>$128,400</dd>
                </div>
                <div>
                  <dt>Operating expenses</dt>
                  <dd>$91,200</dd>
                </div>
                <div className="sd-statement-total">
                  <dt>Operating profit</dt>
                  <dd>$37,200</dd>
                </div>
              </dl>

              <p className="sd-note">Accrual basis · Monthly reporting</p>
            </div>

            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Revenue trend</h4>
                <span className="sd-pill">6-month view</span>
              </div>

              <svg
                className="sd-trend-chart"
                viewBox="0 0 320 110"
                role="img"
                aria-label="Illustrative revenue trend rising from January to June."
              >
                <path
                  className="sd-chart-grid"
                  d="M10 20H310 M10 55H310 M10 90H310"
                />
                <path
                  className="sd-chart-area"
                  d="M10 85 L70 67 L130 73 L190 44 L250 34 L310 12
                     L310 100 L10 100 Z"
                />
                <path
                  className="sd-chart-line"
                  d="M10 85 L70 67 L130 73 L190 44 L250 34 L310 12"
                />
                <circle className="sd-chart-point" cx="310" cy="12" r="4" />
              </svg>

              <div className="sd-chart-axis">
                <span>Jan</span>
                <span>Mar</span>
                <span>Jun</span>
              </div>
            </div>
          </>
        );

      case "tax":
        return (
          <>
            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Filing readiness</h4>
                <span className="sd-pill">In preparation</span>
              </div>

              <div className="sd-deadline">
                <div className="sd-countdown">
                  <strong>15</strong>
                  <span>days left</span>
                </div>
                <div>
                  <strong>Next filing milestone</strong>
                  <p className="sd-note">Internal review before submission</p>
                </div>
              </div>

              <dl className="sd-compliance">
                <div>
                  <dt>Requirements review</dt>
                  <dd className="sd-pill">Complete</dd>
                </div>
                <div>
                  <dt>Filing package</dt>
                  <dd className="sd-pill sd-pill-outline">In review</dd>
                </div>
              </dl>
            </div>

            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Supporting documents</h4>
                <span className="sd-muted">2 of 3 received</span>
              </div>

              <ul className="sd-checklist">
                {[
                  { label: "Prior-year return", received: true },
                  { label: "Year-end financials", received: true },
                  { label: "Supporting schedules", received: false },
                ].map(({ label, received }) => (
                  <li key={label}>
                    <span
                      className={
                        received
                          ? "sd-check-icon"
                          : "sd-check-icon sd-check-pending"
                      }
                    >
                      {received && <Check size={15} aria-hidden="true" />}
                    </span>
                    <span className="sd-list-label">{label}</span>
                    <span className="sd-muted">
                      {received ? "Received" : "Requested"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );

      case "advisory":
        return (
          <>
            <div className="sd-card sd-card-tinted">
              <div className="sd-card-header">
                <h4>Performance indicators</h4>
                <span className="sd-pill">Planning view</span>
              </div>

              <dl className="sd-kpi-grid">
                <div>
                  <dt>Revenue growth</dt>
                  <dd>+12.8%</dd>
                  <span className="sd-muted">Versus prior quarter</span>
                </div>
                <div>
                  <dt>Cash runway</dt>
                  <dd>
                    8.4 <span>mo</span>
                  </dd>
                  <span className="sd-muted">At current spend</span>
                </div>
              </dl>
            </div>

            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Cash flow forecast</h4>
                <div className="sd-chart-legend">
                  <span>
                    <i className="sd-legend-budget" />
                    Budget
                  </span>
                  <span>
                    <i className="sd-legend-forecast" />
                    Forecast
                  </span>
                </div>
              </div>

              <div
                className="sd-comparison-chart"
                role="img"
                aria-label="Illustrative cash flow comparison. July: budget $40,000,
                  forecast $46,000. August: budget $48,000, forecast $58,000.
                  September: budget $56,000, forecast $68,000.
                  October: budget $64,000, forecast $76,000."
              >
                {[
                  { month: "Jul", budget: 40, forecast: 46 },
                  { month: "Aug", budget: 48, forecast: 58 },
                  { month: "Sep", budget: 56, forecast: 68 },
                  { month: "Oct", budget: 64, forecast: 76 },
                ].map(({ month, budget, forecast }) => (
                  <div className="sd-comparison-group" key={month}>
                    <div className="sd-comparison-bars" aria-hidden="true">
                      <span
                        className="sd-bar-budget"
                        style={{ height: `${(budget / 80) * 100}%` }}
                      />
                      <span
                        className="sd-bar-forecast"
                        style={{ height: `${(forecast / 80) * 100}%` }}
                      />
                    </div>
                    <span className="sd-muted">{month}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "remote-hr-services":
        return (
          <>
            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Team overview</h4>
                <span className="sd-pill">Records current</span>
              </div>

              <div className="sd-team-summary">
                <div className="sd-headcount">
                  <strong>24</strong>
                  <span className="sd-muted">Active employees</span>
                </div>

                <div className="sd-avatar-stack" aria-hidden="true">
                  {["AL", "JM", "RK", "+21"].map((initials) => (
                    <span key={initials}>{initials}</span>
                  ))}
                </div>
              </div>

              <dl className="sd-team-details">
                <div>
                  <dt>Full-time</dt>
                  <dd>20</dd>
                </div>
                <div>
                  <dt>Part-time</dt>
                  <dd>4</dd>
                </div>
                <div>
                  <dt>New this month</dt>
                  <dd>2</dd>
                </div>
              </dl>
            </div>

            <div className="sd-card">
              <div className="sd-card-header">
                <h4>Onboarding workspace</h4>
                <span className="sd-muted">2 new starters</span>
              </div>

              <div className="sd-onboarding-board">
                <div className="sd-onboarding-column">
                  <h5>In progress · 1</h5>
                  <div className="sd-onboarding-person">
                    <span className="sd-person-avatar" aria-hidden="true">
                      AL
                    </span>
                    <strong>Alex L.</strong>
                    <span className="sd-muted">Orientation scheduled</span>
                  </div>
                </div>

                <div className="sd-onboarding-column">
                  <h5>Ready · 1</h5>
                  <div className="sd-onboarding-person">
                    <span className="sd-person-avatar" aria-hidden="true">
                      JM
                    </span>
                    <strong>Jordan M.</strong>
                    <span className="sd-muted">Documents complete</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  return (
    <div
      className="dashboard-stage service-dashboard"
      role="group"
      aria-label={`${service.name} illustrative dashboard`}
    >
      {renderWidgets()}
      <p className="sd-example-label">Illustrative service overview</p>
    </div>
  );
}


export function IndustryCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const scrollEndTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentPageRef = useRef(0);
  const currentVisualPageRef = useRef(0);
  // Start from the narrowest layout so the server-rendered carousel can never
  // stack a desktop-sized group before the client breakpoint is measured.
  const itemsPerPageRef = useRef(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const pages = buildIndustryPages(itemsPerPage);
  const loopedPages = Array.from({ length: 3 }, (_, copyIndex) =>
    pages.map((page, logicalIndex) => ({
      page,
      logicalIndex,
      clone: copyIndex !== 1,
      copyIndex,
    })),
  ).flat();

  useLayoutEffect(() => {
    const track = trackRef.current;
    const visualPage = pages.length + currentPageRef.current;
    const target = track?.querySelector<HTMLElement>(
      `[data-carousel-visual-page="${visualPage}"]`,
    );
    if (track && target) {
      const previousBehavior = track.style.scrollBehavior;
      track.style.scrollBehavior = "auto";
      currentVisualPageRef.current = visualPage;
      track.scrollLeft = target.offsetLeft;
      requestAnimationFrame(() => {
        track.style.scrollBehavior = previousBehavior;
      });
    }
  }, [itemsPerPage, pages.length]);

  useEffect(() => {
    function updatePageSize() {
      const nextItemsPerPage =
        window.innerWidth >= 1400
          ? 4
          : window.innerWidth >= 1100
            ? 3
            : window.innerWidth >= 768
              ? 2
              : 1;
      const previousItemsPerPage = itemsPerPageRef.current;
      if (nextItemsPerPage === previousItemsPerPage) return;

      const firstVisibleIndustry =
        (currentPageRef.current * previousItemsPerPage) % industries.length;
      const nextPageCount = industryPageCount(nextItemsPerPage);
      let nextPage = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (let index = 0; index < nextPageCount; index += 1) {
        const candidate = (index * nextItemsPerPage) % industries.length;
        const directDistance = Math.abs(candidate - firstVisibleIndustry);
        const circularDistance = Math.min(
          directDistance,
          industries.length - directDistance,
        );
        if (circularDistance < nearestDistance) {
          nearestDistance = circularDistance;
          nextPage = index;
        }
      }
      itemsPerPageRef.current = nextItemsPerPage;
      currentPageRef.current = nextPage;
      setItemsPerPage(nextItemsPerPage);
      setCurrentPage(nextPage);
    }

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
    };
  }, []);

  function scrollToVisualPage(visualIndex: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = track.querySelector<HTMLElement>(
      `[data-carousel-visual-page="${visualIndex}"]`,
    );
    if (!target) return;
    track.scrollTo({
      left: target.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function goToPage(index: number) {
    const safeIndex = Math.max(0, Math.min(index, pages.length - 1));
    const visualPage = pages.length + safeIndex;
    currentPageRef.current = safeIndex;
    currentVisualPageRef.current = visualPage;
    setCurrentPage(safeIndex);
    scrollToVisualPage(visualPage);
  }

  function goBy(direction: -1 | 1) {
    const nextVisualPage = currentVisualPageRef.current + direction;
    const nextPage =
      ((nextVisualPage % pages.length) + pages.length) % pages.length;
    currentPageRef.current = nextPage;
    currentVisualPageRef.current = nextVisualPage;
    setCurrentPage(nextPage);
    scrollToVisualPage(nextVisualPage);
  }

  function normalizeLoopPosition(visualIndex: number) {
    if (visualIndex >= pages.length && visualIndex < pages.length * 2) return;
    const track = trackRef.current;
    const realVisualIndex =
      visualIndex < pages.length
        ? visualIndex + pages.length
        : visualIndex - pages.length;
    const target = track?.querySelector<HTMLElement>(
      `[data-carousel-visual-page="${realVisualIndex}"]`,
    );
    if (!track || !target) return;
    const previousBehavior = track.style.scrollBehavior;
    track.style.scrollBehavior = "auto";
    currentVisualPageRef.current = realVisualIndex;
    track.scrollLeft = target.offsetLeft;
    requestAnimationFrame(() => {
      track.style.scrollBehavior = previousBehavior;
    });
  }

  function updatePaginationFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const trackLeft = track.getBoundingClientRect().left;
      const slideElements = Array.from(
        track.querySelectorAll<HTMLElement>("[data-carousel-visual-page]"),
      );
      let nearestVisualPage = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      slideElements.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestVisualPage = index;
        }
      });
      const nearestPage = Number(
        slideElements[nearestVisualPage]?.dataset.carouselLogicalPage ?? 0,
      );
      currentPageRef.current = nearestPage;
      currentVisualPageRef.current = nearestVisualPage;
      setCurrentPage(nearestPage);
      if (scrollEndTimer.current) clearTimeout(scrollEndTimer.current);
      scrollEndTimer.current = setTimeout(
        () => normalizeLoopPosition(nearestVisualPage),
        140,
      );
    });
  }

  return (
    <div
      className="industry-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Industries LedgifyBPO supports"
    >
      <button
        type="button"
        className="industry-carousel-arrow previous"
        onClick={() => goBy(-1)}
        aria-label="Previous industries"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="industry-viewport">
        <div
          className="industry-track"
          ref={trackRef}
          tabIndex={0}
          onScroll={updatePaginationFromScroll}
          onTouchStart={() =>
            normalizeLoopPosition(currentVisualPageRef.current)
          }
          aria-label="Swipe horizontally or use the arrow buttons to explore industries"
        >
          {loopedPages.map(
            ({ page, logicalIndex, clone, copyIndex }, visualIndex) => (
              <div
                className="industry-page"
                key={`${copyIndex}-${logicalIndex}`}
                data-carousel-visual-page={visualIndex}
                data-carousel-logical-page={logicalIndex}
                style={{ "--cards-per-page": itemsPerPage } as CSSProperties}
                aria-label={
                  clone
                    ? undefined
                    : `Industry group ${logicalIndex + 1} of ${pages.length}`
                }
                aria-hidden={clone ? true : undefined}
                inert={clone ? true : undefined}
              >
                {page.map((industry) => (
                  <article key={industry.slug} className="industry-card">
                    <Image
                      src={industry.image}
                      alt={`${industry.name} operations`}
                      fill
                      sizes="(max-width: 767px) 84vw, (max-width: 1099px) 44vw, (max-width: 1399px) 30vw, 285px"
                    />
                    <div className="industry-content">
                      <h3>{industry.name}</h3>
                      <p>{industry.description}</p>
                      <Link
                        href={`/industries#${industry.slug}`}
                        className="button industry-button"
                        aria-label={`Explore our work with ${industry.name} businesses`}
                      >
                        Explore Industries <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
      <button
        type="button"
        className="industry-carousel-arrow next"
        onClick={() => goBy(1)}
        aria-label="Next industries"
      >
        <ChevronRight aria-hidden="true" />
      </button>
      <div className="industry-pagination" aria-label="Choose an industry group">
        {pages.map((page, index) => (
          <button
            type="button"
            key={page.map((industry) => industry.slug).join("-")}
            className={currentPage === index ? "active" : ""}
            onClick={() => goToPage(index)}
            aria-label={`Show industry group ${index + 1} of ${pages.length}`}
            aria-current={currentPage === index ? "true" : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export function FounderCards({ raised = false }: { raised?: boolean }) {
  return (
    <div className={`founder-grid${raised ? " founder-grid-raised" : ""}`} id="founders">
      {founders.map((founder, index) => (
        <article key={founder.id} className="founder-card">
          <div className="founder-portrait">
            {!raised && (
              <span className="founder-index" aria-hidden="true">
                0{index + 1}
              </span>
            )}
            <Image
              src={founder.image}
              alt={`${founder.name}, ${founder.role} of LedgifyBPO`}
              fill
              sizes={raised
                ? "160px"
                : "(max-width: 480px) 86vw, (max-width: 767px) 44vw, 460px"}
            />
          </div>
          <div className="founder-information">
            {!raised && <p className="founder-kicker">LEADERSHIP</p>}
            <h3>{founder.name}</h3>
            <p>{founder.role}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function WhyLedgify() {
  const reasons = [
    {
      Icon: UsersRound,
      title: "Support built around your team",
      copy: "A collaborative extension of your business that takes time to understand how your operation actually works.",
    },
    {
      Icon: Layers3,
      title: "Capacity that scales with you",
      copy: "Flexible back-office support for focused small teams, growing businesses, and more complex organizations.",
    },
    {
      Icon: Workflow,
      title: "Clear processes, visible work",
      copy: "Organized workflows, dependable reporting, and support that fits the systems your team already uses.",
    },
  ];

  return (
    <section className="section why-section" id="why-ledgify">
      <div className="container why-grid">
        <div className="why-intro">
          <p className="eyebrow">WHY LEDGIFYBPO?</p>
          <h2><ScrollText>Support you can build on.</ScrollText></h2>
          <p>
            Trust comes from knowing the work is organized, the communication is
            clear, and your support can keep pace as the business changes.
          </p>
          <Link href="/why-ledgify-bpo" className="button">
            Why LedgifyBPO <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
        <div className="why-reasons">
          {reasons.map(({ Icon, title, copy }, index) => (
            <article key={title}>
              <span className="why-number">0{index + 1}</span>
              <span className="why-icon"><Icon aria-hidden="true" /></span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote:
      "“The bookkeeping process feels organized, and questions are handled with clear communication.”",
    name: "Sarah Mitchell",
    industry: "E-commerce",
  },
  {
    quote:
      "“Monthly reports arrive in a format that is easy for our team to review.”",
    name: "Daniel Brooks",
    industry: "Construction",
  },
  {
    quote:
      "“The team is consistent, responsive, and thoughtful about the details.”",
    name: "Elena Rossi",
    industry: "Professional Services",
  },
  {
    quote:
      "“It’s easy to coordinate with the team, and the records are organized and delivered on time.”",
    name: "Ayesha Khan",
    industry: "Real Estate",
  },
  {
    quote:
      "“The month-end process is much clearer now, and there’s no confusion during follow-ups.”",
    name: "Hamza Ali",
    industry: "Restaurants",
  },
  {
    quote:
      "“The reports are easy to understand, and our questions are answered quickly.”",
    name: "Sana Raza",
    industry: "E-commerce",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading
          scrollMotion
          eyebrow="TESTIMONIALS"
          title="Confidence, in their words."
        />
        <div
          className="marquee-window"
          tabIndex={0}
          aria-label="Testimonials. Focus or hover to pause scrolling."
        >
          {[0, 1].map((row) => (
            <div
              className={`marquee-track ${row === 1 ? "reverse" : ""}`}
              key={row}
            >
              {[0, 1].map((copy) => (
                <div
                  className="marquee-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {testimonials
                    .slice(row * 3, row * 3 + 3)
                    .map((item, index) => (
                      <figure className="testimonial-card" key={index}>
                        <blockquote>{item.quote}</blockquote>
                        <figcaption>
                          <strong>{item.name}</strong>
                          <span>{item.industry}</span>
                        </figcaption>
                      </figure>
                    ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA({ scrollMotion = false }: { scrollMotion?: boolean }) {
  return (
    <section
      className="final-cta"
      id="contact"
      aria-labelledby="contact-cta-heading"
    >
      <div className="cta-bars cta-bars-left">
        <Logo decorative />
      </div>

      <div className="cta-bars cta-bars-right">
        <Logo decorative />
      </div>

      <div className="container contact-cta-grid">
        {/* Direct grid child 1: wider invitation column */}
        <div className="contact-cta-invitation">
          <span className="contact-cta-eyebrow">
            LET&apos;S TALK ABOUT YOUR BUSINESS
          </span>

          <h2 id="contact-cta-heading">
            {scrollMotion ? (
              <ScrollText>Less on your plate.<br />More clarity ahead.</ScrollText>
            ) : (
              <>Less on your plate.<br />More clarity ahead.</>
            )}
          </h2>

          <p className="contact-cta-description">
            From everyday bookkeeping to bigger financial decisions, let&apos;s
            find the right support for your business.
          </p>

          <div className="contact-cta-action">
            <ConsultationButton />
          </div>

          <p className="contact-cta-reassurance">
            An introductory conversation. No obligation.
          </p>
        </div>

        {/* Direct grid child 2: narrower conversation panel */}
        <div
          className="contact-cta-panel"
          role="group"
          aria-labelledby="contact-cta-panel-heading"
        >
          <h3 id="contact-cta-panel-heading">Your first conversation</h3>

          <ol className="contact-cta-steps">
            <li>
              <span className="contact-cta-number" aria-hidden="true">
                01
              </span>
              <div>
                <h4>Where you are today</h4>
                <p>Your current setup, priorities, and challenges.</p>
              </div>
            </li>

            <li>
              <span className="contact-cta-number" aria-hidden="true">
                02
              </span>
              <div>
                <h4>Where you need support</h4>
                <p>
                  The work you want off your plate and the expertise you need.
                </p>
              </div>
            </li>

            <li>
              <span className="contact-cta-number" aria-hidden="true">
                03
              </span>
              <div>
                <h4>What comes next</h4>
                <p>A practical next step tailored to your business.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  const motionRoot = useRef<HTMLElement>(null);
  useHomeScrollMotion(motionRoot);

  return (
    <main id="main" ref={motionRoot}>
      <HeroSurface>
        <div className="hero-copy">
          <p className="eyebrow">
            FINANCE. OPERATIONS. PEOPLE.
          </p>
          <h1>
            <span data-hero-line><span>Clarity in Your Books.</span></span>{" "}
            <span data-hero-line><span>Certainty in Your Decisions.</span></span>
          </h1>
          <p className="hero-description">
            LedgifyBPO brings structure to the financial, operational, and
            people functions growing businesses rely on—from daily execution
            to informed decisions.
          </p>
          <div className="hero-actions">
            <ConsultationButton />
            <Link href="#services" className="text-link">
              Explore Services <ArrowRight size={17} />
            </Link>
          </div>
          <p className="reassurance">
            Built for businesses ready to grow with confidence.
          </p>
        </div>
      </HeroSurface>
      <section className="trust-strip" aria-label="Software integrations">
        <div className="container trust-heading">
          <p>WORKS WITH THE TOOLS YOU ALREADY USE</p>
          <span>Experienced across the platforms your business already depends on.</span>
        </div>
        <div className="tool-window" tabIndex={0} aria-label="Supported business tools. Focus or hover to pause scrolling.">
          <div className="tool-track">
            {[0, 1].map((copy) => (
              <div className="tool-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {tools.map(({ Icon, name }) => (
                  <div className="tool-brand" key={name}>
                    <Icon aria-hidden="true" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section value-section" id="ledgify-difference">
        <div className="container">
          <SectionHeading
            scrollMotion
            eyebrow="THE LEDGIFY DIFFERENCE"
            title="Built Different. Built for You."
          />
          <div className="value-grid">
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <article className="value-item" key={value.title}>
                  <span className="icon-chip">
                    <Icon size={24} strokeWidth={1.7} />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <ServicesSection scrollMotion />
      <section className="section industries-section" id="industries">
        <div className="container">
          <SectionHeading
            scrollMotion
            eyebrow="WHO WE WORK WITH"
            title="Your industry. Our expertise."
            description="Specialized accounting for the way your business works."
          />
          <IndustryCards />
          <div className="section-bottom-link">
            <Link href="/industries" className="text-link">
              View all industries <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <WhyLedgify />
      <section className="section founders-section" id="about">
        <div className="container">
          <SectionHeading
            scrollMotion
            eyebrow="ABOUT LEDGIFYBPO"
            title="Meet the founders."
            description="The people behind the partnership."
            centered
          />
          <FounderCards raised />
          <div className="section-bottom-link">
            <Link href="/about" className="text-link">
              Learn more about our story <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <Testimonials />
      <FinalCTA scrollMotion />
    </main>
  );
}
