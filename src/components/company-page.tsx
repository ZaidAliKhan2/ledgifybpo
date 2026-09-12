import type { ReactNode } from "react";
import { ConsultationButton } from "@/components/site";
import styles from "./company-page.module.css";

type HeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: HeadingProps) {
  return (
    <header className={styles.hero}>
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </header>
  );
}

// Each route owns its section order and contents; this only supplies spacing
// and a named heading so individual sections can be redesigned independently.
export function CompanySection({
  id,
  eyebrow,
  title,
  description,
  tone = "plain",
  children,
}: HeadingProps & {
  id: string;
  tone?: "plain" | "muted";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`section ${styles.section}`}
      data-tone={tone}
    >
      <div className="container">
        <div className={styles.heading}>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={`${id}-heading`}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export function PageCTA({ title, description }: { title: string; description: string }) {
  return (
    <section className={`section ${styles.cta}`} aria-labelledby="conversation-heading">
      <div className={`container ${styles.ctaInner}`}>
        <div>
          <p className="eyebrow">LET&apos;S TALK</p>
          <h2 id="conversation-heading">{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        <ConsultationButton>Start a Conversation</ConsultationButton>
      </div>
    </section>
  );
}
