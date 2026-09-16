import { createPageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Layers3 } from "lucide-react";
import { ConsultationButton, SiteShell } from "@/components/site";
import { industries } from "@/lib/content";
import styles from "./industries-page.module.css";

export const metadata = createPageMetadata("/industries");

export default function IndustriesPage() {
  return (
    <SiteShell>
      <main id="main" className={styles.page}>
        <PageStructuredData path="/industries" />
        <section className={styles.hero}>
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">INDUSTRIES</p>
              <h1>Support shaped around how your business works.</h1>
              <p className={styles.heroDescription}>
                From specialized accounting to scalable back-office operations,
                we adapt our support to the workflows and priorities of your team.
              </p>
              <Link href="#industry-overview" className={styles.heroLink}>
                Explore industries <ArrowDown size={15} aria-hidden="true" />
              </Link>
            </div>

            <div
              className={styles.heroVisual}
              role="img"
              aria-label="LedgifyBPO adapts its business support services to different industries."
            >
              <div className={styles.industryNetwork} aria-hidden="true">
                <svg className={styles.networkLines} viewBox="0 0 600 440" preserveAspectRatio="none">
                  <path d="M100 56 C100 160 240 125 300 220" />
                  <path d="M300 56 V220" />
                  <path d="M500 56 C500 160 360 125 300 220" />
                  <path d="M100 384 C100 280 240 315 300 220" />
                  <path d="M300 384 V220" />
                  <path d="M500 384 C500 280 360 315 300 220" />
                </svg>

                <div className={styles.industryLabels} data-position="above">
                  {industries.slice(0, 3).map((industry) => (
                    <span className={styles.industryNode} key={industry.slug}>
                      {industry.name}
                    </span>
                  ))}
                </div>

                <div className={styles.supportHub}>
                  <strong>LEDGIFYBPO</strong>
                  <p>Business support built<br />around your operation.</p>
                </div>

                <div className={styles.industryLabels} data-position="below">
                  {industries.slice(3, 6).map((industry) => (
                    <span className={styles.industryNode} key={industry.slug}>
                      {industry.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <nav className={styles.quickNav} aria-label="Jump to an industry">
          <div className={`container ${styles.quickNavInner}`}>
            <span className={styles.quickNavLabel}>Jump to</span>
            <div className={styles.quickNavLinks}>
              {industries.map((industry) => (
                <Link key={industry.slug} href={`#${industry.slug}`}>
                  {industry.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <section className={`section ${styles.overview}`} id="industry-overview">
          <div className="container">
            <header className={styles.sectionHeader}>
              <div>
                <p className="eyebrow">INDUSTRY OVERVIEW</p>
                <h2>Find the support that fits your operation.</h2>
              </div>
              <p>
                Every industry has its own operational details. Start with the
                environment closest to yours, then see how we shape the work.
              </p>
            </header>

            <div className={styles.directory}>
              {industries.map((industry, index) => (
                <Link
                  href={`#${industry.slug}`}
                  className={styles.directoryCard}
                  key={industry.slug}
                  aria-label={`See how LedgifyBPO helps ${industry.name} businesses`}
                >
                  <article>
                    <div className={styles.directoryImage}>
                      <Image
                        src={industry.image}
                        alt=""
                        fill
                        sizes="(max-width: 760px) 38vw, 180px"
                      />
                    </div>
                    <div className={styles.directoryCopy}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{industry.name}</h3>
                      <p>{industry.description}</p>
                      <strong>See how we help <ArrowRight size={14} aria-hidden="true" /></strong>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.detailLead}>
          <div className={`container ${styles.detailLeadInner}`}>
            <div>
              <p className="eyebrow">BUILT FOR THE WORK</p>
              <h2>Practical support, industry by industry.</h2>
            </div>
            <p>
              We learn how information moves through your business, then build
              a clear working rhythm around it.
            </p>
          </div>
        </section>

        <div className={styles.industryDetails}>
          {industries.map((industry, index) => (
            <section
              className={styles.industrySection}
              id={industry.slug}
              key={industry.slug}
              data-flipped={index % 2 === 1}
            >
              <div className={`container ${styles.industryGrid}`}>
                <div className={styles.industryVisual}>
                  <Image
                    src={industry.image}
                    alt={`${industry.name} operations`}
                    fill
                    sizes="(max-width: 767px) 100vw, 48vw"
                  />
                  <span><Layers3 size={14} aria-hidden="true" /> Operational support</span>
                </div>

                <div className={styles.industryCopy}>
                  <p className="eyebrow">{industry.name.toUpperCase()}</p>
                  <h2>{industry.headline}</h2>
                  <p className={styles.industryIntroduction}>{industry.introduction}</p>
                  <ul>
                    {industry.capabilities.map((capability) => (
                      <li key={capability}><Check size={15} aria-hidden="true" />{capability}</li>
                    ))}
                  </ul>
                  <ConsultationButton className={`button ${styles.industryAction}`}>
                    Discuss your workflow
                  </ConsultationButton>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className={styles.cta}>
          <div className={`container ${styles.ctaInner}`}>
            <div>
              <p className="eyebrow">BUILT AROUND YOUR BUSINESS</p>
              <h2>Tell us what your back office needs next.</h2>
              <p>Whatever your industry, we build support around the way your business already works.</p>
            </div>
            <ConsultationButton />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
