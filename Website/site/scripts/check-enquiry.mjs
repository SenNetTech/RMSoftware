import assert from 'node:assert/strict';
import { validateEnquiry, formatEnquiry } from '../app/enquiry-data.ts';
import { budgets, projectTypes, timelines } from '../app/services-data.ts';
const valid = {
  name: 'Example Person',
  company: 'Example Business',
  email: 'person@example.com',
  phone: '+27 11 555 0100',
  problem: 'We need one place to manage incoming customer requests.',
  projectType: projectTypes[0],
  budget: budgets[0],
  timeline: timelines[0],
};
assert.equal(validateEnquiry(valid), null);
assert.equal(
  validateEnquiry({ ...valid, phone: '' }),
  null,
  'Phone must remain optional',
);
for (const patch of [
  { name: ' ' },
  { company: '' },
  { email: 'invalid' },
  { phone: 'letters' },
  { problem: 'Too short' },
  { problem: 'x'.repeat(4001) },
  { budget: 'tampered' },
  { timeline: '' },
  { projectType: 'tampered' },
])
  assert.ok(
    validateEnquiry({ ...valid, ...patch }),
    `Reject invalid values: ${JSON.stringify(patch)}`,
  );
for (const value of Object.values(valid))
  assert.ok(
    formatEnquiry(valid).includes(value),
    'The email draft must preserve every field',
  );
assert.ok(formatEnquiry({ ...valid, phone: '' }).includes('Not provided'));
console.log(
  'Enquiry checks passed: required fields, optional phone, validation limits and complete email drafts. No messages sent.',
);
