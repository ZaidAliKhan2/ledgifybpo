"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/about/about-page.module.css";

const founders = [
  {
    id: "naveed",
    name: "Naveed",
    role: "Co-Founder & CEO",
    image: "/images/founder-1-name.png",
    introduction: "Naveed is a co-founder of LedgifyBPO and serves as its CEO. He co-founded the company with Saud, its COO.",
  },
  {
    id: "saud",
    name: "Saud",
    role: "Co-Founder & COO",
    image: "/images/founder-2-name.png",
    introduction: "Saud is a co-founder of LedgifyBPO and serves as its COO. He co-founded the company with Naveed, its CEO.",
  },
] as const;

type FounderId = (typeof founders)[number]["id"];

export function AboutFounders() {
  const [selectedId, setSelectedId] = useState<FounderId | null>(null);
  const [previewId, setPreviewId] = useState<FounderId | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeId = previewId ?? selectedId;

  function cancelHover() {
    if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
  }

  useEffect(() => () => {
    if (hoverTimer.current !== null) clearTimeout(hoverTimer.current);
  }, []);

  function select(id: FounderId) {
    cancelHover();
    setPreviewId(null);
    setSelectedId(id);
  }

  return (
    <div
      className={styles.founderExperience}
      data-state={activeId ?? "idle"}
      onPointerLeave={() => {
        cancelHover();
        setPreviewId(null);
      }}
    >
      {founders.map((founder, index) => {
        const active = founder.id === activeId;
        return (
          <div
            key={founder.id}
            className={styles.founderGroup}
            data-founder={founder.id}
            data-active={active}
            data-secondary={activeId !== null && !active}
          >
            <button
              id={founder.id + "-selector"}
              type="button"
              className={styles.founderCard}
              aria-expanded={active}
              aria-controls={founder.id + "-story"}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse" ||
                    !window.matchMedia("(hover: hover) and (min-width: 901px)").matches) return;
                cancelHover();
                // Dwell avoids switching when a moving card passes under the cursor.
                hoverTimer.current = setTimeout(() => {
                  setPreviewId(founder.id);
                  hoverTimer.current = null;
                }, 240);
              }}
              onPointerLeave={cancelHover}
              onClick={() => select(founder.id)}
              onKeyDown={(event) => {
                let next = index;
                if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                  next = 1 - index;
                } else if (event.key === "Home") {
                  next = 0;
                } else if (event.key === "End") {
                  next = founders.length - 1;
                } else if (event.key === "Escape") {
                  cancelHover();
                  setPreviewId(null);
                  setSelectedId(null);
                  return;
                } else {
                  return;
                }
                event.preventDefault();
                select(founders[next].id);
                document.getElementById(founders[next].id + "-selector")?.focus();
              }}
            >
              <span className={styles.cardPortrait}>
                <Image
                  src={founder.image}
                  alt=""
                  fill
                  sizes="(max-width: 560px) 35vw, 180px"
                />
              </span>
              <span className={styles.cardIdentity}>
                <strong>{founder.name}</strong>
                <small>{founder.role}</small>
                <span className={styles.cardAction}>
                  {active ? "Story open" : "Meet " + founder.name}
                  <span aria-hidden="true">↗</span>
                </span>
              </span>
            </button>
            <article
              id={founder.id + "-story"}
              className={styles.founderStory}
              aria-labelledby={founder.id + "-profile-name"}
              aria-hidden={!active}
              inert={!active}
            >
              <div className={styles.storyContent}>
                <p className={styles.profileLabel}>MEET THE FOUNDER</p>
                <h3 id={founder.id + "-profile-name"}>{founder.name}</h3>
                <p className={styles.profileRole}>{founder.role}</p>
                <p className={styles.profileIntroduction}>{founder.introduction}</p>
                <p className={styles.profileClosing}>The people behind LedgifyBPO.</p>
              </div>
            </article>
          </div>
        );
      })}
    </div>
  );
}
