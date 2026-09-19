import { createPageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import Image from "next/image";
import { ArrowDown, Compass, Handshake, MessagesSquare } from "lucide-react";
import { AboutFounders } from "@/components/about-founders";
import { ConsultationButton, SiteShell } from "@/components/site";
import { founders } from "@/lib/content";
import styles from "./about-page.module.css";
import entrance from "@/components/internal-hero-entrance.module.css";

export const metadata = createPageMetadata("/about");

const principles = [
  {
    Icon: MessagesSquare,
    title: "Clarity over complexity",
    copy: "Make the work, the questions, and the next step easy to understand.",
  },
  {
    Icon: Handshake,
    title: "Work that earns trust",
    copy: "Build confidence through care, consistency, and honest communication.",
  },
  {
    Icon: Compass,
    title: "Support that fits",
    copy: "Start with the business in front of us—not a one-size-fits-all playbook.",
  },
];

const [saudFounder, naveedFounder] = founders;

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main" className={styles.page}>
        <PageStructuredData path="/about" />
        <section className={styles.hero} aria-labelledby="about-heading">
          <div className={`container ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} ${entrance.copy}`}>
              <p className="eyebrow">ABOUT LEDGIFYBPO</p>
              <h1 id="about-heading">
                Built by people who believe business support should feel personal.
              </h1>
              <p className={styles.heroIntro}>
                Meet Saud and Naveed—the founders shaping a more thoughtful,
                connected way to support growing businesses.
              </p>
              <a href="#our-vision" className={styles.storyLink}>
                Our founding vision <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>

            <aside className={`${styles.heroVisual} ${entrance.visual}`} aria-label="The thinking behind LedgifyBPO">
              <p className={styles.beliefLabel}>THE THINKING BEHIND LEDGIFYBPO</p>
              <p className={styles.beliefStatement}>
                Behind every business,<br />
                <em>there are people.</em>
              </p>
              <p className={styles.beliefNote}>
                Their priorities. Their decisions. Their trust.<br />
                That is where thoughtful support begins.
              </p>
              <div className={styles.beliefSignature}>
                <span aria-hidden="true" />
                <p>Saud &amp; Naveed<small>Founders, LedgifyBPO</small></p>
              </div>
            </aside>
          </div>
        </section>

        <section
          id="our-vision"
          className={styles.vision}
          aria-label="Founder visions"
        >
          <div className="container">
            <article
              className={styles.founderVision}
              aria-labelledby="saud-vision-heading"
            >
              <div className={styles.visionPortrait}>
                <div className={styles.visionHalo} aria-hidden="true" />
                <Image
                  src="/images/founder-2-name.png"
                  alt={`${saudFounder.name}, ${saudFounder.role} of LedgifyBPO`}
                  fill
                  sizes="(max-width: 900px) 78vw, 440px"
                  className={styles.visionPortraitImage}
                />
              </div>
              <div className={styles.visionCopy}>
                <p className="eyebrow">SAUD&apos;S VISION</p>
                <h2 id="saud-vision-heading">
                  Good support should feel dependable in the moments that matter.
                </h2>
                <p className={styles.visionStatement}>
                  Saud&apos;s vision is for thoughtful support to show up in
                  practice—through clear responsibilities, considered handoffs,
                  and a way of working teams can follow.
                </p>
                <p>
                  It is a practical standard: bring care to the details while
                  keeping the wider needs of the business in view.
                </p>
                <div className={styles.signature}>
                  <span>{saudFounder.name}</span>
                  <small>{saudFounder.role}</small>
                </div>
              </div>
            </article>

            <article
              className={`${styles.founderVision} ${styles.founderVisionReverse}`}
              aria-labelledby="naveed-vision-heading"
            >
              <div className={styles.visionPortrait}>
                <div className={styles.visionHalo} aria-hidden="true" />
                <Image
                  src="/images/founder-1-name.png"
                  alt={`${naveedFounder.name}, ${naveedFounder.role} of LedgifyBPO`}
                  fill
                  sizes="(max-width: 900px) 78vw, 440px"
                  className={styles.visionPortraitImage}
                />
              </div>
              <div className={styles.visionCopy}>
                <p className="eyebrow">NAVEED&apos;S VISION</p>
                <h2 id="naveed-vision-heading">
                  Support should begin with understanding the business behind the work.
                </h2>
                <p className={styles.visionStatement}>
                  Naveed&apos;s vision for LedgifyBPO starts with a simple standard:
                  listen carefully, understand what the team needs, and shape
                  support around that context.
                </p>
                <p>
                  The goal is a working relationship that feels close, clear,
                  and genuinely useful to the people leading the business.
                </p>
                <div className={styles.signature}>
                  <span>{naveedFounder.name}</span>
                  <small>{naveedFounder.role}</small>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.meet} aria-labelledby="founders-heading">
          <div className="container">
            <header className={styles.sectionHeading}>
              <p className="eyebrow">MEET THE FOUNDERS</p>
              <h2 id="founders-heading">Two founders. One shared standard.</h2>
              <p>
                Choose a founder to explore the perspective each brings to
                LedgifyBPO.
              </p>
            </header>
            <AboutFounders />
          </div>
        </section>

        <section className={styles.guides} aria-labelledby="guides-heading">
          <div className="container">
            <div className={styles.guidesIntro}>
              <div>
                <p className="eyebrow">WHAT GUIDES US</p>
                <h2 id="guides-heading">The standard behind the work.</h2>
              </div>
              <p>
                What Saud and Naveed believe good business support should look like.
              </p>
            </div>
            <div className={styles.principleGrid}>
              {principles.map(({ Icon, title, copy }) => (
                <article key={title} className={styles.principle}>
                  <div className={styles.principleTop}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                  </div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="cta-heading">
          <div className={`container ${styles.ctaInner}`}>
            <div>
              <p className="eyebrow">A CONVERSATION WITH THE FOUNDERS&apos; TEAM</p>
              <h2 id="cta-heading">Let&apos;s build something that works for your business.</h2>
              <p>
                Tell us what your team needs. We&apos;ll start by listening and shape
                the conversation around your business.
              </p>
            </div>
            <ConsultationButton>Start a Conversation</ConsultationButton>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
