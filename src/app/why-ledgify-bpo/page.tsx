import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanySection, PageCTA, PageHero } from "@/components/company-page";
import { SiteShell } from "@/components/site";
import styles from "@/components/company-page.module.css";

export const metadata: Metadata = {
  title: "Why LedgifyBPO | Back-Office Support for Your Team",
  description:
    "Explore how LedgifyBPO works with your team through clear responsibilities, flexible support, existing workflows, and organized back-office operations.",
};

export default function WhyLedgifyBPOPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageHero
          eyebrow="WHY LEDGIFYBPO"
          title="Support that makes the work easier to manage."
          description="Choosing a back-office partner is also choosing how work moves between teams. Our approach brings responsibilities, records, and communication into a process your business can follow."
        />

        <CompanySection id="why-work-with-us" eyebrow="THE PRACTICAL DIFFERENCE" title="Make room for the work that needs your team.">
          <div className={styles.cards}>
            <article className={styles.panel}>
              <h3>Ownership of recurring tasks</h3>
              <p>Give routine finance and administrative work a defined place, with clear inputs and agreed review points.</p>
            </article>
            <article className={styles.panel}>
              <h3>Information with context</h3>
              <p>Connect records and reports to the questions your team needs to resolve, so information is easier to act on.</p>
            </article>
            <article className={styles.panel}>
              <h3>Connected handoffs</h3>
              <p>Keep requests, supporting documents, and next actions together as work moves between internal owners and external support.</p>
            </article>
          </div>
        </CompanySection>

        <CompanySection
          id="client-collaboration"
          eyebrow="WORKING TOGETHER"
          title="Know what to expect from the relationship."
          tone="muted"
        >
          <ol className={styles.steps}>
            <li>
              <h3>Set the scope together</h3>
              <p>Identify the tasks to be supported, the outputs your team needs, and the information required to begin.</p>
            </li>
            <li>
              <h3>Agree communication and review</h3>
              <p>Establish who supplies information, who reviews the work, and how questions and exceptions reach the right person.</p>
            </li>
            <li>
              <h3>Keep the process useful</h3>
              <p>Use feedback from completed work to refine handoffs and revisit priorities as the operating context changes.</p>
            </li>
          </ol>
        </CompanySection>

        <CompanySection id="flexible-support" eyebrow="FLEXIBLE SUPPORT" title="Start with the need in front of you.">
          <div className={styles.columns}>
            <article className={styles.panel}>
              <h3>Support for a defined workload</h3>
              <p>
                A business may need help with a recurring bookkeeping process,
                close preparation, or employee administration. Begin with a clear
                area of responsibility and the handoffs around it.
              </p>
            </article>
            <article className={styles.panel}>
              <h3>Room to revisit the scope</h3>
              <p>
                As priorities or transaction volumes change, review the workload
                together and agree any adjustments to tasks, capacity, and review
                needs. Additional support starts with a shared understanding of
                what is required.
              </p>
            </article>
          </div>
        </CompanySection>

        <CompanySection id="existing-workflows" eyebrow="YOUR SYSTEMS & WORKFLOWS" title="Build on how your team already works." tone="muted">
          <div className={styles.columns}>
            <div className={styles.prose}>
              <p>
                Your tools hold more than data: they hold the working habits and
                context of your team. We start by understanding those systems and
                how information moves through them.
              </p>
              <p>
                The scope can draw on accounting platforms such as QuickBooks and
                Xero, and document or communication tools such as Microsoft 365
                and Slack. The tools used depend on the service and the workflow
                agreed with your business.
              </p>
            </div>
            <article className={styles.panel}>
              <h3>Agree the working setup</h3>
              <p>
                Identify the source records, approved access, document locations,
                and internal owners before assigning the work. Keep approvals and
                business decisions connected to the people responsible for them.
              </p>
            </article>
          </div>
        </CompanySection>

        <CompanySection id="operational-visibility" eyebrow="ORGANIZATION & VISIBILITY" title="See the work and what it needs next.">
          <div className={styles.cards}>
            <article className={styles.panel}>
              <h3>Organized inputs</h3>
              <p>A consistent place for records and supporting documents makes preparation and follow-up easier.</p>
            </article>
            <article className={styles.panel}>
              <h3>Visible open items</h3>
              <p>Questions and missing information stay connected to an owner and a next action.</p>
            </article>
            <article className={styles.panel}>
              <h3>Useful handovers</h3>
              <p>Completed work carries its supporting context into review, reporting, and the next operating cycle.</p>
            </article>
          </div>
        </CompanySection>

        {/* Add client evidence here when verified stories are available.
            The homepage currently contains explicitly illustrative testimonials. */}
        <CompanySection id="people-behind-the-work" eyebrow="MEET LEDGIFYBPO" title="Get to know the people behind the approach." tone="muted">
          <div className={styles.prose}>
            <p>Learn about LedgifyBPO’s founders, the work we support, and the principles that guide our collaboration with businesses.</p>
            <Link href="/about" className="text-link">
              About LedgifyBPO <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </CompanySection>

        <PageCTA
          title="Explore what a workable partnership looks like."
          description="Tell us where recurring tasks or handoffs are putting pressure on your team. We can discuss the responsibilities and support that would help."
        />
      </main>
    </SiteShell>
  );
}
