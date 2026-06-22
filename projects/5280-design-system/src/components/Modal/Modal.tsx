import React from 'react';
import { colors, font, spring } from '../../tokens';
import { useHover } from '../../utils/useHover';

export interface ModalProps {
  /** Controlled open state. When false, nothing renders. */
  isOpen: boolean;
  /** Called when the scrim is clicked or a footer button is pressed. */
  onClose: () => void;
  /** Optional custom body. Defaults to the "Let's talk" project content. */
  children?: React.ReactNode;
}

/** The "Maybe later" ghost button in the modal footer. */
function MaybeLaterButton({ onClick }: { onClick: () => void }) {
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
        background: isHovered ? '#F0EFE6' : 'transparent',
        color: colors.pine,
        border: 'none',
        padding: '12px 18px',
        borderRadius: 999,
        cursor: 'pointer',
        transition: 'background .2s ease',
      }}
    >
      Maybe later
    </button>
  );
}

/** The "Start a project" primary button in the modal footer. */
function StartProjectButton({ onClick }: { onClick: () => void }) {
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
        background: isHovered ? '#13403F' : colors.pine,
        color: colors.paper,
        border: 'none',
        padding: '12px 26px',
        borderRadius: 999,
        cursor: 'pointer',
        transition: 'background .2s ease',
      }}
    >
      Start a project
    </button>
  );
}

/**
 * A controlled dialog that springs in (sc-pop) over a blurred dark scrim.
 * Clicking the scrim closes it; clicking the dialog body does not.
 */
export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(22,33,31,.55)',
        backdropFilter: 'blur(3px)',
        WebkitBackdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 80,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 20,
          maxWidth: 440,
          width: '100%',
          padding: '34px 34px 30px',
          boxShadow: '0 30px 70px rgba(22,33,31,.4)',
          animation: `sc-pop .26s ${spring} both`,
        }}
      >
        {children ?? (
          <>
            <div
              style={{
                fontFamily: font.ui,
                fontSize: 11,
                letterSpacing: '.22em',
                textTransform: 'uppercase',
                color: colors.red,
                marginBottom: 10,
              }}
            >
              Let's talk
            </div>
            <h3
              style={{
                fontFamily: font.display,
                fontWeight: 800,
                fontSize: 30,
                letterSpacing: '-.01em',
                margin: '0 0 10px',
              }}
            >
              Wanna make something great?
            </h3>
            <p
              style={{
                fontFamily: font.serif,
                fontSize: 17,
                lineHeight: 1.5,
                color: colors.muted,
                margin: '0 0 24px',
              }}
            >
              We do too. Tell us about the story you're trying to tell and we'll
              go further to find it.
            </p>
            <div
              style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}
            >
              <MaybeLaterButton onClick={onClose} />
              <StartProjectButton onClick={onClose} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
