import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../components/Modal/Modal';
import { colors, font, spring } from '../tokens';
import { useHover } from '../utils/useHover';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Pine pill that opens the modal, matching the source trigger button. */
function OpenModalButton({ onClick }: { onClick: () => void }) {
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
        background: colors.pine,
        color: colors.paper,
        border: 'none',
        padding: '13px 26px',
        borderRadius: 999,
        cursor: 'pointer',
        transition: `transform .22s ${spring}`,
        transform: isHovered ? 'translateY(-2px)' : 'none',
      }}
    >
      Open modal
    </button>
  );
}

export const Default: Story = {
  args: { isOpen: false, onClose: () => {} },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid #E7E1D8',
          borderRadius: 16,
          padding: 32,
        }}
      >
        <OpenModalButton onClick={() => setIsOpen(true)} />
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};
