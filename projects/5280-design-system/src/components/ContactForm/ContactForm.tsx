import React from 'react';
import { colors } from '../../tokens';
import { TextInput, SelectInput, TextAreaField } from '../Field/Field';

export type ContactFormProps = {
  /** Options for the "Project type" select. */
  projectTypes?: string[];
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: `1px solid ${colors.border}`,
  borderRadius: 16,
  padding: 28,
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
};

const prefRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: 18,
};

const prefLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontSize: 14,
  color: colors.ink,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
};

/** Checked checkbox box (pine fill, lime check). */
const checkedBox: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: 5,
  background: colors.pine,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: colors.lime,
  fontSize: 11,
};

/** Empty checkbox box. */
const emptyBox: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: 5,
  border: '1.5px solid #C9C2B6',
};

/** Selected radio dot. */
const radioDot: React.CSSProperties = {
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: `5px solid ${colors.pine}`,
  background: '#fff',
};

export function ContactForm({
  projectTypes = ['Branding', 'Video production', 'Marketing strategy'],
}: ContactFormProps) {
  return (
    <div style={cardStyle}>
      <TextInput label="Full name" placeholder="Miles Ramsay" />
      <SelectInput label="Project type" options={projectTypes} />
      <TextAreaField
        label="Tell us the story"
        rows={3}
        placeholder="What are you trying to say, and to whom?"
      />
      <div style={prefRowStyle}>
        <label style={prefLabelStyle}>
          <span style={checkedBox}>✓</span>Email
        </label>
        <label style={prefLabelStyle}>
          <span style={emptyBox} />Phone
        </label>
        <label style={prefLabelStyle}>
          <span style={radioDot} />ASAP
        </label>
      </div>
    </div>
  );
}
