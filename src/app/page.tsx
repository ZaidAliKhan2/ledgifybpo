import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site";
import { HomepageIntro } from "@/components/homepage-intro";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata("/");

export default function Page() {
  return (
    <HomepageIntro>
      <SiteShell><HomePage /></SiteShell>
    </HomepageIntro>
  );
}
