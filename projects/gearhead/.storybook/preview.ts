import type { Preview } from '@storybook/react';
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#222222' },
        { name: 'card', value: '#2a2a2a' },
        { name: 'light', value: '#f5f5f5' },
      ],
    },
    layout: 'centered',
    docs: {
      theme: undefined,
    },
  },
};

export default preview;
