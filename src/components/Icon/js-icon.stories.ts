import { html } from 'lit'
import { Meta, StoryFn } from '@storybook/web-components'
import './js-icon'

const meta = {
  title: 'Components/Icon',
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    hierarchy: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta
export default meta

export const Icon: StoryFn = (args) => html`
  <js-icon
    .disabled="${args.disabled}"
    .size="${args.size}"
    .hierarchy="${args.hierarchy}"
  ></js-icon>
`
