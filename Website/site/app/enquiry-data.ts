import { budgets, projectTypes, timelines } from './services-data.ts';
export const enquiryFields = [
  'name',
  'company',
  'email',
  'phone',
  'problem',
  'projectType',
  'budget',
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
    return 'Please describe the problem in 20–4,000 characters.';
  if (
    !projectTypes.includes(data.projectType) ||
    !budgets.includes(data.budget) ||
    !timelines.includes(data.timeline)
  )
    return 'Please choose a project type, budget and timeline.';
  return null;
}
export function formatEnquiry(data: Enquiry) {
  return `Free consultation request\n\nName: ${data.name}\nCompany: ${data.company}\nWork email: ${data.email}\nPhone: ${data.phone || 'Not provided'}\nProject type: ${data.projectType}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\n\nBusiness problem:\n${data.problem}`;
}
