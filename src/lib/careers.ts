export type CareerRole = {
  slug: string;
  title: string;
  summary: string;
  about: string;
  responsibilities: readonly string[];
  requirements: readonly string[];
  whatWeValue: readonly string[];
};

export const careerRoles = [
  {
    slug: "senior-accountant",
    title: "Senior Accountant",
    summary:
      "Help maintain accurate records and support dependable accounting delivery.",
    about:
      "The Senior Accountant will contribute to LedgifyBPO's accounting work by reviewing financial information, supporting reporting workflows, and helping the team keep records complete, accurate, and well organized.",
    responsibilities: [
      "Maintain accurate financial records and supporting documentation.",
      "Review bookkeeping and accounting work for completeness and consistency.",
      "Support account reconciliations and follow up on discrepancies.",
      "Contribute to month-end activities and financial reporting.",
      "Keep working files and financial documentation organized.",
      "Communicate clearly with internal and client-facing teams.",
    ],
    requirements: [
      "A strong understanding of accounting and bookkeeping fundamentals.",
      "A careful, organized approach to financial records and review work.",
      "The ability to identify inconsistencies and follow them through to resolution.",
      "Clear written and verbal communication.",
    ],
    whatWeValue: [
      "Accuracy, discretion, and responsible handling of financial information.",
      "Ownership of assigned work and dependable follow-through.",
      "A collaborative approach to solving accounting questions.",
      "A practical interest in improving processes and documentation.",
    ],
  },
  {
    slug: "bookkeeping-intern",
    title: "Bookkeeping Intern",
    summary:
      "Learn practical bookkeeping workflows while supporting the finance team.",
    about:
      "The Bookkeeping Intern will learn through practical support work, helping the finance team maintain orderly records while building familiarity with everyday bookkeeping processes.",
    responsibilities: [
      "Assist with recording transactions and maintaining bookkeeping records.",
      "Organize invoices, receipts, and other financial documentation.",
      "Support routine reconciliations and help investigate simple differences.",
      "Learn and follow the team's accounting workflows and documentation practices.",
      "Assist the finance team with recurring bookkeeping tasks.",
      "Handle financial information with accuracy and confidentiality.",
    ],
    requirements: [
      "A genuine interest in accounting and bookkeeping work.",
      "Willingness to learn, ask questions, and apply feedback.",
      "Careful attention to numbers, records, and supporting documents.",
      "Basic organization and clear communication skills.",
    ],
    whatWeValue: [
      "Curiosity and a steady approach to learning new workflows.",
      "Reliability when completing routine tasks.",
      "Respectful teamwork and openness to guidance.",
      "Accuracy and discretion when handling financial information.",
    ],
  },
] as const satisfies readonly CareerRole[];
