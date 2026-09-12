'use client';
import Link from '@/app/site-link';
import { useEffect, useRef, useState, type SyntheticEvent } from 'react';
import { ArrowUpRight, Copy, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Button } from '@/components/ui/button';
import { budgets, projectTypes, timelines } from './services-data';
import { contact } from './site-content';
import {
  enquiryFields,
  formatEnquiry,
  validateEnquiry,
  type Enquiry,
} from './enquiry-data';

export default function EnquiryForm() {
  const projectSelect = useRef<HTMLSelectElement>(null);
  const [status, setStatus] = useState<'idle' | 'draft' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [draft, setDraft] = useState('');
  const notice = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const selected = new URLSearchParams(location.search).get('service');
    if (selected && projectTypes.includes(selected) && projectSelect.current)
      projectSelect.current.value = selected;
  }, []);
  useEffect(() => {
    if (['draft', 'error'].includes(status)) notice.current?.focus();
  }, [status]);
  function submit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = Object.fromEntries(
      enquiryFields.map((key) => {
        const value = form.get(key);
        return [key, typeof value === 'string' ? value.trim() : ''];
      }),
    ) as Enquiry;
    const error = validateEnquiry(data);
    if (error) {
      setMessage(error);
      setStatus('error');
      return;
    }
    const text = formatEnquiry(data);
    setDraft(text);
    setStatus('draft');
    setMessage(
      'Your enquiry is ready to email. It has not been sent. Open your email app below, review the message and send it to us.',
    );
  }
  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setMessage(
        `Enquiry copied. Paste it into an email to ${contact.email} and send it.`,
      );
    } catch {
      setMessage('Copy the enquiry text below and paste it into your email.');
    }
  }
  return (
    <form
      id="project-form"
      className="enquiry-form"
      onSubmit={submit}
      onChange={() => {
        if (status === 'draft' || status === 'error') {
          setStatus('idle');
          setDraft('');
          setMessage('');
        }
      }}
    >
      <div className="form-heading">
        <span className="eyebrow">YOUR PROJECT</span>
        <h2>Tell us what needs to work better.</h2>
        <p>All fields are required except your phone number.</p>
      </div>
      <fieldset>
        <legend className="sr-only">Business and project details</legend>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Your name</label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
            />
          </div>
          <div className="field">
            <label htmlFor="company">Company</label>
            <Input
              id="company"
              name="company"
              autoComplete="organization"
              required
              maxLength={160}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Work email</label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
          <div className="field">
            <label htmlFor="phone">
              Phone <span>(optional)</span>
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={30}
            />
          </div>
          <div className="field full-field">
            <label htmlFor="problem">
              What problem are you trying to solve?
            </label>
            <Textarea
              id="problem"
              name="problem"
              required
              minLength={20}
              maxLength={4000}
              rows={5}
              aria-describedby="problem-help"
            />
            <p id="problem-help" className="field-help">
              Tell us about the current process, who uses it and what you would
              like to improve. Please leave out passwords and sensitive customer
              data.
            </p>
          </div>
          <div className="field full-field">
            <label htmlFor="projectType">Type of project</label>
            <NativeSelect
              id="projectType"
              name="projectType"
              ref={projectSelect}
              required
              defaultValue=""
            >
              <NativeSelectOption value="" disabled>
                Select a project type
              </NativeSelectOption>
              {projectTypes.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {item}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="field">
            <label htmlFor="budget">Estimated budget</label>
            <NativeSelect id="budget" name="budget" required defaultValue="">
              <NativeSelectOption value="" disabled>
                Select a budget range
              </NativeSelectOption>
              {budgets.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {item}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="field">
            <label htmlFor="timeline">Desired timeline</label>
            <NativeSelect
              id="timeline"
              name="timeline"
              required
              defaultValue=""
            >
              <NativeSelectOption value="" disabled>
                Select a timeline
              </NativeSelectOption>
              {timelines.map((item) => (
                <NativeSelectOption key={item} value={item}>
                  {item}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
        </div>
        <p className="form-privacy">
          We use your details to respond to your enquiry and arrange the next
          step. <Link href="/privacy/">How we handle your information</Link>.
        </p>
        <p className="field-help email-mode-note">
          This form prepares an email for you to send from your email app.
        </p>
        <Button type="submit" className="button button-primary form-submit">
          Prepare Project Enquiry
          <ArrowUpRight size={18} />
        </Button>
      </fieldset>
      {status !== 'idle' && (
        <div
          className={`form-notice ${status}`}
          ref={notice}
          tabIndex={-1}
          role={status === 'error' ? 'alert' : 'status'}
        >
          <p>{message}</p>
          {draft && (
            <>
              <div className="draft-actions">
                <Link
                  className="button button-primary"
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Project enquiry — free consultation')}&body=${encodeURIComponent(draft)}`}
                >
                  <Mail size={17} />
                  Open email app
                </Link>
                <Button
                  type="button"
                  variant="outline"
                  className="button button-secondary"
                  onClick={copyDraft}
                >
                  <Copy size={16} />
                  Copy enquiry
                </Button>
              </div>
              <details>
                <summary>View enquiry text</summary>
                <pre>{draft}</pre>
              </details>
            </>
          )}
        </div>
      )}
      <noscript>
        <p>
          JavaScript is needed to prepare this form. Email your project details
          directly to{' '}
          <Link href={`mailto:${contact.email}`}>{contact.email}</Link>.
        </p>
      </noscript>
    </form>
  );
}
