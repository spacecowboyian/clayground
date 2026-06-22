import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { colors, font, spring } from '../../tokens';

export type ToastTone = 'success' | 'info' | 'error';

export interface ToastProps {
  /** Color + icon set. success = jade ✓, info = peri i, error = red !. */
  tone?: ToastTone;
  /** Bold heading line. */
  title: string;
  /** Secondary message line. */
  message: string;
  /** Called when the × close button is pressed. */
  onClose?: () => void;
}

/** Per-tone left-border color + leading icon glyph, ported from the source. */
export const toneStyles: Record<ToastTone, { color: string; icon: string }> = {
  success: { color: colors.jade, icon: '✓' },
  info: { color: colors.peri, icon: 'i' },
  error: { color: colors.red, icon: '!' },
};

/**
 * A single toast notification: colored left border, icon, title, message,
 * and an × close button. Slides in with the sc-toastin keyframe.
 */
export function Toast({ tone = 'success', title, message, onClose }: ToastProps) {
  const { color, icon } = toneStyles[tone];
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 12px 30px rgba(22,33,31,.18)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        borderLeft: `4px solid ${color}`,
        animation: `sc-toastin .32s ${spring} both`,
      }}
    >
      <div
        style={{
          fontFamily: font.ui,
          fontWeight: 700,
          fontSize: 15,
          color,
          lineHeight: 1.3,
          flex: 'none',
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: font.ui,
            fontWeight: 600,
            fontSize: 14,
            color: colors.ink,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: font.ui,
            fontSize: 13,
            color: colors.muted,
            marginTop: 2,
          }}
        >
          {message}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss"
        style={{
          background: 'none',
          border: 'none',
          color: '#9A9488',
          fontSize: 16,
          cursor: 'pointer',
          lineHeight: 1,
          padding: 0,
          flex: 'none',
        }}
      >
        ×
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toaster: a viewport that stacks toasts bottom-right, plus a useToaster hook.
// ---------------------------------------------------------------------------

export interface ToastOptions {
  tone?: ToastTone;
  title: string;
  message: string;
  /** Auto-dismiss delay in ms. Defaults to 4000. */
  duration?: number;
}

interface ToastItem extends Required<Omit<ToastOptions, 'duration'>> {
  id: number;
  duration: number;
}

interface ToasterContextValue {
  push: (opts: ToastOptions) => void;
}

const ToasterContext = createContext<ToasterContextValue | null>(null);

/** Fixed bottom-right stack of toasts, matching the source overlay container. */
export function ToastViewport({ toasts, onDismiss }: {
  toasts: Array<{ id: number; tone: ToastTone; title: string; message: string }>;
  onDismiss: (id: number) => void;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        right: 22,
        bottom: 22,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        zIndex: 90,
        width: 320,
        maxWidth: 'calc(100vw - 44px)',
      }}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          tone={t.tone}
          title={t.title}
          message={t.message}
          onClose={() => onDismiss(t.id)}
        />
      ))}
    </div>
  );
}

let toastSeq = 0;

/**
 * Wrap a subtree in `<Toaster>` and call `useToaster().push(...)` to fire
 * auto-dismissing (4s default) toasts that stack bottom-right.
 */
export function Toaster({ children }: { children?: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current[id];
    if (timer) {
      clearTimeout(timer);
      delete timers.current[id];
    }
  }, []);

  const push = useCallback(
    (opts: ToastOptions) => {
      const id = ++toastSeq;
      const item: ToastItem = {
        id,
        tone: opts.tone ?? 'success',
        title: opts.title,
        message: opts.message,
        duration: opts.duration ?? 4000,
      };
      setToasts((prev) => [...prev, item]);
      timers.current[id] = setTimeout(() => dismiss(id), item.duration);
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      Object.values(pending).forEach(clearTimeout);
    };
  }, []);

  return (
    <ToasterContext.Provider value={{ push }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToasterContext.Provider>
  );
}

/** Access the nearest `<Toaster>` to push toasts. */
export function useToaster(): ToasterContextValue {
  const ctx = useContext(ToasterContext);
  if (!ctx) {
    throw new Error('useToaster must be used within a <Toaster>');
  }
  return ctx;
}
