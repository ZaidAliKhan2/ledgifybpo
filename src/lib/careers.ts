export type CareerRole = {
  slug: string;
  title: string;
  summary: string;
  about: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  niceToHave: readonly string[];
  applicationHref: string | null;
};

// Responsibilities, requirements, and application destinations remain empty
// until the client supplies an approved hiring brief for each role.
export const careerRoles = [
  {
    slug: "senior-accountant",
    title: "Senior Accountant",
    summary:
      "A senior-level accounting opportunity within LedgifyBPO's growing team.",
    about:
      "This opening is for an experienced accounting professional joining LedgifyBPO's accounting work.",
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    applicationHref: null,
  },
  {
    slug: "bookkeeping-intern",
    title: "Bookkeeping Intern",
    summary:
      "An internship opportunity focused on bookkeeping within LedgifyBPO's growing team.",
    about:
      "This opening is for someone beginning a bookkeeping career and looking to learn through practical work.",
    responsibilities: [],
    requirements: [],
    niceToHave: [],
    applicationHref: null,
  },
] as const satisfies readonly CareerRole[];
