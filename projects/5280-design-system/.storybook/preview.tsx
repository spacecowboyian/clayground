import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/theme.css';
import { font, colors } from '../src/tokens';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: colors.cream },
        { name: 'surface', value: colors.surface },
        { name: 'pine', value: colors.pine },
        { name: 'ink', value: colors.ink },
      ],
    },
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          fontFamily: font.ui,
          color: colors.ink,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
