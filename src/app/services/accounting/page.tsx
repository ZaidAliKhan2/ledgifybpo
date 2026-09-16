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

const service = getServiceBySlug("accounting");

export const metadata = createPageMetadata("/services/accounting");

export default function AccountingPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageStructuredData path="/services/accounting" />
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
