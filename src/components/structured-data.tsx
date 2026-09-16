import { absoluteUrl, getPageSeo, siteName } from "@/lib/seo";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  // Non-executable data, rendered on the server (not an animation bootstrap).
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function SiteStructuredData() {
  const url = absoluteUrl("/");
  if (!url) return null;
  return <JsonLd data={{
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${url}#organization`, name: siteName, url, logo: absoluteUrl("/images/logo.png") },
      { "@type": "WebSite", "@id": `${url}#website`, name: siteName, url, publisher: { "@id": `${url}#organization` } },
    ],
  }} />;
}

export function PageStructuredData({ path }: { path: string }) {
  const url = absoluteUrl(path);
  const home = absoluteUrl("/");
  if (!url || !home) return null;
  const page = getPageSeo(path);
  const graph: Record<string, unknown>[] = [{
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: home },
      { "@type": "ListItem", position: 2, name: page.title, item: url },
    ],
  }];
  if (path.startsWith("/services/")) graph.push({
    "@type": "Service", "@id": `${url}#service`, name: page.title,
    description: page.description, url, provider: { "@id": `${home}#organization` },
  });
  return <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />;
}
