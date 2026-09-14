export const services = [
  {
    name: "Bookkeeping Services",
    slug: "bookkeeping",
    description:
      "Keep your financial records accurate, organized, and up to date. We manage transaction categorization, bank reconciliations, and monthly bookkeeping so you have reliable information for everyday business decisions.",
    image: "/images/services/bookkeeping.jpg",
    brief: {
      headline: "Good decisions start with orderly books.",
      introduction:
        "Bring structure to the daily detail. We take care of the records behind your business, so you can focus on running it.",
      responsibilities: [
        {
          title: "Every transaction in its place",
          copy: "Categorize income and expenses to keep your financial records consistent.",
        },
        {
          title: "Accounts that reconcile",
          copy: "Match bank and card activity to your books and flag discrepancies for review.",
        },
        {
          title: "A dependable monthly close",
          copy: "Organize the month’s activity into records ready for your accounting team.",
        },
      ],
      deliverables: [
        "Categorized transactions",
        "Reconciled accounts",
        "Month-end records",
      ],
    },
    workflow: [
      "Receive and organize records",
      "Reconcile accounts",
      "Prepare the monthly close",
    ],
  },
  {
    name: "Accounting & Reporting",
    slug: "accounting",
    description:
      "Build a dependable accounting function with consistent reporting and financial oversight. We support month-end close, financial statement preparation, and account reviews to help you understand performance and maintain sound accounting practices.",
    image: "/images/services/accounting.jpeg",
    brief: {
      headline: "See the business behind the numbers.",
      introduction:
        "Build a clearer picture of performance with an accounting rhythm that connects day-to-day activity to meaningful reporting.",
      responsibilities: [
        {
          title: "Structure at month-end",
          copy: "Coordinate the close, review account balances, and organize adjustments.",
        },
        {
          title: "Reporting with context",
          copy: "Prepare financial statements that bring income, expenses, and balances together.",
        },
        {
          title: "Questions brought into focus",
          copy: "Review account movements and highlight items that need your team’s attention.",
        },
      ],
      deliverables: [
        "Financial statements",
        "Account reviews",
        "Close documentation",
      ],
    },
    workflow: [
      "Review account activity",
      "Prepare financial statements",
      "Deliver reporting for review",
    ],
  },
  {
    name: "Tax Planning & Filing",
    slug: "tax",
    description:
      "Stay prepared for tax obligations with organized records and proactive coordination. We support tax preparation, filing workflows, and compliance tracking, working with your tax advisors to help keep requirements and deadlines on track.",
    image: "/images/services/tax.jpeg",
    brief: {
      headline: "Preparation now. Fewer loose ends later.",
      introduction:
        "Keep tax work organized throughout the year, with supporting records and clear coordination alongside your tax advisors.",
      responsibilities: [
        {
          title: "Requirements kept in view",
          copy: "Track filing requirements and upcoming dates with your advisors.",
        },
        {
          title: "Records ready for preparation",
          copy: "Gather and organize the supporting information your tax professionals need.",
        },
        {
          title: "A coordinated filing process",
          copy: "Support preparation and follow-ups so outstanding requests stay visible.",
        },
      ],
      deliverables: [
        "Organized tax records",
        "Filing checklist",
        "Advisor-ready package",
      ],
    },
    workflow: [
      "Track filing requirements",
      "Organize supporting records",
      "Coordinate the filing package",
    ],
  },
  {
    name: "Financial Advisory",
    slug: "advisory",
    description:
      "Turn financial information into a practical plan for your next stage of growth. We support budgeting, forecasting, cash flow analysis, and performance reviews to help you evaluate opportunities and make informed decisions.",
    image: "/images/services/advisory.jpeg",
    brief: {
      headline: "A clearer view of your next move.",
      introduction:
        "Turn financial information into practical conversations about cash, priorities, and the direction of your business.",
      responsibilities: [
        {
          title: "Understand where you stand",
          copy: "Review performance and cash flow to identify the questions worth exploring.",
        },
        {
          title: "Plan for what comes next",
          copy: "Build budgets and forecasts around your business assumptions and priorities.",
        },
        {
          title: "Evaluate the possibilities",
          copy: "Compare scenarios and translate financial insights into practical next steps.",
        },
      ],
      deliverables: [
        "Budgets & forecasts",
        "Cash flow analysis",
        "Performance insights",
      ],
    },
    workflow: [
      "Review business performance",
      "Build practical forecasts",
      "Turn insight into next steps",
    ],
  },
  {
    name: "Remote HR Services",
    slug: "remote-hr-services",
    description:
      "Give your team consistent HR support without expanding your in-house administrative workload. We coordinate employee records, onboarding, payroll inputs, and routine HR processes to keep your people operations organized as your business grows.",
    image: "/images/services/remote-hr.jpeg",
    brief: {
      headline: "Support your people. Simplify the admin.",
      introduction:
        "Give everyday people operations a consistent home, with remote administrative support that works alongside your team.",
      responsibilities: [
        {
          title: "Employee information in order",
          copy: "Coordinate employee records and routine updates in your existing processes.",
        },
        {
          title: "A more organized welcome",
          copy: "Support onboarding paperwork and keep joining tasks moving with your team.",
        },
        {
          title: "Continuity in everyday HR",
          copy: "Coordinate payroll inputs and recurring administrative requests.",
        },
      ],
      deliverables: [
        "Organized employee records",
        "Onboarding documentation",
        "Payroll inputs",
      ],
    },
    workflow: [
      "Coordinate employee records",
      "Support onboarding workflows",
      "Keep routine HR tasks moving",
    ],
  },
] as const;
export const industries = [
  {
    name: "E-commerce",
    slug: "ecommerce",
    image: "/images/industries/ecommerce.jpeg",
    description: "Clear books across every storefront, sale, and payout.",
    featured: true,
    headline: "Keep every sale, fee, and payout connected.",
    introduction:
      "We organize the high-volume financial detail behind online commerce so your team can see beyond the transaction feed.",
    capabilities: [
      "Multi-channel transaction bookkeeping",
      "Payout and processor reconciliation",
      "Expense and cost categorization",
      "Consistent performance reporting",
    ],
  },
  {
    name: "Construction",
    slug: "construction",
    image: "/images/industries/construction.jpg",
    description: "Know your costs and keep every project accounted for.",
    featured: true,
    headline: "See the cost picture behind every project.",
    introduction:
      "We help construction teams keep project activity, vendor records, and financial reporting organized as work moves forward.",
    capabilities: [
      "Project and job cost organization",
      "Vendor and subcontractor records",
      "Expense categorization and reconciliation",
      "Project and management reporting",
    ],
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    image: "/images/industries/real-estate.jpg",
    description:
      "A clear financial picture of every property in your portfolio.",
    featured: true,
    headline: "Know what each property is contributing.",
    introduction:
      "We structure the records behind individual properties and portfolios, keeping income, expenses, and reporting easier to review.",
    capabilities: [
      "Property-level bookkeeping",
      "Income and expense tracking",
      "Bank and loan reconciliations",
      "Property and portfolio reporting",
    ],
  },
  {
    name: "Restaurants",
    slug: "restaurants",
    image: "/images/industries/restaurant.jpeg",
    description: "Keep your books in order, from the kitchen to the close.",
    featured: true,
    headline: "Bring order to every sale and supplier bill.",
    introduction:
      "We coordinate the recurring financial inputs behind restaurant operations, from daily activity to the monthly close.",
    capabilities: [
      "Daily sales organization",
      "Food and operating expense tracking",
      "Bank and card reconciliations",
      "Payroll input coordination",
    ],
  },
  {
    name: "Non-profits",
    slug: "non-profits",
    image: "/images/industries/non-profits.png",
    description:
      "Structured records and reporting support for mission-focused organizations.",
    featured: false,
    headline: "Keep funding and spending easier to trace.",
    introduction:
      "We support the financial and administrative routines that help mission-focused teams maintain organized records and useful reports.",
    capabilities: [
      "Donation and funding records",
      "Program and operating expenses",
      "Reconciliations and source documents",
      "Recurring reporting support",
    ],
  },
  {
    name: "Trucking",
    slug: "trucking",
    image: "/images/industries/trucking.png",
    description:
      "Organized bookkeeping for fleet expenses, settlements, and day-to-day operations.",
    featured: false,
    headline: "A clearer financial lane for every mile.",
    introduction:
      "We bring fleet expenses, settlement records, and recurring bookkeeping into one dependable operating rhythm.",
    capabilities: [
      "Fuel and operating expense tracking",
      "Driver and settlement records",
      "Bookkeeping and reconciliations",
      "Fleet-level financial reporting",
    ],
  },
  {
    name: "Legal Services",
    slug: "legal-services",
    image: "/images/industries/legal-services.png",
    description: "Clear financial workflows for professional legal practices.",
    featured: false,
    headline: "Financial workflows that respect client work.",
    introduction:
      "We keep routine bookkeeping and billing-related administration organized so the firm can stay focused on its professional responsibilities.",
    capabilities: [
      "Recurring bookkeeping and reconciliation",
      "Billing-related administration",
      "Expense and vendor records",
      "Clear financial reporting",
    ],
  },
  {
    name: "Healthcare & Medicare",
    slug: "healthcare-medicare",
    image: "/images/industries/medical-billing.png",
    description:
      "Organized finance and administrative support for healthcare-focused operations.",
    featured: false,
    headline: "Back-office order for busy healthcare operations.",
    introduction:
      "We support the financial and administrative workflows behind healthcare-focused businesses without adding another layer of complexity.",
    capabilities: [
      "Financial record organization",
      "Administrative workflow support",
      "Expense tracking and reconciliations",
      "Management reporting",
    ],
  },
  {
    name: "IT Consultation",
    slug: "it-consultation",
    image: "/images/industries/it-consultation.png",
    description:
      "Financial and back-office support for firms that provide IT consulting services.",
    featured: true,
    headline: "Back-office clarity for client-focused IT firms.",
    introduction:
      "We support IT consulting businesses with the bookkeeping, reporting, and operational administration behind project delivery.",
    capabilities: [
      "Project and client financial organization",
      "Recurring bookkeeping",
      "Billing and expense workflows",
      "Reporting and back-office support",
    ],
  },
  {
    name: "B2B Back Office",
    slug: "b2b-back-office",
    image: "/images/industries/b2b-back-office.webp",
    description:
      "Flexible operational support for small businesses, growing teams, and larger organizations.",
    featured: true,
    headline: "Back-office support that scales with your operation.",
    introduction:
      "We build practical support around the needs of small companies, growing businesses, and larger organizations with established workflows.",
    capabilities: [
      "Bookkeeping and reporting support",
      "Accounts payable and receivable coordination",
      "Process documentation and administration",
      "Flexible capacity as needs change",
    ],
  },
];
export const values = [
  {
    title: "Save Time, Gain Focus",
    copy: "Reclaim 10+ hours a week by handing off categorization, reconciliations, and routine bookkeeping work.",
  },
  {
    title: "Specialized Industry Accounting",
    copy: "Domain-specific chart of accounts, configured for your industry — not a generic template.",
  },
  {
    title: "Always Audit-Ready & Accurate",
    copy: "GAAP-compliant records and rigorous double-entry bookkeeping, reviewed line by line before it reaches you.",
  },
  {
    title: "Cloud-Based & Scalable",
    copy: "Seamless integrations with QuickBooks, Xero, and Gusto — your systems scale as your business grows.",
  },
];
