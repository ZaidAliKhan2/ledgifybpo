import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SiteShell, ConsultationButton } from "@/components/site";

type Props = { params: Promise<{ section: string; slug?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const title = section === "careers" ? "Careers" : "Page not found";
  return { title: `${title} | LedgifyBPO` };
}

export default async function DetailPage({ params }: Props) {
  const { section, slug } = await params;
  if (section !== "careers" || slug) notFound();
  return (
    <SiteShell>
      <main id="main" className="detail-page">
        <div className="container">
          <Link href="/" className="text-link breadcrumb">
            <ArrowLeft size={16} />
            Back to home
          </Link>
          <p className="eyebrow">LEDGIFYBPO</p>
          <h1>Careers</h1>
          <p className="detail-intro">
            Career information and open positions are to be added.
          </p>
          <ConsultationButton>Let&apos;s Talk</ConsultationButton>
        </div>
      </main>
    </SiteShell>
  );
}
