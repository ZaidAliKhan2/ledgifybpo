"use client";

import { ArrowRight, Plus } from "lucide-react";
import { useState } from "react";
import { careerRoles, type CareerRole } from "@/lib/careers";
import styles from "@/app/careers/careers-page.module.css";

const detailGroups = [
  { key: "responsibilities", title: "Responsibilities" },
  { key: "requirements", title: "Requirements" },
  { key: "niceToHave", title: "Nice to Have" },
] as const satisfies readonly {
  key: keyof Pick<CareerRole, "responsibilities" | "requirements" | "niceToHave">;
  title: string;
}[];

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
                  <p className={styles.detailLabel}>ABOUT THE ROLE</p>
                  <p>{role.about}</p>
                </div>

                <div className={styles.detailGrid}>
                  {detailGroups.map((group) => {
                    const items = role[group.key];

                    return (
                      <section key={group.key}>
                        <h3>{group.title}</h3>
                        {items.length > 0 ? (
                          <ul>
                            {items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className={styles.pendingDetail}>
                            To be confirmed in the client-approved role brief.
                          </p>
                        )}
                      </section>
                    );
                  })}
                </div>

                <div className={styles.applyRow}>
                  <div>
                    <p className={styles.detailLabel}>HOW TO APPLY</p>
                    <p>
                      Application instructions will be added once the approved
                      destination is confirmed.
                    </p>
                  </div>
                  {role.applicationHref ? (
                    <a href={role.applicationHref} className={styles.applyButton}>
                      Apply for this role
                      <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      className={styles.applyButton}
                      disabled
                    >
                      Application link coming soon
                    </button>
                  )}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
