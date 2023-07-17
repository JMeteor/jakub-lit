import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('js-icon')
export class JsIcon extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: Boolean })
  disabled = false

  render() {
    const classes = {
      'js-icon': true,
      'js-icon--md': this.size === 'md',
      'js-icon--sm': this.size === 'sm',
      'js-icon--disabled': this.disabled,
    }

    return html`<span class=${classMap(classes)}></span>`
  }

  static styles = css`
    .js-icon {
      display: block;
      height: 24px;
      width: 24px;
      &.js-icon--sm {
        height: 16px;
        width: 16px;
      }
    }
  `
}
