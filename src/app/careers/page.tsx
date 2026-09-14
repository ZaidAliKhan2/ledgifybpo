import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { CareersPositions } from "@/components/careers-positions";
import { SiteShell } from "@/components/site";
import styles from "./careers-page.module.css";

export const metadata: Metadata = {
  title: "Careers | LedgifyBPO",
  description:
    "Explore current career opportunities with LedgifyBPO in accounting and bookkeeping.",
};

const reasons = [
  {
    number: "01",
    title: "Learn through real work",
    copy: "Build experience through practical accounting and business operations work.",
  },
  {
    number: "02",
    title: "Use modern tools",
    copy: "Develop familiarity with the tools and workflows used by today's finance teams.",
  },
  {
    number: "03",
    title: "Grow with the team",
    copy: "Contribute as LedgifyBPO expands its accounting and business operations support.",
  },
] as const;

export default function CareersPage() {
  return (
    <SiteShell>
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="careers-heading">
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">CAREERS AT LEDGIFYBPO</p>
              <h1 id="careers-heading">Build your career with LedgifyBPO.</h1>
              <p>
                Join a growing team working across accounting, finance, and
                business operations.
              </p>
              <a href="#open-positions" className={styles.heroLink}>
                View open roles
                <ArrowDown size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>

            <aside className={styles.heroPanel} aria-label="Current opportunities">
              <div className={styles.openingCount}>
                <p>CONFIRMED OPENINGS</p>
                <strong>02</strong>
              </div>
              <div className={styles.openingNames}>
                <p>Senior Accountant</p>
                <p>Bookkeeping Intern</p>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.why} aria-labelledby="why-join-heading">
          <div className="container">
            <header className={styles.sectionHeading}>
              <p className="eyebrow">WHY JOIN LEDGIFYBPO</p>
              <h2 id="why-join-heading">Room to learn. Work that matters.</h2>
            </header>
            <div className={styles.reasonGrid}>
              {reasons.map((reason) => (
                <article key={reason.number} className={styles.reason}>
                  <span aria-hidden="true">{reason.number}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="open-positions"
          className={styles.positions}
          aria-labelledby="positions-heading"
        >
          <div className="container">
            <header className={styles.positionsHeading}>
              <div>
                <p className="eyebrow">OPEN POSITIONS</p>
                <h2 id="positions-heading">Current opportunities.</h2>
              </div>
              <p>
                Explore our two confirmed openings. Select a role to view the
                available details.
              </p>
            </header>
            <CareersPositions />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
