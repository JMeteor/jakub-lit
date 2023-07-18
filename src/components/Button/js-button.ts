import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('js-button')
export class JsButton extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: String })
  type = 'filled'

  @property({ type: Boolean })
  iconBefore = false

  @property({ type: Boolean })
  iconAfter = false

  @property({ type: Boolean, reflect: true })
  disabled = false

  _iconColor() {
    if (this.type === 'filled' && this.hierarchy === 'secondary') {
      return 'var(--secondary-100)'
    }
    if (this.type === 'filled') {
      return 'var(--primary-100)'
    }
    if (this.hierarchy === 'secondary' && this.disabled) {
      return 'var(--secondary-300)'
    }
    if (this.hierarchy === 'secondary') {
      return 'var(--secondary-700)'
    }
    if (this.disabled) {
      return 'var(--primary-300)'
    }
    return 'var(--primary-700)'
  }

  render() {
    const classes = {
      'js-button': true,
      'js-button--md': this.size === 'md',
      'js-button--sm': this.size === 'sm',
      'js-button--primary': this.hierarchy === 'primary',
      'js-button--secondary': this.hierarchy === 'secondary',
      'js-button--filled': this.type === 'filled',
      'js-button--outlined': this.type === 'outlined',
    }

    return html`
      <button class=${classMap(classes)} ?disabled=${this.disabled}>
        ${this.iconBefore
          ? html`<js-icon
              .size=${this.size}
              .color=${this._iconColor()}
              .name=${'chevron-down'}
            />`
          : ''}
        <slot></slot>
        ${this.iconAfter
          ? html`<js-icon
              .size=${this.size}
              .color=${this._iconColor()}
              .name=${'chevron-down'}
            />`
          : ''}
      </button>
    `
  }

  static styles = css`
    .js-button {
      border-radius: 8px;
      border-width: 1px;
      border-style: solid;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;

      font-family: var(--font-inter);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;

      & .js-icon {
        height: 24px;
        width: 24px;
      }

      &:focus {
        outline: none;
      }

      &:disabled {
        pointer-events: none;
      }

      &.js-button--primary {
        background: var(--primary-700);
        border-color: var(--primary-700);
        color: var(--primary-100);
        &:hover {
          background: var(--primary-500);
          border-color: var(--primary-500);
        }
        &:focus {
          background: var(--primary-500);
          border-color: var(--primary-700);
        }
        &:disabled {
          background: var(--primary-300);
          border-color: var(--primary-300);
        }
      }

      &.js-button--outlined {
        background: white;
        border-color: var(--primary-700);
        color: var(--primary-700);
        &:hover {
          background: var(--primary-100);
          border-color: var(--primary-500);
        }
        &:disabled {
          background: white;
          border-color: var(--primary-300);
          color: var(--primary-500);
          & .js-icon {
            background: var(--primary-500);
          }
        }
      }

      &.js-button--secondary {
        background: var(--secondary-700);
        border-color: var(--secondary-700);
        color: var(--secondary-100);
        &:hover {
          background: var(--secondary-500);
          border-color: var(--secondary-500);
        }
        &:focus {
          background: var(--secondary-500);
          border-color: var(--secondary-700);
        }
        &:disabled {
          background: var(--secondary-300);
          border-color: var(--secondary-300);
        }

        &.js-button--outlined {
          background: white;
          border-color: var(--secondary-700);
          color: var(--secondary-700);
          &:hover {
            background: var(--secondary-100);
            border-color: var(--secondary-500);
          }
          &:disabled {
            background: white;
            border-color: var(--secondary-300);
            color: var(--secondary-500);
            & .js-icon {
              background: var(--secondary-500);
            }
          }
        }
      }

      &.js-button--sm {
        border-radius: 6px;
        font-size: 14px;
        padding: 8px 16px;
        & .js-icon {
          height: 16px;
          width: 16px;
        }
      }
    }
  `
}
