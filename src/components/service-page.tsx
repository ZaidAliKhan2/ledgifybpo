import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  CalendarCheck2,
  ChartNoAxesCombined,
  Check,
  CircleDollarSign,
  ClipboardCheck,
  CloudCog,
  FileCheck2,
  FileSearch,
  Files,
  FolderKanban,
  GitBranch,
  Landmark,
  ListChecks,
  MessageSquareText,
  Network,
  ReceiptText,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
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
  bookkeeping: [ReceiptText, RefreshCcw, BookOpenCheck, FileSearch, ClipboardCheck, SearchCheck],
  accounting: [Files, SearchCheck, ChartNoAxesCombined, Landmark, ListChecks, FileCheck2],
  tax: [FolderKanban, CalendarCheck2, FileCheck2, ListChecks, MessageSquareText, ShieldCheck],
  advisory: [Target, ChartNoAxesCombined, CircleDollarSign, GitBranch, SearchCheck, Sparkles],
  "remote-hr-services": [UsersRound, UserRoundPlus, Files, CircleDollarSign, MessageSquareText, UserRoundCheck],
};

function ThemeIcon({ theme, index, size = 20 }: { theme: ServiceSlug; index: number; size?: number }) {
  const Icon = themeIcons[theme][index % themeIcons[theme].length] ?? Check;
  return <Icon size={size} strokeWidth={1.6} aria-hidden="true" />;
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
              See what we handle <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.heroVisual} aria-label={page.hero.visualTitle}>
          <div className={styles.visualTopline}>
            <span>{service.name}</span>
            <span className={styles.status}>Working rhythm</span>
          </div>
          <div className={styles.visualBody}>
            <p className={styles.visualKicker}>OPERATIONAL VIEW</p>
            <h2>{page.hero.visualTitle}</h2>
            <ol>
              {page.hero.visualItems.map((item, index) => (
                <li key={item}>
                  <span className={styles.visualIndex}>0{index + 1}</span>
                  <span className={styles.visualIcon}>
                    <ThemeIcon theme={service.slug} index={index} size={18} />
                  </span>
                  <strong>{item}</strong>
                  <Check className={styles.visualCheck} size={16} aria-hidden="true" />
                </li>
              ))}
            </ol>
          </div>
          <p className={styles.visualNote}>{page.hero.visualNote}</p>
          <span className={styles.visualOrbit} aria-hidden="true" />
        </div>
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
          <div>
            <p className="eyebrow">{capabilities.eyebrow}</p>
            <h2>{capabilities.title}</h2>
          </div>
          <p>{capabilities.introduction}</p>
        </header>
        <div className={styles.capabilityGrid}>
          {capabilities.items.map((item, index) => (
            <article key={item.title}>
              <div className={styles.capabilityTopline}>
                <span className={styles.iconTile}>
                  <ThemeIcon theme={service.slug} index={index} />
                </span>
                <span>0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
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
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>{content.title}</h2>
          <p>{content.introduction}</p>
          <span className={styles.processSeal} aria-hidden="true">
            <Workflow size={28} strokeWidth={1.4} />
          </span>
        </div>
        <ol className={styles.processSteps}>
          {content.steps.map((step, index) => (
            <li key={step.title}>
              <span className={styles.stepNumber}>0{index + 1}</span>
              <span className={styles.stepIcon}>
                <ThemeIcon theme={theme} index={index + 1} size={18} />
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceOutcomes({ content }: { content: PageContent["outcomes"] }) {
  return (
    <section className={`section ${styles.outcomes}`}>
      <div className="container">
        <div className={styles.outcomesHeading}>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
        </div>
        <div className={styles.outcomeGrid}>
          {content.items.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <BadgeCheck size={24} strokeWidth={1.5} aria-hidden="true" />
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceIntegrations({ content }: { content: PageContent["integrations"] }) {
  return (
    <section className={`section ${styles.integrations}`}>
      <div className={`container ${styles.integrationGrid}`}>
        <div>
          <p className="eyebrow">TOOLS &amp; INTEGRATIONS</p>
          <h2>{content.title}</h2>
          <p className={styles.integrationIntro}>{content.introduction}</p>
        </div>
        <div className={styles.toolGrid}>
          {content.items.map((item, index) => (
            <article key={item.name}>
              <span className={styles.toolIcon}>{index % 2 === 0 ? <CloudCog /> : <Boxes />}</span>
              <div>
                <h3>{item.name}</h3>
                <p>{item.use}</p>
              </div>
              <ArrowUpRight size={17} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceSpotlight({ content, theme }: { content: PageContent["spotlight"]; theme: ServiceSlug }) {
  return (
    <section className={styles.spotlight} data-theme={theme}>
      <div className={`container ${styles.spotlightGrid}`}>
        <div className={styles.spotlightCopy}>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2>{content.title}</h2>
          <p>{content.copy}</p>
        </div>
        <ol className={styles.spotlightItems}>
          {content.items.map((item, index) => (
            <li key={item.label}>
              <span className={styles.spotlightNode}>
                <ThemeIcon theme={theme} index={index + 2} size={18} />
              </span>
              <div>
                <strong>{item.label}</strong>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceWhy({ content }: { content: PageContent["why"] }) {
  return (
    <section className={`section ${styles.why}`}>
      <div className={`container ${styles.whyGrid}`}>
        <div>
          <p className="eyebrow">WHY LEDGIFYBPO</p>
          <h2>{content.title}</h2>
          <p className={styles.whyCopy}>{content.copy}</p>
        </div>
        <ul>
          {content.points.map((point, index) => (
            <li key={point}>
              <span>0{index + 1}</span>
              <Check size={18} aria-hidden="true" />
              <p>{point}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceFAQ({ items, serviceName }: { items: PageContent["faq"]; serviceName: string }) {
  return (
    <section className={`section ${styles.faq}`}>
      <div className={`container ${styles.faqGrid}`}>
        <div>
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>Questions about {serviceName.toLowerCase()}.</h2>
          <p>Still working through the fit? A consultation can start with your current process and priorities.</p>
        </div>
        <div className={styles.faqList}>
          {items.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                {item.question}
                <span aria-hidden="true">+</span>
              </summary>
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
          <div>
            <p className="eyebrow">{content.eyebrow}</p>
            <h2>{content.title}</h2>
            <p>{content.copy}</p>
          </div>
          <ConsultationButton service={serviceName}>Start a Conversation</ConsultationButton>
          <span className={styles.ctaMark} aria-hidden="true">
            <Network />
          </span>
        </div>
      </div>
    </section>
  );
}
