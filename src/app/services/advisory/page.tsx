import { createPageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/structured-data";
import {
  ServiceCapabilities,
  ServiceCTA,
  ServiceFAQ,
  ServiceHero,
  ServiceProcess,
} from "@/components/service-page";
import { SiteShell } from "@/components/site";
import { getServiceBySlug } from "@/lib/service-page-content";

const service = getServiceBySlug("advisory");

export const metadata = createPageMetadata("/services/advisory");

export default function AdvisoryPage() {
  return (
    <SiteShell>
      <main id="main">
        <PageStructuredData path="/services/advisory" />
        <ServiceHero service={service} />
        <ServiceCapabilities service={service} />
        <ServiceProcess content={service.page.process} theme={service.slug} />
        <ServiceFAQ items={service.page.faq} serviceName={service.name} />
        <ServiceCTA content={service.page.cta} serviceName={service.name} />
      </main>
    </SiteShell>
  );
}
