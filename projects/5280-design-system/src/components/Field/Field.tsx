import React from 'react';
import { colors } from '../../tokens';
import { useFocus } from '../../utils/useHover';

export type FieldState = 'default' | 'valid' | 'invalid';

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: '.1em',
  textTransform: 'uppercase',
  color: colors.muted,
  display: 'block',
  marginBottom: 7,
};

/** Base control style shared by text input / select / textarea (default state). */
const controlBase: React.CSSProperties = {
  width: '100%',
  fontFamily: 'var(--ui)',
  fontSize: 15,
  color: colors.ink,
  padding: '12px 15px',
  border: '1.5px solid #E0DACF',
  borderRadius: 11,
  background: '#FDFCF9',
  outline: 'none',
  transition: 'border-color .2s ease,box-shadow .2s ease',
};

/** Soft focus ring: pine border + box-shadow. */
const focusStyle: React.CSSProperties = {
  borderColor: colors.pine,
  boxShadow: '0 0 0 3px rgba(24,74,79,.14)',
};

/** Valid (green) state — matches the "Looks good" sample in source. */
const validStyle: React.CSSProperties = {
  color: colors.jade,
  border: `1.5px solid ${colors.jade}`,
  background: colors.surface,
  boxShadow: '0 0 0 3px rgba(9,109,97,.12)',
};

/** Invalid (red) state — matches the "Please enter a valid email" sample. */
const invalidStyle: React.CSSProperties = {
  color: colors.red,
  border: `1.5px solid ${colors.red}`,
  background: colors.surface,
  boxShadow: '0 0 0 3px rgba(255,59,59,.1)',
};

const validMsgStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontSize: 12,
  color: colors.jade,
};

const invalidMsgStyle: React.CSSProperties = {
  fontFamily: 'var(--ui)',
  fontSize: 12,
  color: colors.red,
};

function stateStyle(state: FieldState): React.CSSProperties {
  if (state === 'valid') return validStyle;
  if (state === 'invalid') return invalidStyle;
  return {};
}

function Label({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <label style={labelStyle}>{children}</label>;
}

/** Render the helper message that accompanies valid/invalid states. */
function StateMessage({ state, message }: { state: FieldState; message?: React.ReactNode }) {
  if (state === 'default') return null;
  const text = message ?? (state === 'valid' ? '✓ Looks good' : 'Please enter a valid email');
  return (
    <div style={{ marginTop: 8, ...(state === 'valid' ? validMsgStyle : invalidMsgStyle) }}>
      {text}
    </div>
  );
}

type BaseProps = {
  label?: React.ReactNode;
  state?: FieldState;
  /** Override the auto helper message shown for valid/invalid states. */
  message?: React.ReactNode;
};

/* ---------------------------------------------------------------- TextInput */

export type TextInputProps = BaseProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> & {
    style?: React.CSSProperties;
  };

export function TextInput({
  label,
  state = 'default',
  message,
  style,
  type = 'text',
  ...rest
}: TextInputProps) {
  const { isFocused, focusProps } = useFocus();
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        {...rest}
        {...focusProps}
        style={{
          ...controlBase,
          ...stateStyle(state),
          ...(state === 'default' && isFocused ? focusStyle : {}),
          ...style,
        }}
      />
      <StateMessage state={state} message={message} />
    </div>
  );
}

/* -------------------------------------------------------------- SelectInput */

export type SelectInputProps = BaseProps &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'style'> & {
    options?: string[];
    style?: React.CSSProperties;
  };

export function SelectInput({
  label,
  state = 'default',
  message,
  options,
  children,
  style,
  ...rest
}: SelectInputProps) {
  const { isFocused, focusProps } = useFocus();
  return (
    <div>
      <Label>{label}</Label>
      <select
        {...rest}
        {...focusProps}
        style={{
          ...controlBase,
          cursor: 'pointer',
          ...stateStyle(state),
          ...(state === 'default' && isFocused ? focusStyle : {}),
          ...style,
        }}
      >
        {options ? options.map((o) => <option key={o}>{o}</option>) : children}
      </select>
      <StateMessage state={state} message={message} />
    </div>
  );
}

/* ------------------------------------------------------------ TextAreaField */

export type TextAreaFieldProps = BaseProps &
  Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> & {
    style?: React.CSSProperties;
  };

export function TextAreaField({
  label,
  state = 'default',
  message,
  rows = 3,
  style,
  ...rest
}: TextAreaFieldProps) {
  const { isFocused, focusProps } = useFocus();
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        rows={rows}
        {...rest}
        {...focusProps}
        style={{
          ...controlBase,
          // Source textarea uses the serif stack and is vertically resizable.
          fontFamily: 'var(--serif)',
          resize: 'vertical',
          ...stateStyle(state),
          ...(state === 'default' && isFocused ? focusStyle : {}),
          ...style,
        }}
      />
      <StateMessage state={state} message={message} />
    </div>
  );
}

/* ----------------------------------------------------------------- Field API */

export type FieldType = 'text' | 'select' | 'textarea';

export type FieldProps =
  | ({ type?: 'text' } & TextInputProps)
  | ({ type: 'select' } & SelectInputProps)
  | ({ type: 'textarea' } & TextAreaFieldProps);

/** Convenience wrapper that dispatches to the right control by `type`. */
export function Field(props: FieldProps) {
  if (props.type === 'select') {
    const { type, ...rest } = props;
    void type;
    return <SelectInput {...rest} />;
  }
  if (props.type === 'textarea') {
    const { type, ...rest } = props;
    void type;
    return <TextAreaField {...rest} />;
  }
  const { type, ...rest } = props;
  void type;
  return <TextInput {...rest} />;
}
