import Image from "next/image";
import { Building2 } from "lucide-react";
import { ConsultationButton, SiteShell } from "@/components/site";
import { industries } from "@/lib/content";

export const metadata = {
  title: "Industries | LedgifyBPO",
  description:
    "Accounting and back-office support shaped around the way your industry operates.",
};

export default function IndustriesPage() {
  return (
    <SiteShell>
      <main id="main" className="industries-page">
        <section className="industries-page-hero">
          <div className="container">
            <p className="eyebrow">INDUSTRIES</p>
            <h1>Support shaped around how your business works.</h1>
            <p>
              From specialized accounting to scalable back-office operations,
              we adapt our support to the workflows and priorities of your team.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container industry-directory">
            {industries.map((industry) => (
              <article id={industry.slug} key={industry.slug}>
                {industry.image ? (
                  <div className="industry-directory-image">
                    <Image
                      src={industry.image}
                      alt={`${industry.name} operations`}
                      fill
                      sizes="(max-width: 767px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="industry-directory-placeholder" aria-hidden="true">
                    <Building2 />
                  </div>
                )}
                <div className="industry-directory-copy">
                  <h2>{industry.name}</h2>
                  <p>{industry.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="industry-page-cta">
          <div className="container">
            <div>
              <p className="eyebrow">BUILT AROUND YOUR BUSINESS</p>
              <h2>Tell us what your back office needs next.</h2>
            </div>
            <ConsultationButton />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
