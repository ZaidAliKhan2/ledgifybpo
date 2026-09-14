import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  CloudCog,
  FileCheck2,
  FileSpreadsheet,
  Files,
  FolderKanban,
  Landmark,
  ListChecks,
  MessageSquareText,
  ReceiptText,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundCheck,
  UserRoundPlus,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { ConsultationButton } from "@/components/site";
import type { getServiceBySlug, ServiceSlug } from "@/lib/service-page-content";
import styles from "./service-page.module.css";

type Service = ReturnType<typeof getServiceBySlug>;
type PageContent = Service["page"];

const themeIcons: Record<ServiceSlug, readonly LucideIcon[]> = {
  bookkeeping: [ReceiptText, RefreshCcw, BookOpenCheck, SearchCheck, ClipboardCheck, FileCheck2],
  accounting: [Files, SearchCheck, ChartNoAxesCombined, Landmark, ListChecks, FileCheck2],
  tax: [FolderKanban, CalendarDays, FileCheck2, ListChecks, MessageSquareText, ShieldCheck],
  advisory: [Target, ChartNoAxesCombined, CircleDollarSign, TrendingUp, SearchCheck, Sparkles],
  "remote-hr-services": [UsersRound, UserRoundPlus, Files, CircleDollarSign, MessageSquareText, UserRoundCheck],
};

function ThemeIcon({ theme, index, size = 20 }: { theme: ServiceSlug; index: number; size?: number }) {
  const Icon = themeIcons[theme][index % themeIcons[theme].length] ?? Check;
  return <Icon size={size} strokeWidth={1.65} aria-hidden="true" />;
}

