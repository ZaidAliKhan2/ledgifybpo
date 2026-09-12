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
  Pause,
  Play,
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
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ConsultationButton, Logo } from "@/components/site";
import { services, industries, values } from "@/lib/content";
import { ServicesSection } from "./services-section";

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

const heroSlides = [
  {
    src: "/images/hero/office-collaboration.webp",
    alt: "Finance professionals reviewing reports together in a modern office",
  },
  {
    src: "/images/hero/financial-review.webp",
    alt: "Finance specialist reviewing business reports at her desk",
  },
  {
    src: "/images/hero/operations-team.webp",
    alt: "Back-office operations team collaborating around financial documents",
  },
];

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-heading${centered ? " centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
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
      <p className="sd-example-label">Illustrative dashboard · Sample data</p>
    </div>
  );
}


export function IndustryCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrame = useRef<number | null>(null);
  const currentPageRef = useRef(0);
  const itemsPerPageRef = useRef(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const pages = Array.from(
    { length: Math.ceil(industries.length / itemsPerPage) },
    (_, index) =>
      industries.slice(index * itemsPerPage, (index + 1) * itemsPerPage),
  );

  useEffect(() => {
    function updatePageSize() {
      const nextItemsPerPage =
        window.innerWidth >= 1400 ? 4 : window.innerWidth >= 1100 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      const previousItemsPerPage = itemsPerPageRef.current;
      if (nextItemsPerPage === previousItemsPerPage) return;

      const firstVisibleIndustry =
        currentPageRef.current * previousItemsPerPage;
      const nextPage = Math.floor(firstVisibleIndustry / nextItemsPerPage);
      itemsPerPageRef.current = nextItemsPerPage;
      currentPageRef.current = nextPage;
      setItemsPerPage(nextItemsPerPage);
      setCurrentPage(nextPage);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const track = trackRef.current;
          const target = track?.querySelector<HTMLElement>(
            `[data-carousel-page="${nextPage}"]`,
          );
          if (track && target) track.scrollTo({ left: target.offsetLeft });
        });
      });
    }

    updatePageSize();
    window.addEventListener("resize", updatePageSize);
    return () => {
      window.removeEventListener("resize", updatePageSize);
      if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    };
  }, []);

  function goToPage(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const safeIndex = Math.max(0, Math.min(index, pages.length - 1));
    const target = track.querySelector<HTMLElement>(
      `[data-carousel-page="${safeIndex}"]`,
    );
    if (!target) return;
    currentPageRef.current = safeIndex;
    setCurrentPage(safeIndex);
    track.scrollTo({
      left: target.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }

  function updatePaginationFromScroll() {
    const track = trackRef.current;
    if (!track) return;
    if (scrollFrame.current) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      const trackLeft = track.getBoundingClientRect().left;
      const slideElements = Array.from(
        track.querySelectorAll<HTMLElement>("[data-carousel-page]"),
      );
      let nearestPage = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;
      slideElements.forEach((slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestPage = index;
        }
      });
      currentPageRef.current = nearestPage;
      setCurrentPage(nearestPage);
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
        onClick={() => goToPage(currentPage - 1)}
        aria-label="Previous industries"
        disabled={currentPage === 0}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="industry-viewport">
        <div
          className="industry-track"
          ref={trackRef}
          tabIndex={0}
          onScroll={updatePaginationFromScroll}
          aria-label="Swipe horizontally or use the arrow buttons to explore industries"
        >
          {pages.map((page, pageIndex) => (
          <div
            className="industry-page"
            key={page.map((industry) => industry.slug).join("-")}
            data-carousel-page={pageIndex}
            style={{ "--cards-per-page": itemsPerPage } as CSSProperties}
            aria-label={`Industry group ${pageIndex + 1} of ${pages.length}`}
          >
            {page.map((industry) => (
              <article
                key={industry.slug}
                className="industry-card"
                id={industry.slug}
              >
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
          ))}
        </div>
      </div>
      <button
        type="button"
        className="industry-carousel-arrow next"
        onClick={() => goToPage(currentPage + 1)}
        aria-label="Next industries"
        disabled={currentPage === pages.length - 1}
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
      {[1, 2].map((number) => (
        <article key={number} className="founder-card">
          <div className="founder-portrait">
            {!raised && (
              <span className="founder-index" aria-hidden="true">
                0{number}
              </span>
            )}
            <Image
              src={
                number === 1
                  ? "/images/founder-1-name.png"
                  : "/images/founder-2-name.png"
              }
              alt={`${number === 1 ? "Naveed" : "Saud"}, Co-Founder and ${number === 1 ? "CEO" : "COO"} of LedgifyBPO`}
              fill
              sizes={raised
                ? "160px"
                : "(max-width: 480px) 86vw, (max-width: 767px) 44vw, 460px"}
            />
          </div>
          <div className="founder-information">
            {!raised && <p className="founder-kicker">LEADERSHIP</p>}
            <h3>{number == 1 ? "Naveed" : "Saud"}</h3>
            <p>Co-Founder &amp; {number === 1 ? "CEO" : "COO"}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (paused || reduceMotion) return;
    const interval = window.setInterval(
      () => setActive((current) => (current + 1) % heroSlides.length),
      6000,
    );
    return () => window.clearInterval(interval);
  }, [paused]);

  function select(direction: -1 | 1) {
    setActive(
      (current) =>
        (current + direction + heroSlides.length) % heroSlides.length,
    );
  }

  return (
    <div
      className="hero-slideshow"
      role="region"
      aria-roledescription="carousel"
      aria-label="LedgifyBPO teams at work"
    >
      <div className="hero-slides">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            fill
            priority={index === 0}
            sizes="(max-width: 767px) 100vw, 47vw"
            className={index === active ? "active" : ""}
            aria-hidden={index !== active}
          />
        ))}
      </div>
      <div className="hero-slide-overlay" aria-hidden="true" />
      <div className="hero-slide-caption">
        <span>Finance operations, thoughtfully supported.</span>
        <span>{String(active + 1).padStart(2, "0")} / 03</span>
      </div>
      <div className="hero-slide-controls">
        <button type="button" onClick={() => select(-1)} aria-label="Previous office image">
          <ChevronLeft aria-hidden="true" />
        </button>
        <div className="hero-slide-dots" aria-label="Choose an office image">
          {heroSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              className={active === index ? "active" : ""}
              aria-label={`Show image ${index + 1} of ${heroSlides.length}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
        <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Play office slideshow" : "Pause office slideshow"} aria-pressed={paused}>
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => select(1)} aria-label="Next office image">
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
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
          <h2>A back office you can build on.</h2>
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
      "“We spend less time catching up on our books and more time focusing on our business.”",
    industry: "E-commerce",
  },
  {
    quote:
      "“Having accurate, up-to-date financials makes our next decision a lot clearer.”",
    industry: "Construction",
  },
  {
    quote:
      "“Our back office finally feels as organized as the business we want to build.”",
    industry: "Real Estate",
  },
  {
    quote:
      "“A consistent month-end process gives us one less thing to worry about.”",
    industry: "Restaurants",
  },
  {
    quote:
      "“We can see where we stand and plan our next steps with more confidence.”",
    industry: "E-commerce",
  },
  {
    quote:
      "“The support behind the numbers makes all the difference to our day-to-day.”",
    industry: "Construction",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="Confidence, in their words."
          description="Illustrative testimonials. Verified client stories to be added."
        />
        <div
          className="marquee-window"
          tabIndex={0}
          aria-label="Sample testimonials. Focus or hover to pause scrolling."
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
                          <strong>Client name</strong>
                          <span>{item.industry} · Sample testimonial</span>
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

export function FinalCTA() {
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
            Less on your plate.
            <br />
            More clarity ahead.
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
  return (
    <main id="main">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-enter" style={{ animationDelay: "0ms" }}>
              THE BETTER BACK OFFICE
            </p>
            <h1 className="hero-enter" style={{ animationDelay: "90ms" }}>
              Clarity in Your Books. Certainty in Your Decisions.
            </h1>
            <p
              className="hero-description hero-enter"
              style={{ animationDelay: "180ms" }}
            >
              LedgifyBPO delivers meticulous day-to-day bookkeeping, audit-ready
              financial reporting, and payroll infrastructure designed
              specifically for growth-stage businesses.
            </p>
            <div
              className="hero-actions hero-enter"
              style={{ animationDelay: "270ms" }}
            >
              <ConsultationButton />
              <Link href="#services" className="text-link">
                Explore Services <ArrowRight size={17} />
              </Link>
            </div>
            <p
              className="reassurance hero-enter"
              style={{ animationDelay: "360ms" }}
            >
              Built for businesses ready to grow with confidence.
            </p>
          </div>
          <HeroSlideshow />
        </div>
      </section>
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
      <ServicesSection />
      <section className="section industries-section" id="industries">
        <div className="container">
          <SectionHeading
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
            eyebrow="ABOUT LEDGIFYBPO"
            title="Meet the founders."
            description="The people behind your back office."
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
      <FinalCTA />
    </main>
  );
}
