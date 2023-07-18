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
    name: {
      control: 'radio',
      options: ['chevron-down', 'info-circle'],
    },
    color: {
      control: {
        type: 'color',
        presetColors: ['#d8b2e6', '#7e329a', '#eaebad', '#a2a428'],
      },
    },
  },
} satisfies Meta
export default meta

export const Icon: StoryFn = (args) => html`
  <js-icon .size="${args.size}" .name="${args.name}" .color="${args.color}" />
`
