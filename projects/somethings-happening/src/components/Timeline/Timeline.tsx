import { type ReactNode } from 'react';
import styles from './Timeline.module.css';

export interface TimelineProps {
  children: ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  const combinedClassName = className
    ? `${styles.timeline} ${className}`
    : styles.timeline;

  return (
    <div className={combinedClassName} role="feed" aria-label="Event timeline">
      {children}
    </div>
  );
}
