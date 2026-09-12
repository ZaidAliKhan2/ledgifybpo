import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/lib/content";
import { SiteShell, ConsultationButton } from "@/components/site";
import { DashboardWidgets, FounderCards } from "@/components/home-page";

type Props = { params: Promise<{ section: string; slug?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const title =
    section === "services"
      ? services.find((s) => s.slug === slug)?.name || "Services"
      : section === "about"
        ? "About Us"
        : section === "careers"
          ? "Careers"
          : "Page not found";
  return { title: `${title} | LedgifyBPO` };
}

export default async function DetailPage({ params }: Props) {
  const { section, slug } = await params;
  const serviceIndex = services.findIndex((service) => service.slug === slug);

  if (!["services", "about", "careers"].includes(section)) notFound();
  if (section === "services" && serviceIndex < 0) notFound();
  if ((section === "about" || section === "careers") && slug) notFound();
  return (
    <SiteShell>
      <main id="main" className="detail-page">
        <div className="container">
          <Link href="/" className="text-link breadcrumb">
            <ArrowLeft size={16} />
            Back to home
          </Link>
          {section === "services" && (
            <div className="service-detail-grid">
              <div>
                <p className="eyebrow">OUR SERVICES</p>
                <h1>{services[serviceIndex].name}</h1>
                <p className="detail-intro">
                  {services[serviceIndex].description}
                </p>
                <ConsultationButton service={services[serviceIndex].name} />
              </div>
              <DashboardWidgets active={serviceIndex} />
            </div>
          )}
          {section === "about" && (
            <>
              <p className="eyebrow">ABOUT LEDGIFYBPO</p>
              <h1>Meet the founders.</h1>
              <p className="detail-intro">
                LedgifyBPO delivers meticulous day-to-day bookkeeping,
                audit-ready financial reporting, and payroll infrastructure
                designed specifically for growth-stage businesses.
              </p>
              <FounderCards />
              <p className="profile-note" id="linkedin">
                Founder names, biographies, and LinkedIn profiles are to be
                added. Portraits are illustrative placeholders.
              </p>
            </>
          )}
          {section === "careers" && (
            <>
              <p className="eyebrow">LEDGIFYBPO</p>
              <h1>Careers</h1>
              <p className="detail-intro">
                Career information and open positions are to be added.
              </p>
              <ConsultationButton>Let&apos;s Talk</ConsultationButton>
            </>
          )}
        </div>
      </main>
    </SiteShell>
  );
}
