import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanySection, PageCTA, PageHero } from "@/components/company-page";
import { FounderCards } from "@/components/home-page";
import { SiteShell } from "@/components/site";
import styles from "@/components/company-page.module.css";

export const metadata: Metadata = {
  title: "About Us | LedgifyBPO",
  description:
    "Meet LedgifyBPO and its founders. Learn about our approach to bookkeeping, accounting, and remote back-office support for businesses.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageHero
          eyebrow="ABOUT LEDGIFYBPO"
          title="The people and process behind your back office."
          description="LedgifyBPO supports the financial and administrative work that keeps a business organized—from everyday records to reporting, planning, and people operations."
        />

        <CompanySection id="who-we-are" eyebrow="WHO WE ARE" title="An extension of your team.">
          <div className={styles.prose}>
            <p>
              Our work brings together bookkeeping, accounting and reporting,
              tax preparation coordination, financial advisory, and remote HR
              administration. We help businesses organize these responsibilities
              around the needs of their teams.
            </p>
            <p>
              That means understanding the records, systems, and handoffs behind
              the work, as well as the people who depend on it. The aim is to make
              recurring operations easier to manage and financial information
              easier to use.
            </p>
          </div>
        </CompanySection>

        <CompanySection id="mission-and-approach" eyebrow="OUR DIRECTION" title="Useful support starts with understanding." tone="muted">
          <div className={styles.columns}>
            <article className={styles.panel}>
              <h3>Our mission</h3>
              <p>
                To help businesses build an organized back office, giving their
                teams more room to focus on customers, people, and the decisions
                ahead.
              </p>
            </article>
            <article className={styles.panel}>
              <h3>Our approach</h3>
              <p>
                Start with how the business works today. Agree the responsibilities
                and review points, then establish a practical rhythm for records,
                communication, and follow-through.
              </p>
            </article>
          </div>
        </CompanySection>

        <CompanySection
          id="leadership"
          eyebrow="OUR FOUNDERS"
          title="Meet the leadership behind LedgifyBPO."
          description="Naveed and Saud are the co-founders of LedgifyBPO, serving as CEO and COO respectively."
        >
          <FounderCards />
        </CompanySection>

        <CompanySection id="how-we-work" eyebrow="HOW WE WORK" title="A shared understanding of the work." tone="muted">
          <ol className={styles.steps}>
            <li>
              <h3>Understand the starting point</h3>
              <p>Discuss the current workload, the systems in use, and the recurring tasks that need more attention.</p>
            </li>
            <li>
              <h3>Agree responsibilities</h3>
              <p>Define the work in scope, the information needed, and the people who will review and approve it.</p>
            </li>
            <li>
              <h3>Build a working rhythm</h3>
              <p>Organize recurring tasks, questions, and handoffs so your team knows what comes next.</p>
            </li>
            <li>
              <h3>Review as needs change</h3>
              <p>Revisit priorities and the shape of the support as your business develops.</p>
            </li>
          </ol>
        </CompanySection>

        <CompanySection id="principles" eyebrow="OUR PRINCIPLES" title="What guides the day-to-day work.">
          <div className={styles.cards}>
            <article className={styles.panel}>
              <h3>Clarity</h3>
              <p>Make responsibilities, questions, and next steps understandable to everyone involved.</p>
            </article>
            <article className={styles.panel}>
              <h3>Care in the detail</h3>
              <p>Give records and documentation the attention they need to support the work that follows.</p>
            </article>
            <article className={styles.panel}>
              <h3>Collaboration</h3>
              <p>Work with your team’s context and feedback, keeping business decisions with the people who own them.</p>
            </article>
          </div>
          <div className={styles.prose}>
            <Link href="/why-ledgify-bpo" className="text-link">
              See how our approach supports your business <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </CompanySection>

        <PageCTA
          title="Tell us about the work behind your business."
          description="Start with your current priorities and the support your team needs. We can explore where LedgifyBPO fits."
        />
      </main>
    </SiteShell>
  );
}
