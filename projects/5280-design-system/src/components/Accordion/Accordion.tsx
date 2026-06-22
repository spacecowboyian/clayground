import React, { useState } from 'react';
import { colors, font } from '../../tokens';

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  /** The disclosure rows. The first item is open by default. */
  items: AccordionItem[];
}

/**
 * Stateful disclosure list with a smooth height-and-fade reveal and a
 * rotating "+" caret. Ported pixel-for-pixel from the source; the first
 * item is open on mount.
 */
export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) =>
    setOpenIndex((current) => (current === i ? null : i));

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${colors.border}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const isLast = i === items.length - 1;
        return (
          <div
            key={i}
            style={
              isLast ? undefined : { borderBottom: '1px solid #F0EDE6' }
            }
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '20px 22px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                fontFamily: font.display,
                fontWeight: 700,
                fontSize: 18,
                color: colors.ink,
              }}
            >
              {item.question}
              <span
                style={{
                  fontFamily: font.ui,
                  fontWeight: 400,
                  fontSize: 22,
                  color: colors.pine,
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform .3s ease',
                }}
              >
                +
              </span>
            </button>
            <div
              style={{
                maxHeight: isOpen ? 200 : 0,
                overflow: 'hidden',
                transition: 'max-height .34s ease,opacity .3s ease',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p
                style={{
                  fontFamily: font.serif,
                  fontSize: 15,
                  color: colors.muted,
                  lineHeight: 1.5,
                  margin: 0,
                  padding: '0 22px 20px',
                }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
