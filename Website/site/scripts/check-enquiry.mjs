import assert from 'node:assert/strict';
import { validateEnquiry, formatEnquiry } from '../app/enquiry-data.ts';
import { projectTypes, timelines } from '../app/services-data.ts';
const valid = {
  name: 'Example Person',
  company: 'Example Business',
  email: 'person@example.com',
  phone: '+27 11 555 0100',
  problem: 'We need one place to manage incoming customer requests.',
  projectType: projectTypes[0],
  timeline: timelines[0],
};
assert.equal(validateEnquiry(valid), null);
assert.equal(
  validateEnquiry({ ...valid, phone: '' }),
  null,
  'Phone must remain optional',
);
assert.equal(
  validateEnquiry({ ...valid, projectType: '', timeline: '' }),
  null,
  'Project type and timing must remain optional',
);
for (const patch of [
  { name: ' ' },
  { company: '' },
  { email: 'invalid' },
  { phone: 'letters' },
  { problem: 'Too short' },
  { problem: 'x'.repeat(4001) },
  { timeline: 'tampered' },
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
assert.ok(!formatEnquiry(valid).includes('Budget:'));
console.log(
  'Enquiry checks passed: no budget field, optional phone/project type/timing, validation limits and complete email drafts. No messages sent.',
);
