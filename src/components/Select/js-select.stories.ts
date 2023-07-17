import { html } from 'lit'
import { Meta, StoryFn } from '@storybook/web-components'
import './js-select'

const meta = {
  title: 'Components/Select',
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    value: {
      control: { type: 'text' },
    },
    hint: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    hierarchy: {
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    showLabel: {
      control: { type: 'boolean' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    showHint: {
      control: { type: 'boolean' },
    },
    showError: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta
export default meta

export const Select: StoryFn = (args) => html`
  <js-select
    .disabled="${args.disabled}"
    .size="${args.size}"
    .hierarchy="${args.hierarchy}"
    .showLabel="${args.showLabel}"
    .showIcon="${args.showIcon}"
    .showHint="${args.showHint}"
    .showError="${args.showError}"
    .value="${args.value}"
    .placeholder="${'Placeholder'}"
    .options=${['Option 1', 'Option 2', 'Option 3']}
  >
    <span slot="label">${args.label}</span>
    <span slot="hint">${args.hint}</span>
  </js-select>
`
