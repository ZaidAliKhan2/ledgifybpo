import { createPageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ClipboardCheck,
  Layers3,
  Plus,
  UsersRound,
  Workflow,
} from "lucide-react";
import { SiOdoo, SiQuickbooks, SiSap, SiXero } from "react-icons/si";
import { FaMicrosoft, FaSlack } from "react-icons/fa6";
import { ConsultationButton, SiteShell } from "@/components/site";
import { founders, services } from "@/lib/content";
import { servicePageContent } from "@/lib/service-page-content";
import styles from "./why-page.module.css";

export const metadata = createPageMetadata("/why-ledgify-bpo");

const reasons = [
  {
    Icon: UsersRound,
    title: "A fit for your team",
    copy: "Start with the responsibilities you need help with, and keep decisions with the right internal owners.",
  },
  {
    Icon: Layers3,
    title: "Room to adjust",
    copy: "Review the scope and capacity together as transaction volumes, priorities, or workloads change.",
  },
  {
    Icon: ClipboardCheck,
    title: "Work you can follow",
    copy: "Know who owns each task, what is ready for review, and which questions need your input.",
  },
  {
    Icon: Workflow,
    title: "Familiar systems",
    copy: "Build on your existing records, tools, and approval processes so handoffs stay connected.",
  },
];

const comparison = [
  {
    topic: "Getting started",
    inHouse: "Recruit, onboard, and make time to train each new hire.",
    ledgify: "Agree the work, responsibilities, and handoffs with a support partner.",
  },
  {
    topic: "Ongoing commitment",
    inHouse: "Manage salaries, benefits, equipment, and employment overhead.",
    ledgify: "Scope support around the work you need, with terms agreed together.",
  },
  {
    topic: "Changing workload",
    inHouse: "Fit new demands around available headcount or additional hiring.",
    ledgify: "Revisit capacity and priorities as your business needs change.",
  },
  {
    topic: "Range of skills",
    inHouse: "Develop specialist skills internally or recruit for additional roles.",
    ledgify: "Coordinate support across finance, reporting, planning, and HR.",
  },
  {
    topic: "Continuity",
    inHouse: "Plan for leave, team changes, and knowledge transfer.",
    ledgify: "Keep recurring work documented, with clear owners and review points.",
  },
];

const steps = [
  {
    title: "Understand your operation",
    copy: "Share your priorities, current workload, and the systems your team relies on.",
  },
  {
    title: "Shape the right support",
    copy: "Agree the scope, access, responsibilities, and outputs before work begins.",
  },
  {
    title: "Build a working rhythm",
    copy: "Coordinate tasks, review the work, and adjust the arrangement as needs evolve.",
  },
];

const toolIcons = {
  QuickBooks: SiQuickbooks,
  Xero: SiXero,
  SAP: SiSap,
  Odoo: SiOdoo,
  "Microsoft 365": FaMicrosoft,
  Slack: FaSlack,
};

const workflowTools = [
  ...servicePageContent.accounting.integrations.items,
  ...servicePageContent["remote-hr-services"].integrations.items.filter(
    (tool) => tool.name === "Microsoft 365" || tool.name === "Slack",
  ),
];

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <header className={styles.heading}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </header>
  );
}

