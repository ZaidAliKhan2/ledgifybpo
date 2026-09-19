"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { careerRoles, type CareerRole } from "@/lib/careers";
import styles from "@/app/careers/careers-page.module.css";

const careersEmail = "hr@ledgifybpo.com";

const detailGroups = [
  { key: "responsibilities", title: "Responsibilities" },
  { key: "requirements", title: "Requirements" },
  { key: "whatWeValue", title: "What we value" },
] as const satisfies readonly {
  key: keyof Pick<
    CareerRole,
    "responsibilities" | "requirements" | "whatWeValue"
  >;
  title: string;
}[];

function getApplicationLinks(roleTitle: string) {
  const subject = `Application for ${roleTitle}`;
  const body = [
    "Hello LedgifyBPO HR Team,",
    "",
    `I would like to apply for the ${roleTitle} position.`,
    "",
    "Name:",
    "Phone:",
    "LinkedIn Profile:",
    "",
    "Please find my resume/CV attached.",
    "",
    "Regards,",
  ].join("\n");
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);

  return {
    mailto: `mailto:${careersEmail}?subject=${encodedSubject}&body=${encodedBody}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      careersEmail,
    )}&su=${encodedSubject}&body=${encodedBody}`,
  };
}

function ApplyForJobLink({ roleTitle }: { roleTitle: string }) {
  const links = getApplicationLinks(roleTitle);

  function openApplicationEmail(event: MouseEvent<HTMLAnchorElement>) {
    if (window.matchMedia("(min-width: 768px)").matches) {
      event.preventDefault();
      window.open(links.gmail, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <a
      href={links.mailto}
      className={styles.applyButton}
      onClick={openApplicationEmail}
      aria-label={`Apply for the ${roleTitle} job by email`}
    >
      Apply for this job
      <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

export function CareersPositions() {
  const [openRole, setOpenRole] = useState<string | null>(null);

  return (
    <div className={styles.positionsList}>
      {careerRoles.map((role) => {
        const isOpen = openRole === role.slug;
        const triggerId = `${role.slug}-trigger`;
        const panelId = `${role.slug}-details`;

        return (
          <article
            key={role.slug}
            className={styles.roleCard}
            data-open={isOpen}
          >
            <button
              id={triggerId}
              type="button"
              className={styles.roleTrigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenRole(isOpen ? null : role.slug)}
            >
              <span className={styles.roleHeading}>
                <strong>{role.title}</strong>
                <span>{role.summary}</span>
              </span>
              <span className={styles.roleAction}>
                <span>{isOpen ? "Close role" : "View role"}</span>
                <Plus size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
            </button>

            <div
              id={panelId}
              className={styles.roleDetails}
              data-open={isOpen}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
            >
              <div className={styles.roleDetailsInner}>
                <div className={styles.roleAbout}>
                  <p className={styles.detailLabel}>ROLE OVERVIEW</p>
                  <p>{role.about}</p>
                </div>

                <div className={styles.detailGrid}>
                  {detailGroups.map((group) => (
                    <section key={group.key}>
                      <h3>{group.title}</h3>
                      <ul>
                        {role[group.key].map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>

                <div className={styles.applyRow}>
                  <div>
                    <p className={styles.detailLabel}>HOW TO APPLY</p>
                    <p>
                      Send your CV/resume to:{" "}
                      <a
                        className={styles.emailLink}
                        href={`mailto:${careersEmail}`}
                      >
                        {careersEmail}
                      </a>
                    </p>
                  </div>
                  <ApplyForJobLink roleTitle={role.title} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
