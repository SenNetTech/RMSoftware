import type { services } from './services-data';

// Concept designs only: fictional businesses, never presented as client work.
export type Demo = {
  slug: string;
  title: string;
  industry: string;
  serviceSlug: (typeof services)[number]['slug'];
  category: 'software' | 'web' | 'automation' | 'integration';
  frame: 'browser' | 'phone';
  url: string;
  image: { src: string; width: number; height: number; alt: string };
  summary: string;
  automations: string[];
};

export const demoCategories = [
  { id: 'all', label: 'All concepts' },
  { id: 'software', label: 'Custom software' },
  { id: 'web', label: 'Web apps' },
  { id: 'automation', label: 'Automation' },
  { id: 'integration', label: 'Integration' },
] as const;

export const demos: Demo[] = [
  {
    slug: 'invoice-automation',
    title: 'Enquiry-to-invoice automation console',
    industry: 'Professional services',
    serviceSlug: 'business-process-automation',
    category: 'automation',
    frame: 'browser',
    url: 'flowdesk.app/runs',
    image: {
      src: '/images/demos/invoice-automation.webp',
      width: 1376,
      height: 768,
      alt: 'Concept automation console showing a connected pipeline from website enquiry to CRM, quote, invoice and WhatsApp, with a run history table',
    },
    summary:
      'One place to watch every enquiry move from first contact to paid invoice, with approvals where they matter.',
    automations: [
      'Enquiries create CRM contacts automatically',
      'Quotes drafted from the current price list',
      'Invoices issued and synced after approval',
    ],
  },
  {
    slug: 'legal-client-portal',
    title: 'Matter-tracking client portal',
    industry: 'Legal practice',
    serviceSlug: 'custom-business-software',
    category: 'software',
    frame: 'browser',
    url: 'portal.mokoenapartners.co.za',
    image: {
      src: '/images/demos/legal-client-portal.webp',
      width: 1376,
      height: 768,
      alt: 'Concept law firm client portal with a navy sidebar, matter summary cards and a table of matters with status labels',
    },
    summary:
      'Clients check matter progress, sign documents and download invoices without phoning the office.',
    automations: [
      'Signed documents filed to the right matter',
      'Clients notified when a matter changes stage',
      'Monthly statements generated automatically',
    ],
  },
  {
    slug: 'logistics-dashboard',
    title: 'Fleet and deliveries operations dashboard',
    industry: 'Logistics',
    serviceSlug: 'custom-business-software',
    category: 'software',
    frame: 'browser',
    url: 'ops.swiftroute.co.za',
    image: {
      src: '/images/demos/logistics-dashboard.webp',
      width: 1376,
      height: 768,
      alt: 'Concept dark logistics dashboard with a route map of Gauteng, delivery KPIs, a trend chart and an alerts list',
    },
    summary:
      'Dispatchers see every vehicle, delivery and delay in one live view instead of five spreadsheets.',
    automations: [
      'Late deliveries flagged before customers call',
      'Proof of delivery attached to each order',
      'Daily performance report emailed at 06:00',
    ],
  },
  {
    slug: 'clinic-booking-app',
    title: 'Clinic booking web app',
    industry: 'Health and wellness',
    serviceSlug: 'web-application-development',
    category: 'web',
    frame: 'phone',
    url: 'book.bloomwellness.co.za',
    image: {
      src: '/images/demos/clinic-booking-app.webp',
      width: 768,
      height: 1376,
      alt: 'Concept mobile booking screen with a date picker, available time slots, a practitioner card and a confirm booking button',
    },
    summary:
      'Patients book, reschedule and get reminders on their phones, so reception can focus on the people in the room.',
    automations: [
      'WhatsApp reminders 24 hours before',
      'Cancelled slots offered to the waiting list',
      'Bookings synced to practitioner calendars',
    ],
  },
  {
    slug: 'retail-storefront',
    title: 'Lifestyle retail storefront',
    industry: 'Retail and e-commerce',
    serviceSlug: 'web-application-development',
    category: 'web',
    frame: 'browser',
    url: 'kayaliving.co.za',
    image: {
      src: '/images/demos/retail-storefront.webp',
      width: 1376,
      height: 768,
      alt: 'Concept homeware online store with a warm ceramic product hero, a shop new arrivals button and product cards priced in rand',
    },
    summary:
      'A fast, considered storefront connected to stock, payments and delivery from day one.',
    automations: [
      'Stock synced between store and website',
      'Low-stock reorders drafted for approval',
      'Order updates sent by email and WhatsApp',
    ],
  },
  {
    slug: 'property-listings',
    title: 'Property listings and search',
    industry: 'Real estate',
    serviceSlug: 'software-modernization-integration',
    category: 'integration',
    frame: 'browser',
    url: 'harbourlane.co.za/listings',
    image: {
      src: '/images/demos/property-listings.webp',
      width: 1376,
      height: 768,
      alt: 'Concept real estate website with search filters, a grid of modern home listings priced in rand and a map with price pins',
    },
    summary:
      'Listings managed in one back office and published everywhere, with leads routed to the right agent.',
    automations: [
      'Listings syndicated to property portals',
      'Leads routed to the listing agent instantly',
      'Viewing confirmations and feedback requests',
    ],
  },
];

export function demosForService(slug: string) {
  return demos.filter((demo) => demo.serviceSlug === slug);
}
