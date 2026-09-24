import { projectTypes, timelines } from './services-data.ts';

export const enquiryFields = [
  'name',
  'company',
  'email',
  'phone',
  'problem',
  'projectType',
  'timeline',
] as const;

export type Enquiry = Record<(typeof enquiryFields)[number], string>;

export function validateEnquiry(data: Enquiry): string | null {
  if (
    !data.name.trim() ||
    data.name.length > 100 ||
    !data.company.trim() ||
    data.company.length > 160
  )
    return 'Please enter your name and company.';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.email.length > 254)
    return 'Please enter a valid work email.';

  if (
    data.phone &&
    (!/^[+\d\s().-]{7,30}$/.test(data.phone) ||
      data.phone.replace(/\D/g, '').length < 7)
  )
    return 'Please check your phone number, or leave it blank.';

  if (data.problem.trim().length < 20 || data.problem.length > 4000)
    return 'Please describe what you would like to improve in 20–4,000 characters.';

  if (data.projectType && !projectTypes.includes(data.projectType))
    return 'Please choose a valid project type, or leave it blank.';

  if (data.timeline && !timelines.includes(data.timeline))
    return 'Please choose a valid starting timeframe, or leave it blank.';

  return null;
}

export function formatEnquiry(data: Enquiry) {
  return `Conversation request\n\nName: ${data.name}\nCompany: ${data.company}\nWork email: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nPossible project type: ${data.projectType || 'Not sure yet'}\nPreferred start: ${data.timeline || 'Flexible / not sure yet'}\n\nWhat could work better:\n${data.problem}`;
}
