import type { Metadata } from "next";
import {
  ServiceCapabilities,
  ServiceCTA,
  ServiceFAQ,
  ServiceHero,
  ServiceIntegrations,
  ServiceOutcomes,
  ServiceProcess,
  ServiceSpotlight,
  ServiceWhy,
} from "@/components/service-page";
import { SiteShell } from "@/components/site";
import { getServiceBySlug } from "@/lib/service-page-content";

const service = getServiceBySlug("tax");

export const metadata: Metadata = service.page.metadata;

export default function TaxPage() {
  return (
    <SiteShell>
      <main id="main">
        <ServiceHero service={service} />
        <ServiceSpotlight content={service.page.spotlight} theme={service.slug} />
        <ServiceCapabilities service={service} />
        <ServiceProcess content={service.page.process} theme={service.slug} />
        <ServiceIntegrations content={service.page.integrations} />
        <ServiceOutcomes content={service.page.outcomes} />
        <ServiceWhy content={service.page.why} />
        <ServiceFAQ items={service.page.faq} serviceName={service.name} />
        <ServiceCTA content={service.page.cta} serviceName={service.name} />
      </main>
    </SiteShell>
  );
}
