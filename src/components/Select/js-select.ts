import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('js-select')
export class JsSelect extends LitElement {
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

  @property({ type: Array })
  options = []

  @property({ type: String })
  placeholder = 'Placeholder'

  @property({ type: String })
  selected = ''

  @property({ type: Boolean })
  private dropdownOpen = false

  private onClick(event: Event) {
    event.stopPropagation()
    const value = (event.target as HTMLLIElement).dataset.value
    if (value !== undefined) {
      this.selected = value
    }
    this.requestUpdate()
    this.closeDropdown()
  }

  private toggleDropdown(event: Event) {
    event.stopPropagation()
    this.dropdownOpen = !this.dropdownOpen
  }

  private closeDropdown = () => {
    this.dropdownOpen = false
  }

  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('click', this.closeDropdown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('click', this.closeDropdown)
  }

  render() {
    const classes = {
      'js-select': true,
      'js-select--md': this.size === 'md',
      'js-select--sm': this.size === 'sm',
      'js-select--primary': this.hierarchy === 'primary',
      'js-select--secondary': this.hierarchy === 'secondary',
      'js-select--disabled': this.disabled,
    }

    return html`<div class=${classMap(classes)} @click="${this.toggleDropdown}">
      ${this.showLabel
        ? html`<label class="js-select_label"
            ><slot name="label"></slot
          ></label>`
        : ''}
      <div class="js-select_wrapper">
        <input
          class="js-select_input"
          type="text"
          readonly
          placeholder=${this.placeholder}
          value="${this.selected}"
          ?disabled=${this.disabled}
        />
        <ul
          @click="${this.onClick}"
          class="js-select_dropdown ${this.dropdownOpen
            ? 'js-select_dropdown--open'
            : ''}"
        >
          ${this.options.map(
            (option) =>
              html`<li class="js-select_dropdown_item" data-value=${option}>
                ${option}
              </li>`
          )}
        </ul>
      </div>
      ${this.showHint || this.showError
        ? html`<p class="js-select_hint"><slot name="hint"></slot></p>`
        : ''}
    </div>`
  }

  static styles = css`
    .js-select_wrapper {
      position: relative;
    }
    .js-select_label {
      color: var(--primary-700);
      display: block;
      font-size: 14px;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 4px;
    }
    .js-select_input {
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
    .js-select_hint {
      color: var(--primary-500);
      display: block;
      font-size: 12px;
      margin: 4px 0 0 0;
    }
    .js-select_dropdown {
      background: var(--base-white);
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      z-index: 100;
      margin: 0;
      padding: 2px 0;
      border-radius: 8px;
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      width: 100%;
      list-style: none;
      display: none;
      &.js-select_dropdown--open {
        display: block;
      }
    }
    .js-select_dropdown_item {
      cursor: pointer;
      font-size: 16px;
      padding: 6px 16px;
      &:hover {
        background: var(--primary-100);
      }
    }
    .js-select {
      display: inline-block;
      font-family: var(--font-inter);
      &.js-select--sm {
        & .js-select_input {
          height: 32px;
        }
        & .js-select_dropdown_item {
          padding: 3px 16px;
        }
      }
      &.js-select--secondary {
        & .js-select_label,
        & .js-select_hint {
          color: var(--secondary-700);
        }
        & .js-select_input {
          border-color: var(--secondary-700);
          &::placeholder {
            color: var(--secondary-500);
          }
        }
      }
      &.js-select--disabled {
        cursor: default;
        pointer-events: none;
        & .js-select_label,
        & .js-select_hint,
        & .js-select_input {
          color: var(--primary-300);
        }
        & .js-select_input {
          border-color: var(--primary-300);
        }
        &.js-select--secondary {
          & .js-select_label,
          & .js-select_hint,
          & .js-select_input {
            color: var(--secondary-300);
          }
          & .js-select_input {
            border-color: var(--secondary-300);
            &::placeholder {
              color: var(--secondary-300);
            }
          }
        }
      }
    }
  `
}
