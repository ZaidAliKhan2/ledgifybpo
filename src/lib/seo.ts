import type { Metadata } from "next";
import { services } from "@/lib/content";
import { servicePageContent } from "@/lib/service-page-content";

export function resolveSiteUrl(value = process.env.SITE_URL?.trim() || "https://www.ledgifybpo.com"): URL | undefined {
  if (!value?.trim()) return undefined;
  const url = new URL(value.trim());
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error("SITE_URL must be an absolute HTTP(S) origin without a path, query, or credentials.");
  }
  return url;
}

export const siteUrl = resolveSiteUrl();
export const siteName = "LedgifyBPO";
export const publicPages = [
  { path: "/", title: "Finance & Operations Support", description: "LedgifyBPO supports your business with bookkeeping, accounting and reporting, tax coordination, financial advisory, and remote HR services." },
  ...services.map((service) => ({
    path: `/services/${service.slug}`,
    title: servicePageContent[service.slug].metadata.title.replace(/ \| LedgifyBPO$/, ""),
    description: servicePageContent[service.slug].metadata.description,
  })),
  { path: "/industries", title: "Industries", description: "Accounting and back-office support shaped around the way your industry operates." },
  { path: "/why-ledgify-bpo", title: "Why Choose LedgifyBPO", description: "See how LedgifyBPO extends your team with bookkeeping, accounting, tax coordination, financial advisory, and HR support built around your operation." },
  { path: "/about", title: "About the Founders", description: "Meet Saud and Naveed, the co-founders of LedgifyBPO, and learn about the principles behind the company they are building." },
  { path: "/careers", title: "Careers", description: "Explore current career opportunities with LedgifyBPO in accounting and bookkeeping." },
];

export function absoluteUrl(path: string): string | undefined {
  return siteUrl ? new URL(path, siteUrl).href : undefined;
}

export function getPageSeo(path: string) {
  const page = publicPages.find((page) => page.path === path);
  if (!page) throw new Error(`Missing SEO data for ${path}`);
  return page;
}

export function createPageMetadata(path: string): Metadata {
  const { title, description } = getPageSeo(path);
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${siteName}`;
  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title: fullTitle, description, siteName, type: "website", ...(url ? { url } : {}) },
    twitter: { card: "summary", title: fullTitle, description },
  };
}

export const siteMetadata: Metadata = {
  ...createPageMetadata("/"),
  metadataBase: siteUrl,
  title: { default: `${getPageSeo("/").title} | ${siteName}`, template: `%s | ${siteName}` },
  // Canonicals belong to individual pages, never the shared layout.
  alternates: undefined,
  openGraph: { siteName, type: "website", title: `${getPageSeo("/").title} | ${siteName}`, description: getPageSeo("/").description },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/images/logo.png", type: "image/png", sizes: "2172x724" }] },
};
