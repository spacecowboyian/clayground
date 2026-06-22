import type { Meta, StoryObj } from '@storybook/react';
import { Testimonial } from '../components/Testimonial/Testimonial';

const meta = {
  title: 'Components/Testimonial',
  component: Testimonial,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['feature', 'plain', 'rating'],
    },
  },
} satisfies Meta<typeof Testimonial>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Feature: Story = {
  args: {
    variant: 'feature',
    quote:
      "They didn't just make us something pretty — they found the thing we'd been trying to say for years, and said it in a way people actually felt.",
    author: 'Dana Whitfield',
    role: 'Exec. Director, Rivertown',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
    quote:
      '"Working with 5280 felt like having a creative partner who actually cared about our mission."',
    author: 'Marcus Hale',
    role: 'Founder, Altitude',
  },
};

export const Rating: Story = {
  args: {
    variant: 'rating',
    quote:
      '"Went further than any agency we\'ve hired. The film still gives us chills."',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 18,
        alignItems: 'start',
      }}
    >
      <Testimonial
        variant="feature"
        quote="They didn't just make us something pretty — they found the thing we'd been trying to say for years, and said it in a way people actually felt."
        author="Dana Whitfield"
        role="Exec. Director, Rivertown"
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Testimonial
          variant="plain"
          quote={'"Working with 5280 felt like having a creative partner who actually cared about our mission."'}
          author="Marcus Hale"
          role="Founder, Altitude"
        />
        <Testimonial
          variant="rating"
          quote={'"Went further than any agency we\'ve hired. The film still gives us chills."'}
        />
      </div>
    </div>
  ),
};
