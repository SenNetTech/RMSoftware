export const services = [
  {
    slug: 'custom-business-software',
    title: 'Custom Business Software',
    short: 'Software that fits the way you work.',
    description:
      'Custom business software development for South African companies. Replace spreadsheet workarounds with internal systems, management platforms and customer portals.',
    intro:
      'Give your team one dependable place to manage the work. We design internal systems around your processes, responsibilities and business rules.',
    outcome:
      'Keep operations moving without relying on a patchwork of spreadsheets.',
    examples: 'Internal systems · Management platforms · Customer portals',
    fit: 'Your team has outgrown spreadsheets, or your current software forces you into workarounds.',
    deliverables: [
      'A workflow map and agreed requirements',
      'An internal system or portal tailored to your team',
      'Role-based access and a planned data migration',
      'Testing, documentation and a practical handover',
    ],
    scenarios: [
      'Manage jobs from enquiry through delivery in one system.',
      'Give customers a secure place to submit requests and check progress.',
      'Bring approvals, documents and reporting into a shared operational view.',
    ],
    question: 'Do we need to replace everything at once?',
    answer:
      'No. We can start with one high-friction workflow, connect it to the tools you already use and expand once the team is comfortable. Discovery establishes what should stay and what needs to change.',
  },
  {
    slug: 'web-application-development',
    title: 'Web Application Development',
    short: 'Turn a useful idea into a working product.',
    description:
      'Custom web application development for business portals, SaaS products, booking platforms and dashboards. Plan and build your application with RMSoftware.',
    intro:
      'Make it easier for customers to use your services and for your team to deliver them. We build web applications around the tasks people need to complete.',
    outcome:
      'Make your service accessible through a focused, easy-to-use application.',
    examples: 'SaaS applications · Booking platforms · Business dashboards',
    fit: 'You need an interactive product, self-service portal or booking experience that a standard website cannot provide.',
    deliverables: [
      'A prioritised first-release scope and user journeys',
      'Responsive interfaces for desktop and mobile',
      'Application logic, access controls and data storage',
      'Release testing, launch support and an improvement plan',
    ],
    scenarios: [
      'Let customers book services and manage their appointments.',
      'Build a first version of a SaaS product to test with real users.',
      'Give teams a dashboard with the information they need to act.',
    ],
    question: 'Can we start with a smaller first version?',
    answer:
      'Yes. We identify the core task your users need to accomplish and scope a useful first release around it. Features that do not support that task can wait until you have feedback.',
  },
  {
    slug: 'business-process-automation',
    title: 'Business Process Automation',
    short: 'Let software handle the repetitive steps.',
    description:
      'Business automation in South Africa. Connect workflows, reduce duplicate data entry and replace repetitive manual processes with practical software automation.',
    intro:
      'Move information between people and systems without constant copying, chasing and checking. We find repeatable steps and automate them with clear rules and human oversight.',
    outcome:
      'Give your people more time for customers and work that needs their judgement.',
    examples:
      'Workflow automation · AI-assisted processing · Spreadsheet replacement',
    fit: 'Routine admin, follow-ups and manual data entry are taking time away from higher-value work.',
    deliverables: [
      'A process review and prioritised automation opportunities',
      'Connected workflows with approval steps where needed',
      'Exception handling and visibility into failures',
      'Documentation and guidance for the people running the process',
    ],
    scenarios: [
      'Move an approved enquiry into quoting, invoicing and follow-up.',
      'Route incoming documents for review and reduce manual capture.',
      'Keep staff informed when an order or job needs their attention.',
    ],
    question: 'Does automation have to use AI?',
    answer:
      'No. Clear rules and system integrations often solve the problem. Where AI can help with unstructured information, we define review steps and test its output before relying on it in a business workflow.',
  },
  {
    slug: 'software-modernization-integration',
    title: 'Software Modernization & Integration',
    short: 'Make your existing systems work together.',
    description:
      'Software modernization, API development and system integration for South African businesses. Improve legacy software and connect databases and business tools.',
    intro:
      'Protect what still works while fixing what slows you down. We assess existing software, improve the parts that need attention and connect the systems your business relies on.',
    outcome:
      'Reduce duplicate work and gaps between systems without an unnecessary rebuild.',
    examples: 'API development · Legacy improvements · Database integrations',
    fit: 'Your systems hold useful information but cannot share it reliably, or an ageing application is limiting the business.',
    deliverables: [
      'An assessment of the existing systems and integration constraints',
      'An agreed migration or incremental improvement plan',
      'APIs and data connections with validation and error handling',
      'Integration documentation, testing and handover',
    ],
    scenarios: [
      'Connect your customer portal to your operational system.',
      'Sync approved records between accounting and business tools.',
      'Modernize an ageing interface while retaining useful business logic.',
    ],
    question: 'Can you work with software built by another team?',
    answer:
      'We start with an assessment of the code, documentation, access and dependencies. That lets us recommend a realistic approach and identify constraints before committing to delivery.',
  },
  {
    slug: 'managed-software-support',
    title: 'Managed Software & Support',
    short: 'A partner beyond the first release.',
    description:
      'Ongoing software maintenance, managed hosting, monitoring and development support for businesses. Plan a long-term software partnership with RMSoftware.',
    intro:
      'Keep your business software useful as your business changes. Agree a support and development arrangement that covers the systems, priorities and improvements that matter to you.',
    outcome:
      'Maintain continuity and keep improving the software your team depends on.',
    examples:
      'Maintenance · Hosting & monitoring · Ongoing feature development',
    fit: 'You have software to maintain, a backlog to deliver or a business that needs a dependable technical partner.',
    deliverables: [
      'A system review and clear support scope',
      'Agreed support hours, response targets and escalation routes',
      'Planned maintenance, security updates and monitoring',
      'A prioritised development backlog and regular progress reviews',
    ],
    scenarios: [
      'Maintain a business application and manage its hosting.',
      'Plan regular improvements alongside bug fixes and updates.',
      'Establish monitoring and a clear process for reporting issues.',
    ],
    question: 'Is support available as a monthly arrangement?',
    answer:
      'Yes. We scope ongoing support or development around the systems, capacity and coverage you need. Response targets, inclusions and exclusions are agreed in writing; 24/7 coverage is not assumed.',
  },
] as const;
export const projectTypes = [
  ...services.map((service) => service.title),
  'Not sure yet',
];
export const budgets = [
  'R20,000–R50,000',
  'R50,000–R150,000',
  'R150,000–R500,000',
  'R500,000+',
  'Ongoing: R5,000–R15,000/month',
  'Ongoing: R15,000–R50,000+/month',
  'Need help scoping',
];
export const timelines = [
  'As soon as practical',
  'Within 1–3 months',
  'Within 3–6 months',
  'Exploring options',
];
