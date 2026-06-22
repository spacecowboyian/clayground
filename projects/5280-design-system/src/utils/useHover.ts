import { useState } from 'react';

/** Track hover state for inline-styled components. */
export function useHover() {
  const [isHovered, setHovered] = useState(false);
  return {
    isHovered,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

/** Track focus state for inline-styled inputs. */
export function useFocus() {
  const [isFocused, setFocused] = useState(false);
  return {
    isFocused,
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
    },
  };
}