export default function WhyLedgifyBPOPage() {
  return (
    <SiteShell>
      <main id="main" className={styles.page}>
        <PageStructuredData path="/why-ledgify-bpo" />
        <section className={styles.hero} aria-labelledby="why-heading">
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">WHY LEDGIFYBPO</p>
              <h1 id="why-heading">More support.<br />More room to lead.</h1>
              <p className={styles.intro}>
                Bring finance and people administration into a clear working
                rhythm. We take on defined responsibilities so your team can
                focus on the decisions and relationships that move the business forward.
              </p>
              <div className={styles.heroActions}>
                <ConsultationButton />
                <Link href="#compare" className="text-link">
                  Compare the approach <ArrowDown size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div
              className={styles.partnership}
              role="img"
              aria-label="Your team leads on customers, people, and decisions. LedgifyBPO supports bookkeeping, accounting and reporting, tax, advisory, and HR through shared priorities and clear responsibilities."
            >
              <div aria-hidden="true">
                <div className={styles.teamCard}>
                  <div className={styles.cardTitle}>
                    <UsersRound size={22} />
                    <strong>Your team</strong>
                  </div>
                  <p>More space for what you lead.</p>
                  <div className={styles.teamPriorities}>
                    <span>Customers</span><span>People</span><span>Decisions</span>
                  </div>
                </div>
                <div className={styles.connection}><Plus size={19} /></div>
                <div className={styles.partnerCard}>
                  <div className={styles.partnerTitle}>
                    <strong>LEDGIFYBPO</strong><Layers3 size={23} />
                  </div>
                  <p>The support behind your operation.</p>
                  <ul>
                    {services.map((service) => (
                      <li key={service.slug}><Check size={14} />{service.name}</li>
                    ))}
                  </ul>
                </div>
                <p className={styles.partnershipNote}>Shared priorities. Clear responsibilities.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.reasons} aria-labelledby="reasons-heading">
          <div className="container">
            <SectionHeading eyebrow="THE PRACTICAL DIFFERENCE" title="A working relationship built to fit." id="reasons-heading" />
            <div className={styles.reasonGrid}>
              {reasons.map(({ Icon, title, copy }) => (
                <article key={title}>
                  <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.comparison} id="compare" aria-labelledby="comparison-heading">
          <div className="container">
            <div className={styles.comparisonIntro}>
              <SectionHeading eyebrow="TWO WAYS TO BUILD CAPACITY" title="Build in-house. Or extend your team." id="comparison-heading" />
              <p>
                The right mix depends on your business. Here is how the two
                approaches differ in practice.
              </p>
            </div>
            <div className={styles.comparisonGrid}>
              <article className={styles.inHouse}>
                <header>
                  <Building2 size={25} strokeWidth={1.5} aria-hidden="true" />
                  <h3>Building in-house</h3>
                  <p>Grow the roles inside your business.</p>
                </header>
                <ul>
                  {comparison.map((row) => (
                    <li key={row.topic}>
                      <span className={styles.comparisonIcon}><Plus size={15} aria-hidden="true" /></span>
                      <div><h4>{row.topic}</h4><p>{row.inHouse}</p></div>
                    </li>
                  ))}
                </ul>
              </article>
              <article className={styles.withLedgify}>
                <header>
                  <Layers3 size={25} strokeWidth={1.5} aria-hidden="true" />
                  <h3>Working with LedgifyBPO</h3>
                  <p>Add support around your existing team.</p>
                </header>
                <ul>
                  {comparison.map((row) => (
                    <li key={row.topic}>
                      <span className={styles.comparisonIcon}><Check size={15} aria-hidden="true" /></span>
                      <div><h4>{row.topic}</h4><p>{row.ledgify}</p></div>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <p className={styles.comparisonNote}>
              Your team retains business decisions and approvals. Services,
              capacity, and responsibilities are agreed for your engagement.
            </p>
          </div>
        </section>

        <section className={styles.process} aria-labelledby="process-heading">
          <div className="container">
            <SectionHeading eyebrow="WORKING TOGETHER" title="A clear start. A connected way of working." id="process-heading" />
            <ol className={styles.steps}>
              {steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.tools} aria-labelledby="tools-heading">
          <div className={`container ${styles.toolsGrid}`}>
            <div>
              <SectionHeading eyebrow="YOUR EXISTING WORKFLOW" title="The tools you know. The support you need." id="tools-heading" />
              <p>We agree the setup around your systems, records, and approved access.</p>
            </div>
            <ul className={styles.toolList}>
              {workflowTools.map((tool) => {
                const Icon = toolIcons[tool.name as keyof typeof toolIcons] ?? Workflow;
                return (
                  <li key={tool.name}><Icon aria-hidden="true" /><span>{tool.name}</span></li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Homepage quotes are illustrative, not verified client evidence.
            Use the existing company identity and approach as a concise trust section. */}
        <section className={styles.proof} aria-labelledby="proof-heading">
          <div className={`container ${styles.proofGrid}`}>
            <div>
              <p className="eyebrow">THE PEOPLE BEHIND THE WORK</p>
              <h2 id="proof-heading">A partner you can get to know.</h2>
              <p>
                LedgifyBPO is led by co-founders {founders[0].name}, {founders[0].title}, and {founders[1].name}, {founders[1].title}.
                Our approach starts with understanding your operation and agreeing
                how the work will be reviewed.
              </p>
              <Link href="/about" className="text-link">
                Meet LedgifyBPO <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.proofDetail}>
              <ClipboardCheck size={27} strokeWidth={1.5} aria-hidden="true" />
              <h3>Clarity from the first conversation.</h3>
              <p>Talk through the scope, the people involved, and the handoffs your team needs before deciding how to work together.</p>
              <Link href="/services" className="text-link">
                Explore our services <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-heading">
          <div className={`container ${styles.ctaPanel}`}>
            <div>
              <p className="eyebrow">LET&apos;S TALK</p>
              <h2 id="cta-heading">Build the support your business needs next.</h2>
              <p>Start with the work on your plate. We&apos;ll explore where LedgifyBPO can help.</p>
            </div>
            <ConsultationButton />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
