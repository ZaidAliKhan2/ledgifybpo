"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Building2,
  ShieldCheck,
  Cloud,
  Linkedin,
  Check,
  MoreHorizontal,
} from "lucide-react";
import {
  SiQuickbooks,
  SiXero,
  SiGusto,
  SiStripe,
  SiExpensify,
} from "react-icons/si";
import { useRef, useState, type KeyboardEvent } from "react";
import { ConsultationButton, Logo } from "@/components/site";
import { services, industries, values } from "@/lib/content";

const valueIcons = [Clock, Building2, ShieldCheck, Cloud];
const tools = [
  { Icon: SiQuickbooks, name: "QuickBooks" },
  { Icon: SiXero, name: "Xero" },
  { Icon: SiGusto, name: "Gusto" },
  { Icon: SiStripe, name: "Stripe" },
  { Icon: SiExpensify, name: "Expensify" },
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

export function ServicesSection() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % services.length;
    else if (event.key === "ArrowLeft")
      next = (index - 1 + services.length) % services.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="OUR SERVICES"
          title="Your back office. Taken care of."
          description="The right financial support, at every stage of your growth."
        />
        <div
          className="service-tabs"
          role="tablist"
          aria-label="Accounting services"
        >
          {services.map((service, index) => (
            <button
              ref={(element) => {
                tabs.current[index] = element;
              }}
              key={service.slug}
              type="button"
              role="tab"
              id={`tab-${index}`}
              aria-selected={active === index}
              aria-controls="service-panel"
              tabIndex={active === index ? 0 : -1}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigateTabs(event, index)}
            >
              {service.name}
            </button>
          ))}
        </div>
        <div
          className="service-panel"
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          <DashboardWidgets active={active} />
          <div className="service-copy" key={active}>
            <h3>{services[active].name}</h3>
            <p>{services[active].description}</p>
            <Link
              href={`/services/${services[active].slug}`}
              className="text-link"
            >
              Learn more <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustryCards() {
  return (
    <div className="industry-grid">
      {industries.map((industry) => (
        <article key={industry.slug} className="industry-card">
          <Image
            src={industry.image}
            alt={`${industry.name} business`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
          />
          <div className="industry-content">
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
            <Link
              href={`/industries/${industry.slug}`}
              className="button industry-button"
              aria-label={`See how we help ${industry.name} businesses`}
            >
              See How We Help <ArrowRight size={15} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function FounderCards() {
  return (
    <div className="founder-grid" id="founders">
      {[1, 2].map((number) => (
        <article key={number} className="founder-card" tabIndex={0}>
          <div className="founder-portrait">
            <Image
              src={`/images/founder-${number}-name.png`}
              alt={`Placeholder portrait for co-founder ${number}`}
              fill
              sizes="(max-width: 600px) 85vw, 400px"
            />
          </div>
          <div className="founder-information">
            <div>
              <h3>{number == 1 ? "Naveed" : "Saud"}</h3>
              <p>Co-Founder &amp; {number === 1 ? "CEO" : "COO"}</p>
            </div>
            <Link
              href="/about#linkedin"
              aria-label={`Co-founder ${number} LinkedIn profile information`}
              className="founder-linkedin"
            >
              <Linkedin size={19} />
            </Link>
          </div>
          <p className="founder-bio">Founder biography to be added.</p>
        </article>
      ))}
    </div>
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
          <div className="hero-image">
            <Image
              src="/images/main-hero.jpeg"
              alt="Bookkeeping professional reviewing financial records at her desk"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 47vw"
            />
          </div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Software integrations">
        <div className="container">
          <p>INTEGRATES WITH THE TOOLS YOU ALREADY USE</p>
          <div className="tool-row">
            {tools.map(({ Icon, name }) => (
              <div className="tool-brand" key={name} tabIndex={0}>
                <Icon aria-hidden="true" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section value-section" id="why-ledgify">
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
      <section className="section founders-section" id="about">
        <div className="container">
          <SectionHeading
            eyebrow="ABOUT LEDGIFYBPO"
            title="Meet the founders."
            description="The people behind your back office."
            centered
          />
          <FounderCards />
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
