import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('js-icon')
export class JsIcon extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: String })
  hierarchy = 'primary'

  @property({ type: Boolean, reflect: true })
  disabled = false

  render() {
    const classes = {
      'js-icon': true,
      'js-icon--md': this.size === 'md',
      'js-icon--sm': this.size === 'sm',
      'js-icon--primary': this.hierarchy === 'primary',
      'js-icon--secondary': this.hierarchy === 'secondary',
      'js-icon--disabled': this.disabled,
    }

    return html`<span class=${classMap(classes)}></span>`
  }

  static styles = css`
    .js-icon {
      display: block;
      background: var(--primary-700);
      height: 24px;
      width: 24px;
      &.js-icon--sm {
        height: 16px;
        width: 16px;
      }
      &.js-icon--disabled {
        background: var(--primary-300);
      }
      &.js-icon--secondary {
        background: var(--secondary-700);
        &.js-icon--disabled {
          background: var(--secondary-300);
        }
      }
    }
  `
}