function BookkeepingVisual() {
  const rows = [
    { icon: "S", source: "Stripe payout", detail: "Sales income", amount: "+$12,480", tone: "positive" },
    { icon: "A", source: "Adobe", detail: "Software", amount: "−$184", tone: "neutral" },
    { icon: "P", source: "Payroll", detail: "Wages", amount: "−$8,420", tone: "neutral" },
  ];

  return (
    <div className={styles.bookkeepingVisual}>
      <div className={styles.visualToolbar}>
        <div><span className={styles.liveDot} /> Monthly ledger</div>
        <span>June close</span>
      </div>
      <div className={styles.ledgerCard}>
        <div className={styles.cardHeading}>
          <div><small>INBOX</small><strong>Recent activity</strong></div>
          <span>24 items</span>
        </div>
        <div className={styles.ledgerRows}>
          {rows.map((row) => (
            <div className={styles.ledgerRow} key={row.source}>
              <span className={styles.sourceIcon}>{row.icon}</span>
              <div><strong>{row.source}</strong><small>{row.detail}</small></div>
              <span className={row.tone === "positive" ? styles.positive : ""}>{row.amount}</span>
              <CheckCircle2 size={16} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.reconcileCard}>
        <div className={styles.reconcileRing}><strong>96%</strong><small>matched</small></div>
        <div><small>RECONCILIATION</small><strong>Bank balance aligned</strong><span>2 items need review</span></div>
        <ArrowRight size={18} aria-hidden="true" />
      </div>
    </div>
  );
}

function AccountingVisual() {
  return (
    <div className={styles.accountingVisual}>
      <div className={styles.reportRail}>
        <span className={styles.railLogo}>L</span>
        <span className={styles.railActive}><ChartNoAxesCombined /></span>
        <span><FileSpreadsheet /></span>
        <span><Files /></span>
      </div>
      <div className={styles.reportCanvas}>
        <div className={styles.visualToolbar}>
          <div>Performance overview</div><span>Jun 2026</span>
        </div>
        <div className={styles.metricPair}>
          <div><small>REVENUE</small><strong>$184.2k</strong><span>↑ 12.4%</span></div>
          <div><small>NET MARGIN</small><strong>18.4%</strong><span>↑ 2.1%</span></div>
        </div>
        <div className={styles.chartCard}>
          <div><small>MONTHLY PERFORMANCE</small><span>Actual <i /> Budget <i /></span></div>
          <div className={styles.barChart}>
            {[42, 58, 51, 69, 64, 84].map((height, index) => (
              <span key={height} style={{ "--bar-height": `${height}%` } as React.CSSProperties} data-last={index === 5} />
            ))}
          </div>
          <div className={styles.chartLabels}><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span></div>
        </div>
        <div className={styles.reportFooter}><span><CheckCircle2 />Accounts reviewed</span><strong>Statements ready <ChevronRight /></strong></div>
      </div>
    </div>
  );
}

function TaxVisual() {
  const tasks = [
    ["Financial statements", "Ready"],
    ["Supporting schedules", "Ready"],
    ["Advisor review", "In review"],
  ];

  return (
    <div className={styles.taxVisual}>
      <div className={styles.taxHeader}>
        <div><CalendarDays /><span><small>TAX WORKSPACE</small><strong>Filing readiness</strong></span></div>
        <span className={styles.secureBadge}><ShieldCheck /> Secure</span>
      </div>
      <div className={styles.taxProgress}>
        <div><span>Preparation progress</span><strong>75%</strong></div>
        <i><span /></i>
      </div>
      <div className={styles.taxGrid}>
        <div className={styles.documentStack}>
          <div className={styles.documentBack} />
          <div className={styles.documentCard}>
            <FileCheck2 />
            <small>DOCUMENT PACKAGE</small>
            <strong>2026 filing records</strong>
            <span>18 files organized</span>
            <div><i /><i /><i /></div>
          </div>
        </div>
        <div className={styles.deadlineCard}>
          <small>NEXT MILESTONE</small>
          <div><strong>14</strong><span>days<br />remaining</span></div>
          <p>Advisor review</p>
        </div>
      </div>
      <div className={styles.taxTasks}>
        {tasks.map(([task, status], index) => (
          <div key={task}><span>{index < 2 ? <Check /> : <RefreshCcw />}</span><strong>{task}</strong><small>{status}</small></div>
        ))}
      </div>
    </div>
  );
}

function AdvisoryVisual() {
  return (
    <div className={styles.advisoryVisual}>
      <div className={styles.visualToolbar}>
        <div><span className={styles.liveDot} /> Forecast studio</div><span>18-month view</span>
      </div>
      <div className={styles.scenarioTabs}><span>Conservative</span><span className={styles.activeTab}>Base plan</span><span>Upside</span></div>
      <div className={styles.forecastCard}>
        <div className={styles.forecastTop}>
          <div><small>PROJECTED CASH POSITION</small><strong>$428k</strong><span>+6.8% vs. current plan</span></div>
          <TrendingUp />
        </div>
        <svg className={styles.forecastChart} viewBox="0 0 520 180" role="presentation">
          <defs>
            <linearGradient id="forecastArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6d5dfc" stopOpacity=".3" />
              <stop offset="100%" stopColor="#6d5dfc" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path className={styles.chartGridLine} d="M0 35H520M0 90H520M0 145H520" />
          <path className={styles.forecastArea} d="M0 145 C55 138 82 118 126 124 S205 86 254 93 S337 58 390 65 S459 30 520 22 L520 180 L0 180Z" />
          <path className={styles.forecastLine} d="M0 145 C55 138 82 118 126 124 S205 86 254 93 S337 58 390 65 S459 30 520 22" />
          <circle cx="390" cy="65" r="5" />
          <circle cx="520" cy="22" r="6" />
        </svg>
        <div className={styles.forecastLabels}><span>Now</span><span>Q2</span><span>Q3</span><span>Q4</span><span>Next year</span></div>
      </div>
      <div className={styles.decisionCard}><Target /><div><small>DECISION SIGNAL</small><strong>Hiring plan stays within runway target</strong></div><ArrowUpRight /></div>
    </div>
  );
}

function HRVisual() {
  const tasks = ["Employee profile", "Policy acknowledgement", "Payroll information"];

  return (
    <div className={styles.hrVisual}>
      <div className={styles.visualToolbar}>
        <div><span className={styles.liveDot} /> People operations</div><span>3 active workflows</span>
      </div>
      <div className={styles.employeeCard}>
        <span className={styles.avatar}>AM</span>
        <div><small>NEW TEAM MEMBER</small><strong>Alex Morgan</strong><span>Operations · Starts Monday</span></div>
        <span className={styles.onTrack}>On track</span>
      </div>
      <div className={styles.onboardingCard}>
        <div className={styles.cardHeading}><div><small>ONBOARDING</small><strong>Getting started</strong></div><span>3 of 4</span></div>
        <div className={styles.onboardingProgress}><span /></div>
        <div className={styles.onboardingTasks}>
          {tasks.map((task) => <div key={task}><Check /><span>{task}</span><small>Complete</small></div>)}
          <div><MessageSquareText /><span>Manager welcome</span><small>Today</small></div>
        </div>
      </div>
      <div className={styles.hrFlow}>
        <span className={styles.flowActive}>Onboard</span><i /><span>Active</span><i /><span>Review</span>
      </div>
    </div>
  );
}

function HeroVisual({ service }: { service: Service }) {
  const visuals: Record<ServiceSlug, React.ReactNode> = {
    bookkeeping: <BookkeepingVisual />,
    accounting: <AccountingVisual />,
    tax: <TaxVisual />,
    advisory: <AdvisoryVisual />,
    "remote-hr-services": <HRVisual />,
  };

  return (
    <div className={styles.heroVisual} role="img" aria-label={service.page.hero.visualTitle}>
      <div aria-hidden="true">{visuals[service.slug]}</div>
    </div>
  );
}

export function ServiceHero({ service }: { service: Service }) {
  const { page } = service;

  return (
    <section className={styles.hero} data-theme={service.slug}>
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <Link href="/#services" className={styles.backLink}>
            <ArrowLeft size={15} aria-hidden="true" />
            All services
          </Link>
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1>{page.hero.headline}</h1>
          <p className={styles.heroDescription}>{page.hero.description}</p>
          <div className={styles.heroActions}>
            <ConsultationButton service={service.name}>Book a Consultation</ConsultationButton>
            <a className={styles.inlineLink} href="#capabilities">
              Explore the service <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className={styles.heroProof}>
            <span><CheckCircle2 />Clear scope</span>
            <span><CheckCircle2 />Flexible support</span>
            <span><CheckCircle2 />Visible workflow</span>
          </div>
        </div>
        <HeroVisual service={service} />
      </div>
    </section>
  );
}

export function ServiceCapabilities({ service }: { service: Service }) {
  const { capabilities } = service.page;

  return (
    <section className={`section ${styles.capabilities}`} id="capabilities">
      <div className="container">
        <header className={styles.sectionHeader}>
          <div><p className="eyebrow">{capabilities.eyebrow}</p><h2>{capabilities.title}</h2></div>
          <p>{capabilities.introduction}</p>
        </header>
        <div className={styles.capabilityGrid}>
          {capabilities.items.map((item, index) => (
            <article key={item.title}>
              <div className={styles.capabilityTopline}>
                <span className={styles.iconTile}><ThemeIcon theme={service.slug} index={index} /></span>
                <span>0{index + 1}</span>
              </div>
              <h3>{item.title}</h3><p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceProcess({ content, theme }: { content: PageContent["process"]; theme: ServiceSlug }) {
  return (
    <section className={`section ${styles.process}`}>
      <div className={`container ${styles.processGrid}`}>
        <div className={styles.processIntro}>
          <p className="eyebrow">HOW IT WORKS</p><h2>{content.title}</h2><p>{content.introduction}</p>
          <span className={styles.processSeal} aria-hidden="true"><Workflow size={27} strokeWidth={1.45} /></span>
        </div>
        <ol className={styles.processSteps}>
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <span className={styles.stepIcon}><ThemeIcon theme={theme} index={index + 1} size={18} /></span>
              <div><h3>{step.title}</h3><p>{step.copy}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceIntegrations({ content }: { content: PageContent["integrations"] }) {
  return (
    <section className={styles.integrations}>
      <div className={`container ${styles.integrationPanel}`}>
        <div><p className="eyebrow">WORKS WITH YOUR STACK</p><h2>{content.title}</h2><p>{content.introduction}</p></div>
        <div className={styles.toolGrid}>
          {content.items.map((item, index) => (
            <article key={item.name}>
              <span className={styles.toolIcon}>{index % 2 === 0 ? <CloudCog /> : <FileSpreadsheet />}</span>
              <div><h3>{item.name}</h3><p>{item.use}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFAQ({ items, serviceName }: { items: PageContent["faq"]; serviceName: string }) {
  return (
    <section className={`section ${styles.faq}`}>
      <div className={`container ${styles.faqGrid}`}>
        <div><p className="eyebrow">COMMON QUESTIONS</p><h2>What clients ask about {serviceName.toLowerCase()}.</h2><p>Need to talk through your situation? We can start with your current process and priorities.</p></div>
        <div className={styles.faqList}>
          {items.map((item, index) => (
            <details key={item.question} name="service-faq" open={index === 0}>
              <summary>{item.question}<span aria-hidden="true">+</span></summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCTA({ content, serviceName }: { content: PageContent["cta"]; serviceName: string }) {
  return (
    <section className={styles.cta}>
      <div className="container">
        <div className={styles.ctaPanel}>
          <div><p className="eyebrow">{content.eyebrow}</p><h2>{content.title}</h2><p>{content.copy}</p></div>
          <ConsultationButton service={serviceName}>Start a Conversation</ConsultationButton>
          <span className={styles.ctaMark} aria-hidden="true"><ArrowUpRight /></span>
        </div>
      </div>
    </section>
  );
}
