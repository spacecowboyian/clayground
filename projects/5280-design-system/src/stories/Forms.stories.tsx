import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TextInput,
  SelectInput,
  TextAreaField,
} from '../components/Field/Field';
import { NewsletterSignup } from '../components/NewsletterSignup/NewsletterSignup';
import { ContactForm } from '../components/ContactForm/ContactForm';

const meta = {
  title: 'Components/Forms',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Forms & Inputs — inputs focus to pine with a soft ring. Includes the inline newsletter signup and the valid/invalid field states from the live site.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const card: CSSProperties = {
  background: '#fff',
  border: '1px solid #E7E1D8',
  borderRadius: 16,
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  maxWidth: 420,
};

/** Label + input + focus ring across all three control types. */
export const Fields: Story = {
  render: () => (
    <div style={card}>
      <TextInput label="Full name" placeholder="Miles Ramsay" />
      <SelectInput
        label="Project type"
        options={['Branding', 'Video production', 'Marketing strategy']}
      />
      <TextAreaField
        label="Tell us the story"
        rows={3}
        placeholder="What are you trying to say, and to whom?"
      />
    </div>
  ),
};

/** Green "Looks good" and red "Please enter a valid email" states. */
export const FieldStates: Story = {
  render: () => (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E7E1D8',
        borderRadius: 16,
        padding: '24px 28px',
        maxWidth: 420,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--ui)',
          fontSize: 11,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          color: '#5C6B68',
          marginBottom: 14,
        }}
      >
        States
      </div>
      <div style={{ marginBottom: 14 }}>
        <TextInput
          state="valid"
          defaultValue="hello@5280.com"
          message="✓ Looks good"
        />
      </div>
      <TextInput
        state="invalid"
        defaultValue="not-an-email"
        message="Please enter a valid email"
      />
    </div>
  ),
};

/** Interactive: submit swaps the form for the lime confirmation (sc-pop). */
export const Newsletter: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <NewsletterSignup />
    </div>
  ),
};

/** The full white-card contact form composite. */
export const Contact: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ContactForm />
    </div>
  ),
};

/** The complete forms section: contact card alongside newsletter + states. */
export const Section: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 32, background: '#FBF9F5' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          alignItems: 'start',
          maxWidth: 880,
        }}
      >
        <ContactForm />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <NewsletterSignup />
          <div
            style={{
              background: '#fff',
              border: '1px solid #E7E1D8',
              borderRadius: 16,
              padding: '24px 28px',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--ui)',
                fontSize: 11,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: '#5C6B68',
                marginBottom: 14,
              }}
            >
              States
            </div>
            <div style={{ marginBottom: 14 }}>
              <TextInput
                state="valid"
                defaultValue="hello@5280.com"
                message="✓ Looks good"
              />
            </div>
            <TextInput
              state="invalid"
              defaultValue="not-an-email"
              message="Please enter a valid email"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
