import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('js-input-text')
export class JsInputText extends LitElement {
  @property({ type: String })
  value = ''

  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: Boolean })
  showLabel = false

  @property({ type: Boolean })
  showHint = false

  @property({ type: Boolean })
  showIcon = true

  @property({ type: Boolean })
  showError = true

  @property({ type: Boolean, reflect: true })
  disabled = false

  @property({ type: String })
  placeholder = 'Input texts'

  _handleInput(event: InputEvent) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true })
    )
  }

  _iconColor() {
    if (this.showError) {
      return 'var(--base-error)'
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
      'js-field': true,
      'js-field--md': this.size === 'md',
      'js-field--sm': this.size === 'sm',
      'js-field--primary': this.hierarchy === 'primary',
      'js-field--secondary': this.hierarchy === 'secondary',
      'js-field--disabled': this.disabled,
      'js-field--error': this.showError,
    }

    return html`
      <div class=${classMap(classes)}>
        ${this.showLabel
          ? html`<label class="js-field_label"
              ><slot name="label"></slot
            ></label>`
          : ''}
        <div class="js-field_wrapper">
          <input
            class="js-field_input"
            value=${this.value}
            ?disabled=${this.disabled}
            @input=${this._handleInput}
            placeholder=${this.placeholder}
            type="text"
          />
          ${this.showIcon
            ? html` <js-icon
                .size=${this.size}
                .name=${'info-circle'}
                .color=${this._iconColor()}
              ></js-icon>`
            : ''}
        </div>
        ${this.showError
          ? html`<p class="js-field_error"><slot name="error"></slot></p>`
          : this.showHint
          ? html`<p class="js-field_hint"><slot name="hint"></slot></p>`
          : ''}
      </div>
    `
  }

  static styles = css`
    .js-field {
      font-family: var(--font-inter);
    }
    .js-field_wrapper {
      display: inline-flex;
      align-items: center;
      position: relative;
    }
    .js-field_label {
      color: var(--primary-700);
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 4px;
    }
    .js-field_input {
      box-sizing: border-box;
      border-color: var(--primary-700);
      border-radius: 8px;
      border-style: solid;
      border-width: 1px;
      color: black;
      font-size: 16px;
      min-width: 200px;
      height: 40px;
      padding: 10px 16px;
      &::placeholder {
        color: var(--primary-300);
      }
      &:focus {
        outline: none;
      }
    }
    .js-field_hint,
    .js-field_error {
      display: block;
      font-size: 12px;
      margin: 4px 0 0 0;
    }
    .js-field_hint {
      color: var(--primary-500);
    }
    .js-field_error {
      color: var(--base-error);
    }

    js-icon {
      position: absolute;
      right: 16px;
    }

    .js-field {
      &.js-field--primary {
        & .js-field_label {
          color: var(--primary-700);
        }
        & .js-field_hint {
          color: var(--primary-500);
        }
      }
      &.js-field--disabled {
        & .js-field_label {
          color: var(--primary-300);
        }
        & .js-field_input {
          border-color: var(--primary-300);
          color: var(--primary-300);
          &::placeholder {
            color: var(--primary-300);
          }
        }
        & .js-field_hint {
          color: var(--primary-300);
        }
      }
      &.js-field--secondary {
        & .js-field_label {
          color: var(--secondary-700);
        }
        & .js-field_input {
          border-color: var(--secondary-700);
          &::placeholder {
            color: var(--secondary-500);
          }
        }
        & .js-field_hint {
          color: var(--secondary-500);
        }
        &.js-field--disabled {
          & .js-field_label {
            color: var(--secondary-300);
          }
          & .js-field_input {
            border-color: var(--secondary-500);
            &::placeholder {
              color: var(--secondary-300);
            }
          }
          & .js-field_hint {
            color: var(--secondary-300);
          }
        }
      }
      &.js-field--sm {
        & .js-field_input {
          height: 32px;
        }
      }
      &.js-field--error {
        & .js-field_hint {
          color: var(--base-error);
        }
        & .js-field_input {
          border-color: var(--base-error);
        }
      }
    }
  `
}
