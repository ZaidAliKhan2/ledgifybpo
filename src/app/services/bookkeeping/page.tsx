import { createPageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import {
  ServiceCapabilities,
  ServiceCTA,
  ServiceFAQ,
  ServiceHero,
  ServiceIntegrations,
  ServiceProcess,
} from "@/components/service-page";
import { SiteShell } from "@/components/site";
import { getServiceBySlug } from "@/lib/service-page-content";

const service = getServiceBySlug("bookkeeping");

export const metadata = createPageMetadata("/services/bookkeeping");

export default function BookkeepingPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageStructuredData path="/services/bookkeeping" />
        <ServiceHero service={service} />
        <ServiceCapabilities service={service} />
        <ServiceProcess content={service.page.process} theme={service.slug} />
        <ServiceIntegrations content={service.page.integrations} />
        <ServiceFAQ items={service.page.faq} serviceName={service.name} />
        <ServiceCTA content={service.page.cta} serviceName={service.name} />
      </main>
    </SiteShell>
  );
}
