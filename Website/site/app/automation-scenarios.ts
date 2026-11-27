import {
  Calculator,
  ClipboardCheck,
  FileText,
  FolderCheck,
  Gauge,
  Globe,
  Inbox,
  MessageCircle,
  Receipt,
  ScanText,
  ShoppingCart,
  Truck,
  UserCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';

// Illustrative workflows only. Names, amounts and timings are fictional.
export type ScenarioNode = {
  label: string;
  detail: string;
  icon: LucideIcon;
  human?: boolean;
};

export type ScenarioEvent = { at: number; node: number; text: string };

export type Scenario = {
  id: string;
  label: string;
  summary: string;
  nodes: ScenarioNode[];
  events: ScenarioEvent[];
};

export const scenarios: Scenario[] = [
  {
    id: 'enquiry',
    label: 'Enquiry to invoice',
    summary:
      'A website enquiry becomes a contact, a quote, an invoice and a client update, with one approval click.',
    nodes: [
      { label: 'Website form', detail: 'Enquiry captured', icon: Globe },
      { label: 'CRM', detail: 'Contact and deal created', icon: Users },
      { label: 'Quote', detail: 'Drafted from your price list', icon: FileText },
      {
        label: 'Invoice',
        detail: 'Issued after approval',
        icon: Receipt,
        human: true,
      },
      {
        label: 'Notify',
        detail: 'WhatsApp and email sent',
        icon: MessageCircle,
      },
    ],
    events: [
      { at: 0, node: 0, text: 'New enquiry: "Office fit-out, 12 desks"' },
      { at: 650, node: 0, text: 'Fields validated · spam check passed' },
      { at: 1400, node: 1, text: 'Contact created: Thandi M., Mokoena & Partners' },
      { at: 2050, node: 1, text: 'Deal opened in pipeline › Qualified' },
      { at: 2900, node: 2, text: 'Quote Q-1042 generated · R 48 600' },
      { at: 3550, node: 2, text: 'Sent to sales lead for one-click approval' },
      { at: 4400, node: 3, text: 'Approved ✓ Invoice INV-2291 issued' },
      { at: 5050, node: 3, text: 'Synced to accounting · due in 14 days' },
      { at: 5900, node: 4, text: 'WhatsApp confirmation sent to client' },
      { at: 6500, node: 4, text: 'Team notified · follow-up booked for Friday' },
    ],
  },
  {
    id: 'documents',
    label: 'Document intake',
    summary:
      'Supplier invoices are read with AI assistance. Uncertain fields go to a person before anything is posted.',
    nodes: [
      { label: 'Inbox', detail: 'Invoices arrive by email', icon: Inbox },
      { label: 'AI extraction', detail: 'Totals, VAT and dates read', icon: ScanText },
      {
        label: 'Human review',
        detail: 'Low-confidence fields flagged',
        icon: UserCheck,
        human: true,
      },
      { label: 'Accounting', detail: 'Bill created and coded', icon: Calculator },
      { label: 'Archive', detail: 'Filed with an audit trail', icon: FolderCheck },
    ],
    events: [
      { at: 0, node: 0, text: '3 new attachments from accounts@supplier.co.za' },
      { at: 650, node: 0, text: 'PDFs detected · duplicates skipped' },
      { at: 1400, node: 1, text: 'Supplier, invoice number and due date extracted' },
      { at: 2050, node: 1, text: 'VAT 15% verified against line totals' },
      { at: 2900, node: 2, text: '1 field below confidence threshold → review' },
      { at: 3550, node: 2, text: 'Reviewer confirmed amount ✓' },
      { at: 4400, node: 3, text: 'Bill posted to "Office supplies"' },
      { at: 5050, node: 3, text: 'Payment scheduled for the next run' },
      { at: 5900, node: 4, text: 'Original filed to Finance › 2026 › Suppliers' },
      { at: 6500, node: 4, text: 'Audit trail saved · 0 manual captures' },
    ],
  },
  {
    id: 'stock',
    label: 'Stock reorder',
    summary:
      'Sales data triggers a reorder when stock runs low. A manager approves the order from their phone.',
    nodes: [
      { label: 'Sales feed', detail: 'POS and online orders', icon: ShoppingCart },
      { label: 'Stock rule', detail: 'Reorder point reached', icon: Gauge },
      {
        label: 'Purchase order',
        detail: 'Drafted for preferred supplier',
        icon: ClipboardCheck,
      },
      {
        label: 'Approval',
        detail: 'Manager approves on mobile',
        icon: UserCheck,
        human: true,
      },
      { label: 'Delivery', detail: 'Tracked until received', icon: Truck },
    ],
    events: [
      { at: 0, node: 0, text: '42 orders synced from store and website' },
      { at: 650, node: 0, text: 'Stock levels recalculated for 318 items' },
      { at: 1400, node: 1, text: 'Ceramic mug, sage: 11 left (reorder at 15)' },
      { at: 2050, node: 1, text: '30-day sales trend checked · reorder 60 units' },
      { at: 2900, node: 2, text: 'PO-0577 drafted for Clay & Co. · R 5 400' },
      { at: 3550, node: 2, text: 'Approval request sent to store manager' },
      { at: 4400, node: 3, text: 'Approved on mobile ✓ PO emailed to supplier' },
      { at: 5050, node: 3, text: 'Supplier confirmed · ETA Thursday' },
      { at: 5900, node: 4, text: 'Delivery received · stock updated to 71' },
      { at: 6500, node: 4, text: 'Online listing back to "In stock"' },
    ],
  },
];

export function scenarioDuration(scenario: Scenario) {
  return scenario.events[scenario.events.length - 1].at + 900;
}
