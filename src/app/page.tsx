import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site";
import { HomepageIntro } from "@/components/homepage-intro";

export default function Page() {
  return (
    <HomepageIntro>
      <SiteShell><HomePage /></SiteShell>
    </HomepageIntro>
  );
}
