import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toast, Toaster, useToaster } from '../components/Toast/Toast';
import { Modal } from '../components/Modal/Modal';
import { colors, font, spring } from '../tokens';
import { useHover } from '../utils/useHover';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: 'inline-radio', options: ['success', 'info', 'error'] },
  },
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    tone: 'success',
    title: 'Saved',
    message: 'Your project brief was sent. We\'ll be in touch soon.',
  },
};

export const Info: Story = {
  args: {
    tone: 'info',
    title: 'Heads up',
    message: 'Newsletter goes out the first Tuesday of every month.',
  },
};

export const Error: Story = {
  args: {
    tone: 'error',
    title: 'Something went wrong',
    message: 'We couldn\'t reach the server. Please try again.',
  },
};

// ---------------------------------------------------------------------------
// Interactive "Triggers" story — the 4 buttons from modals-and-toasts.html.
// ---------------------------------------------------------------------------

interface TriggerButtonProps {
  label: string;
  onClick: () => void;
  background: string;
  color: string;
  border?: string;
  padding: string;
}

function TriggerButton({
  label,
  onClick,
  background,
  color,
  border = 'none',
  padding,
}: TriggerButtonProps) {
  const { isHovered, hoverProps } = useHover();
  return (
    <button
      type="button"
      onClick={onClick}
      {...hoverProps}
      style={{
        fontFamily: font.ui,
        fontWeight: 600,
        fontSize: 15,
        background,
        color,
        border,
        padding,
        borderRadius: 999,
        cursor: 'pointer',
        transition: `transform .22s ${spring}`,
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {label}
    </button>
  );
}

function TriggerRow() {
  const { push } = useToaster();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E7E1D8',
        borderRadius: 16,
        padding: 32,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 14,
        alignItems: 'center',
      }}
    >
      <TriggerButton
        label="Open modal"
        background={colors.pine}
        color={colors.paper}
        padding="13px 26px"
        onClick={() => setModalOpen(true)}
      />
      <TriggerButton
        label="Success toast"
        background={colors.jade}
        color="#fff"
        padding="13px 24px"
        onClick={() =>
          push({
            tone: 'success',
            title: 'Saved',
            message: 'Your project brief was sent.',
          })
        }
      />
      <TriggerButton
        label="Info toast"
        background={colors.peri}
        color="#fff"
        padding="13px 24px"
        onClick={() =>
          push({
            tone: 'info',
            title: 'Heads up',
            message: 'Newsletter goes out the first Tuesday.',
          })
        }
      />
      <TriggerButton
        label="Error toast"
        background="transparent"
        color={colors.red}
        border={`2px solid ${colors.red}`}
        padding="11px 22px"
        onClick={() =>
          push({
            tone: 'error',
            title: 'Something went wrong',
            message: 'We couldn\'t reach the server.',
          })
        }
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export const Triggers: Story = {
  args: { tone: 'success', title: '', message: '' },
  render: () => (
    <Toaster>
      <TriggerRow />
    </Toaster>
  ),
};
