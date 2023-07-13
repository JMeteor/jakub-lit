import { html } from "lit";
import { Meta, StoryFn } from "@storybook/web-components";
import "./js-button";

const  meta = {
  title: "Components/Button",
  argTypes: {
    text: {
      control: { type: 'text' }
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md']
    },
    hierarchy: {
      control: { type: 'radio' },
      options: ['primary', 'secondary']
    },
    type: {
      control: { type: 'radio' },
      options: ['filled', 'outlined']
    },
    iconAfter: {
      control: { type: 'boolean' }
    },
    iconBefore: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    }
  }
} satisfies Meta
export default meta

export const Button : StoryFn = (args) => html`
  <js-button 
    .disabled="${args.disabled}"
    .size="${args.size}" 
    .hierarchy="${args.hierarchy}"
    .type="${args.type}"
    .iconBefore="${args.iconBefore}"
    .iconAfter="${args.iconAfter}">${ args.text }</js-button>
`
