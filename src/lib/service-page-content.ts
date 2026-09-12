import { services } from "@/lib/content";

export type ServiceSlug = (typeof services)[number]["slug"];

type ServicePageContent = {
  metadata: {
    title: string;
    description: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    description: string;
    visualTitle: string;
    visualNote: string;
    visualItems: readonly string[];
  };
  capabilities: {
    eyebrow: string;
    title: string;
    introduction: string;
    items: readonly {
      title: string;
      copy: string;
    }[];
  };
  process: {
    title: string;
    introduction: string;
    steps: readonly {
      title: string;
      copy: string;
    }[];
  };
  outcomes: {
    eyebrow: string;
    title: string;
    items: readonly {
      title: string;
      copy: string;
    }[];
  };
  integrations: {
    title: string;
    introduction: string;
    items: readonly {
      name: string;
      use: string;
    }[];
  };
  spotlight: {
    eyebrow: string;
    title: string;
    copy: string;
    items: readonly {
      label: string;
      detail: string;
    }[];
  };
  why: {
    title: string;
    copy: string;
    points: readonly string[];
  };
  faq: readonly {
    question: string;
    answer: string;
  }[];
  cta: {
    eyebrow: string;
    title: string;
    copy: string;
  };
};

export const servicePageContent = {
  bookkeeping: {
    metadata: {
      title: "Bookkeeping Services | LedgifyBPO",
      description:
        "Recurring bookkeeping support from LedgifyBPO, including transaction categorization, account reconciliations, and organized month-end records.",
    },
    hero: {
      eyebrow: "BOOKKEEPING SERVICES",
      headline: "Orderly books for the decisions you make every day.",
      description:
        "We keep routine financial activity categorized, reconciled, and organized so your records remain dependable from one month to the next.",
      visualTitle: "Your monthly bookkeeping rhythm",
      visualNote: "A repeatable workflow built around your records and review process.",
      visualItems: [
        "Transactions organized",
        "Accounts reconciled",
        "Month-end records prepared",
      ],
    },
    capabilities: {
      eyebrow: "WHAT WE HANDLE",
      title: "The daily detail, kept under control.",
      introduction:
        "We take recurring bookkeeping work off your team’s plate while keeping questions and supporting information visible.",
      items: [
        {
          title: "Transaction categorization",
          copy: "Organize income and expenses using a consistent chart of accounts and agreed categorization rules.",
        },
        {
          title: "Bank and card reconciliations",
          copy: "Match recorded activity against statements and surface discrepancies that need your input.",
        },
        {
          title: "Receipts and source records",
          copy: "Keep supporting documents connected to the financial activity they explain.",
        },
        {
          title: "Recurring bookkeeping",
          copy: "Maintain a reliable cadence for routine entries, reviews, and open-item follow-up.",
        },
        {
          title: "Month-end record preparation",
          copy: "Bring the month’s activity together in an organized package ready for accounting review.",
        },
        {
          title: "Bookkeeping clean-up support",
          copy: "Work through uncategorized activity and inconsistent records before moving into a steady rhythm.",
        },
      ],
    },
    process: {
      title: "A clear close, month after month.",
      introduction:
        "We align the workflow to your systems, the information your team can provide, and the review points that matter to you.",
      steps: [
        {
          title: "Set the working rhythm",
          copy: "We document your accounts, record sources, categorization preferences, and communication process.",
        },
        {
          title: "Organize and reconcile",
          copy: "We process recurring activity, match balances, and collect open questions in one place.",
        },
        {
          title: "Review the exceptions",
          copy: "Your team gets focused questions instead of having to revisit every transaction.",
        },
        {
          title: "Prepare month-end records",
          copy: "We finalize the agreed bookkeeping work and leave a clear trail for the next accounting step.",
        },
      ],
    },
    outcomes: {
      eyebrow: "THE OUTCOME",
      title: "Financial records your team can actually use.",
      items: [
        {
          title: "Less administrative drag",
          copy: "Routine bookkeeping no longer competes with the work only your internal team can do.",
        },
        {
          title: "Fewer loose ends",
          copy: "Reconciliations and documented follow-ups keep unexplained activity from accumulating unnoticed.",
        },
        {
          title: "A stronger accounting foundation",
          copy: "Organized month-end records make downstream reporting and tax preparation easier to coordinate.",
        },
      ],
    },
    integrations: {
      title: "Fits the tools behind your books.",
      introduction:
        "We work within established cloud accounting and expense workflows, adapting the handoffs to the systems you already use.",
      items: [
        { name: "QuickBooks", use: "Accounting records" },
        { name: "Xero", use: "Cloud bookkeeping" },
        { name: "Expensify", use: "Expense documentation" },
        { name: "Stripe", use: "Payment activity" },
      ],
    },
    spotlight: {
      eyebrow: "A BETTER MONTH-END",
      title: "The close starts long before the last day of the month.",
      copy: "Consistent upkeep prevents month-end from becoming a search for missing context. Our workflow keeps the record current and the remaining questions specific.",
      items: [
        { label: "Throughout the month", detail: "Record and organize activity" },
        { label: "At review points", detail: "Resolve exceptions and questions" },
        { label: "At month-end", detail: "Prepare a clean bookkeeping package" },
      ],
    },
    why: {
      title: "Why LedgifyBPO for bookkeeping?",
      copy: "Bookkeeping works best when it is steady, explainable, and easy to review. We bring a process mindset to the recurring detail without making your team adapt to a black box.",
      points: [
        "A documented workflow shaped around your accounts",
        "Focused communication for exceptions and missing context",
        "Records maintained with downstream accounting needs in mind",
      ],
    },
    faq: [
      {
        question: "Can you work with our existing chart of accounts?",
        answer:
          "Yes. We begin by understanding your current structure and categorization practices, then agree any changes with your team before applying them.",
      },
      {
        question: "How do you handle questions about transactions?",
        answer:
          "We collect unclear items into an organized review process so your team can provide context without being interrupted for every individual question.",
      },
      {
        question: "Can you help clean up records before recurring support begins?",
        answer:
          "We can scope an initial clean-up phase when the records need attention, then establish a recurring bookkeeping cadence once the starting point is clear.",
      },
      {
        question: "Does bookkeeping include tax filing?",
        answer:
          "Tax planning and filing is a separate service. Bookkeeping creates organized underlying records that can support your tax preparation workflow.",
      },
    ],
    cta: {
      eyebrow: "START WITH CLEANER BOOKS",
      title: "Make the monthly detail easier to manage.",
      copy: "Tell us how your bookkeeping works today, where it gets stuck, and what a dependable monthly rhythm would look like for your team.",
    },
  },
  accounting: {
    metadata: {
      title: "Accounting & Reporting Services | LedgifyBPO",
      description:
        "Accounting and reporting support from LedgifyBPO, including close coordination, account reviews, financial statements, and management visibility.",
    },
    hero: {
      eyebrow: "ACCOUNTING & REPORTING",
      headline: "Reporting that shows what is happening in your business.",
      description:
        "We connect account review, close support, and financial statement preparation into a reporting process your team can follow and use.",
      visualTitle: "From account activity to a clearer view",
      visualNote: "A connected reporting flow, with review built into each stage.",
      visualItems: [
        "Accounts reviewed",
        "Close items coordinated",
        "Statements prepared",
      ],
    },
    capabilities: {
      eyebrow: "ACCOUNTING SUPPORT",
      title: "Bring structure to the close and context to the numbers.",
      introduction:
        "We support the accounting work between clean records and useful reporting, with a clear view of what has been reviewed and what still needs attention.",
      items: [
        {
          title: "Month-end close support",
          copy: "Coordinate close tasks, working papers, adjustments, and the outstanding inputs required from your team.",
        },
        {
          title: "Financial statement preparation",
          copy: "Prepare income statements, balance sheets, and supporting schedules in an agreed reporting format.",
        },
        {
          title: "Balance sheet reviews",
          copy: "Examine account movements and supporting detail to identify balances that warrant follow-up.",
        },
        {
          title: "Management reporting",
          copy: "Organize financial information around the views your leadership team uses to understand performance.",
        },
        {
          title: "Reporting consistency",
          copy: "Maintain definitions, mappings, and presentation choices so reports remain comparable over time.",
        },
        {
          title: "Review documentation",
          copy: "Keep explanations and close support together so the reporting trail is easier to revisit.",
        },
      ],
    },
    process: {
      title: "A reporting process with visible checkpoints.",
      introduction:
        "The work is organized around clear ownership, review, and delivery—not a last-minute exchange of spreadsheets.",
      steps: [
        {
          title: "Define the reporting view",
          copy: "We align on entities, accounts, reporting periods, formats, and the questions your reports should help answer.",
        },
        {
          title: "Review account activity",
          copy: "We examine balances, supporting schedules, and close items, then identify what needs resolution.",
        },
        {
          title: "Prepare the reporting set",
          copy: "We assemble statements and agreed management views using consistent presentation and definitions.",
        },
        {
          title: "Deliver with context",
          copy: "We highlight notable movements, open matters, and the questions leadership may want to explore.",
        },
      ],
    },
    outcomes: {
      eyebrow: "BETTER VISIBILITY",
      title: "Move from scattered numbers to a coherent financial view.",
      items: [
        {
          title: "A more controlled close",
          copy: "Defined tasks and review points make the reporting process easier to coordinate across the team.",
        },
        {
          title: "Comparable reporting",
          copy: "Consistent structures help leaders look across periods without relearning the report each time.",
        },
        {
          title: "Questions surfaced earlier",
          copy: "Account reviews bring unusual movements and incomplete support into view before reports are circulated.",
        },
      ],
    },
    integrations: {
      title: "Reporting across the systems you rely on.",
      introduction:
        "We can support accounting workflows in established small-business and enterprise platforms, with reporting outputs tailored to your operating context.",
      items: [
        { name: "QuickBooks", use: "Core accounting" },
        { name: "Xero", use: "Cloud accounting" },
        { name: "SAP", use: "Financial operations" },
        { name: "Odoo", use: "ERP workflows" },
      ],
    },
    spotlight: {
      eyebrow: "REPORTING LAYERS",
      title: "One reporting set. Different levels of understanding.",
      copy: "A useful reporting package connects the financial statements to the supporting account detail and the management questions behind them.",
      items: [
        { label: "Statement view", detail: "The financial position and performance" },
        { label: "Account view", detail: "The balances and movements underneath" },
        { label: "Management view", detail: "The context leaders need to discuss" },
      ],
    },
    why: {
      title: "Why LedgifyBPO for accounting and reporting?",
      copy: "We treat reporting as an operating process, not simply a document. That means consistent inputs, visible review points, and outputs that connect back to the underlying accounts.",
      points: [
        "Close support designed around clear responsibilities",
        "Account-level review before reports are finalized",
        "Reporting formats aligned to how leadership reviews the business",
      ],
    },
    faq: [
      {
        question: "Which financial reports can you prepare?",
        answer:
          "The reporting set can include core financial statements, supporting schedules, and agreed management views based on the systems and records available to your business.",
      },
      {
        question: "Can you support our existing in-house finance team?",
        answer:
          "Yes. We can own defined close and reporting tasks while your internal team retains approval, technical judgment, and business-specific responsibilities.",
      },
      {
        question: "How do you handle multiple entities or reporting views?",
        answer:
          "We first map the entities, account structures, and required outputs, then scope a repeatable process that preserves the distinctions your team needs.",
      },
      {
        question: "Is this the same as bookkeeping?",
        answer:
          "Bookkeeping focuses on maintaining the underlying records. Accounting and reporting adds close coordination, account review, statements, and management visibility.",
      },
    ],
    cta: {
      eyebrow: "BUILD A CLEARER REPORTING RHYTHM",
      title: "Give your team a better view of performance.",
      copy: "Show us how your close and reporting work today. We’ll help identify the accounting tasks and review points that can become more consistent.",
    },
  },
  tax: {
    metadata: {
      title: "Tax Planning & Filing Support | LedgifyBPO",
      description:
        "Organized tax preparation, documentation, planning, deadline tracking, and filing coordination support from LedgifyBPO.",
    },
    hero: {
      eyebrow: "TAX PLANNING & FILING",
      headline: "Be prepared before tax deadlines start driving the work.",
      description:
        "We organize records, track requirements, and coordinate filing workflows so your business and tax advisors can work from a clearer starting point.",
      visualTitle: "A filing-readiness workflow",
      visualNote: "Requirements and dates depend on your jurisdiction and advisor guidance.",
      visualItems: [
        "Requirements mapped",
        "Documents organized",
        "Filing package coordinated",
      ],
    },
    capabilities: {
      eyebrow: "TAX OPERATIONS",
      title: "Keep the records, requests, and deadlines connected.",
      introduction:
        "We support the operational work around tax preparation and filing, helping your team and advisors see what is ready and what remains outstanding.",
      items: [
        {
          title: "Tax record organization",
          copy: "Gather financial records and supporting documents into a structured preparation package.",
        },
        {
          title: "Requirements tracking",
          copy: "Maintain a working view of requested information, responsible owners, and outstanding items.",
        },
        {
          title: "Filing coordination",
          copy: "Keep communication and follow-ups moving between your business and the tax professionals involved.",
        },
        {
          title: "Deadline visibility",
          copy: "Track agreed milestones and filing dates so upcoming work stays visible to the right people.",
        },
        {
          title: "Planning support",
          copy: "Organize the financial information needed for proactive conversations with your qualified tax advisors.",
        },
        {
          title: "Post-filing records",
          copy: "Keep finalized documents and supporting schedules organized for future reference and recurring preparation.",
        },
      ],
    },
    process: {
      title: "Tax preparation without the document scramble.",
      introduction:
        "Our role is to make the preparation and coordination process more orderly while tax positions and filings remain subject to the appropriate professional review.",
      steps: [
        {
          title: "Map the requirements",
          copy: "We document the entities, periods, requested filings, advisor contacts, and known milestones in scope.",
        },
        {
          title: "Build the document set",
          copy: "We gather records, label supporting information, and keep missing items visible to their owners.",
        },
        {
          title: "Coordinate preparation",
          copy: "We manage routine exchanges and follow-ups as the filing package moves through preparation and review.",
        },
        {
          title: "Organize the final record",
          copy: "We retain the completed package and carry forward relevant recurring requirements into the next cycle.",
        },
      ],
    },
    outcomes: {
      eyebrow: "STAY PREPARED",
      title: "A calmer, more visible tax workflow.",
      items: [
        {
          title: "Better document readiness",
          copy: "Supporting records are gathered into a consistent structure before requests become urgent.",
        },
        {
          title: "Clearer ownership",
          copy: "Outstanding requests stay connected to the people responsible for providing or reviewing them.",
        },
        {
          title: "Continuity across filing cycles",
          copy: "Final documents and recurring requirements remain organized instead of being rebuilt from memory.",
        },
      ],
    },
    integrations: {
      title: "A connected document and accounting workflow.",
      introduction:
        "We coordinate information from your accounting records and established document tools while working within the access processes your team approves.",
      items: [
        { name: "QuickBooks", use: "Financial records" },
        { name: "Xero", use: "Accounting source data" },
        { name: "Microsoft 365", use: "Working documents" },
        { name: "Google Drive", use: "Document coordination" },
      ],
    },
    spotlight: {
      eyebrow: "READINESS OVER RUSH",
      title: "Make filing a managed workflow, not a single deadline.",
      copy: "Tax work becomes easier to coordinate when requirements are visible throughout the preparation cycle and documents have an intentional home.",
      items: [
        { label: "Identify", detail: "Requirements, owners, and milestones" },
        { label: "Prepare", detail: "Records, schedules, and supporting documents" },
        { label: "Coordinate", detail: "Review questions and filing follow-through" },
      ],
    },
    why: {
      title: "Why LedgifyBPO for tax coordination?",
      copy: "Tax preparation draws on records, documents, advisors, and business owners. We give that operational work a consistent structure while respecting the professional responsibilities of your tax advisors.",
      points: [
        "One working view of requests and supporting documents",
        "Coordination that keeps advisor follow-ups visible",
        "Organized final records that carry context forward",
      ],
    },
    faq: [
      {
        question: "Do you replace our tax advisor?",
        answer:
          "No. We support preparation, records, and workflow coordination. Tax positions, advice, and filings should be reviewed by the appropriately qualified professionals for your circumstances.",
      },
      {
        question: "Can you coordinate directly with our existing advisor?",
        answer:
          "Yes, where your team authorizes it. We can organize routine requests and keep open items moving between the business and its tax professionals.",
      },
      {
        question: "Can you help with tax planning during the year?",
        answer:
          "We can prepare and organize financial information for planning conversations and help coordinate action items that follow from your advisor’s guidance.",
      },
      {
        question: "What records do you need to get started?",
        answer:
          "That depends on the entities, periods, and filings involved. We begin by mapping the scope and advisor requirements, then turn them into an organized request list.",
      },
    ],
    cta: {
      eyebrow: "PLAN THE WORK EARLIER",
      title: "Bring more order to your next filing cycle.",
      copy: "Tell us which records, deadlines, and advisor handoffs are hardest to coordinate. We’ll help shape a clearer preparation workflow.",
    },
  },
  advisory: {
    metadata: {
      title: "Financial Advisory Services | LedgifyBPO",
      description:
        "Practical financial advisory support from LedgifyBPO for forecasting, cash flow analysis, planning, scenario evaluation, and decision support.",
    },
    hero: {
      eyebrow: "FINANCIAL ADVISORY",
      headline: "Turn financial information into a practical next move.",
      description:
        "We help you interpret performance, test assumptions, and build forward-looking financial views for the decisions in front of your business.",
      visualTitle: "A decision-support cycle",
      visualNote: "Built around your assumptions, priorities, and operating context.",
      visualItems: [
        "Understand performance",
        "Explore scenarios",
        "Plan the next action",
      ],
    },
    capabilities: {
      eyebrow: "STRATEGIC FINANCE SUPPORT",
      title: "See the implications behind the options.",
      introduction:
        "We turn reliable financial inputs into focused planning work—without pretending a model can replace leadership judgment.",
      items: [
        {
          title: "Budget development",
          copy: "Translate operating priorities and resource plans into a financial view your team can maintain.",
        },
        {
          title: "Forecasting",
          copy: "Update forward-looking views as actual performance, assumptions, and business conditions change.",
        },
        {
          title: "Cash flow analysis",
          copy: "Examine the timing of inflows, outflows, commitments, and working capital considerations.",
        },
        {
          title: "Scenario planning",
          copy: "Compare possible paths using clearly stated assumptions rather than a single fixed projection.",
        },
        {
          title: "Performance review",
          copy: "Connect actual results to the plan and identify the operating questions behind meaningful variances.",
        },
        {
          title: "Decision support",
          copy: "Frame the financial considerations around hiring, investment, pricing, or other material choices.",
        },
      ],
    },
    process: {
      title: "Analysis that stays connected to the business.",
      introduction:
        "We start with the decision or planning need, then build only the financial views that help your team think it through.",
      steps: [
        {
          title: "Frame the question",
          copy: "We clarify the decision, time horizon, constraints, and operational context with your leadership team.",
        },
        {
          title: "Build the baseline",
          copy: "We connect historical performance with the assumptions that shape a forward-looking view.",
        },
        {
          title: "Explore the alternatives",
          copy: "We model relevant scenarios and make the financial tradeoffs easier to compare.",
        },
        {
          title: "Review and refine",
          copy: "We revisit forecasts and planning views as actual results provide new information.",
        },
      ],
    },
    outcomes: {
      eyebrow: "DECISION CLARITY",
      title: "A forward view grounded in how the business operates.",
      items: [
        {
          title: "Assumptions made visible",
          copy: "Leaders can see what a plan depends on and challenge the inputs before acting on the output.",
        },
        {
          title: "Tradeoffs easier to discuss",
          copy: "Scenario views give the team a shared financial language for comparing possible paths.",
        },
        {
          title: "Planning that evolves",
          copy: "Forecasts can be updated as the business learns instead of becoming a static annual exercise.",
        },
      ],
    },
    integrations: {
      title: "Planning connected to your source data.",
      introduction:
        "We can work from established accounting systems and planning tools, keeping model assumptions and source information easy to trace.",
      items: [
        { name: "QuickBooks", use: "Historical performance" },
        { name: "Xero", use: "Accounting source data" },
        { name: "Microsoft Excel", use: "Financial modeling" },
        { name: "Power BI", use: "Management visibility" },
      ],
    },
    spotlight: {
      eyebrow: "THE DECISION FRAME",
      title: "Start with the question—not the spreadsheet.",
      copy: "A useful model explains the relationship between operating choices and financial outcomes. We organize advisory work around three lenses.",
      items: [
        { label: "Position", detail: "What the current performance tells us" },
        { label: "Possibility", detail: "What could change under different assumptions" },
        { label: "Priority", detail: "What the team needs to decide or monitor" },
      ],
    },
    why: {
      title: "Why LedgifyBPO for financial advisory?",
      copy: "Our advisory work stays close to the records and operating realities behind the model. The goal is a clearer conversation, not complexity for its own sake.",
      points: [
        "Analysis built around a defined business question",
        "Assumptions documented so scenarios remain explainable",
        "Ongoing review that connects plans back to actual performance",
      ],
    },
    faq: [
      {
        question: "Do we need a full-time finance leader to use this service?",
        answer:
          "No. We can work directly with owners or an existing finance lead, depending on who holds the business context and decision responsibility.",
      },
      {
        question: "Can you build a budget from the ground up?",
        answer:
          "Yes. We can structure a budget around historical information, operating plans, and clearly documented assumptions supplied and reviewed by your team.",
      },
      {
        question: "How often should a forecast be updated?",
        answer:
          "The right cadence depends on how quickly your business and decisions change. We agree a review rhythm that is useful without creating unnecessary maintenance work.",
      },
      {
        question: "Can you help evaluate a specific decision?",
        answer:
          "Yes. We can scope focused decision support around the financial considerations of choices such as hiring, investment, pricing, or capacity planning.",
      },
    ],
    cta: {
      eyebrow: "PLAN WITH MORE CONTEXT",
      title: "Bring the next business decision into focus.",
      copy: "Tell us the question your team is working through. We’ll help organize the financial view, assumptions, and scenarios around it.",
    },
  },
  "remote-hr-services": {
    metadata: {
      title: "Remote HR Services | LedgifyBPO",
      description:
        "Remote HR administration from LedgifyBPO for employee records, onboarding documentation, payroll inputs, and recurring people operations.",
    },
    hero: {
      eyebrow: "REMOTE HR SERVICES",
      headline: "Keep everyday people operations moving.",
      description:
        "We provide consistent remote coordination for employee administration, onboarding, documentation, and recurring HR workflows alongside your internal team.",
      visualTitle: "A more dependable employee journey",
      visualNote: "Administrative support that follows your policies and approval process.",
      visualItems: [
        "Employee records coordinated",
        "Onboarding tasks followed through",
        "Recurring HR admin kept moving",
      ],
    },
    capabilities: {
      eyebrow: "PEOPLE OPERATIONS SUPPORT",
      title: "Give recurring HR administration a consistent home.",
      introduction:
        "We support the coordination work that keeps employee information, joining tasks, and routine people processes organized.",
      items: [
        {
          title: "Employee record administration",
          copy: "Maintain organized records and coordinate approved updates across the systems your team uses.",
        },
        {
          title: "Onboarding coordination",
          copy: "Track paperwork, system requests, and joining tasks with employees and internal owners.",
        },
        {
          title: "HR documentation",
          copy: "Keep approved templates, acknowledgements, and routine employee documents organized and accessible.",
        },
        {
          title: "Payroll input coordination",
          copy: "Collect and organize approved employee changes and recurring inputs for the payroll process.",
        },
        {
          title: "People operations requests",
          copy: "Route routine administrative questions and follow-ups through a defined working process.",
        },
        {
          title: "Offboarding administration",
          copy: "Coordinate checklists, documentation, and internal handoffs when an employee leaves the business.",
        },
      ],
    },
    process: {
      title: "Remote support that works like part of the team.",
      introduction:
        "We operate within your policies and approvals, with clear boundaries between administrative coordination and decisions owned by your leadership or HR specialists.",
      steps: [
        {
          title: "Map the employee lifecycle",
          copy: "We document recurring requests, systems, templates, owners, and approval points from joining to departure.",
        },
        {
          title: "Create the operating queue",
          copy: "We organize routine tasks and requests so owners, status, and next actions stay visible.",
        },
        {
          title: "Coordinate the handoffs",
          copy: "We follow through with employees, managers, payroll contacts, and system owners as required.",
        },
        {
          title: "Keep records current",
          copy: "We close completed tasks with the appropriate documentation and carry recurring work into the next cycle.",
        },
      ],
    },
    outcomes: {
      eyebrow: "OPERATIONAL CONTINUITY",
      title: "A steadier experience for employees and managers.",
      items: [
        {
          title: "Fewer missed handoffs",
          copy: "Defined owners and checklists keep routine joining, change, and leaving tasks connected.",
        },
        {
          title: "More organized records",
          copy: "Employee documentation is maintained through a repeatable process instead of scattered follow-ups.",
        },
        {
          title: "More room for people leadership",
          copy: "Managers and HR leaders spend less attention coordinating recurring administrative work.",
        },
      ],
    },
    integrations: {
      title: "Support across your people operations toolkit.",
      introduction:
        "We adapt to the approved systems and communication channels already used by your team, rather than introducing a second HR process.",
      items: [
        { name: "Gusto", use: "Payroll and people data" },
        { name: "BambooHR", use: "Employee records" },
        { name: "Microsoft 365", use: "Documents and coordination" },
        { name: "Slack", use: "Team communication" },
      ],
    },
    spotlight: {
      eyebrow: "EMPLOYEE LIFECYCLE",
      title: "One coordinated thread through recurring people operations.",
      copy: "Employees and managers should not need to reconstruct the process at every transition. We keep the administrative journey connected.",
      items: [
        { label: "Join", detail: "Onboarding tasks and employee records" },
        { label: "Work", detail: "Changes, requests, and payroll inputs" },
        { label: "Transition", detail: "Offboarding tasks and documentation" },
      ],
    },
    why: {
      title: "Why LedgifyBPO for remote HR services?",
      copy: "Remote HR administration needs responsiveness, careful handoffs, and respect for internal policy. We provide a visible operating process while your team retains the decisions and approvals that belong with it.",
      points: [
        "Administrative support aligned to your existing policies",
        "Clear task ownership across employee and manager handoffs",
        "A remote operating rhythm that keeps documentation current",
      ],
    },
    faq: [
      {
        question: "Do you replace an in-house HR leader?",
        answer:
          "No. We can support an HR leader or management team by coordinating defined administrative work while policy, employee relations, and leadership decisions remain with the appropriate internal owners.",
      },
      {
        question: "Can you work with our existing HR policies and templates?",
        answer:
          "Yes. We work from the policies, approved templates, and authorization structure your business provides rather than inventing a parallel process.",
      },
      {
        question: "Can you coordinate payroll changes?",
        answer:
          "We can collect and organize approved payroll inputs and coordinate their handoff. Payroll approval and processing responsibilities are defined during onboarding.",
      },
      {
        question: "How is sensitive employee information handled?",
        answer:
          "We first agree the systems, access boundaries, and approved workflows for the engagement, then limit administrative work to the information required for the tasks in scope.",
      },
    ],
    cta: {
      eyebrow: "CREATE A STEADIER HR RHYTHM",
      title: "Take recurring people administration off the ad hoc list.",
      copy: "Tell us where employee records, onboarding, or recurring HR coordination place the most pressure on your team.",
    },
  },
} as const satisfies Record<ServiceSlug, ServicePageContent>;

export function getServiceBySlug(slug: ServiceSlug) {
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    throw new Error(`Missing service data for ${slug}`);
  }

  return {
    ...service,
    page: servicePageContent[slug],
  };
}
