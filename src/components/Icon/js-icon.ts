import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

const icons: { [key: string]: string } = {
  'chevron-down': `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9.5L12 16.5L5 9.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'chevron-down-sm': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6667 6.5L8.00001 11.1667L3.33334 6.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  'info-circle': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.1672 16.1146L12.1672 16.1251L12.1253 12.1253L11.1253 12.1358M12.0833 8.12549L12.0933 8.12539M21.1248 12.0308C21.1372 13.2127 20.9167 14.3854 20.4759 15.482C20.0351 16.5786 19.3826 17.5776 18.5557 18.4221C17.7288 19.2665 16.7436 19.9399 15.6565 20.4036C14.5694 20.8673 13.4015 21.1124 12.2197 21.1248C11.0379 21.1372 9.86518 20.9167 8.76857 20.4759C7.67195 20.0351 6.67289 19.3826 5.82844 18.5557C4.98399 17.7288 4.31068 16.7436 3.84695 15.6565C3.38323 14.5694 3.13817 13.4016 3.12576 12.2197C3.10071 9.83291 4.02485 7.5339 5.69487 5.82845C7.36489 4.123 9.644 3.15082 12.0308 3.12577C14.4176 3.10072 16.7166 4.02485 18.4221 5.69488C20.1275 7.3649 21.0997 9.64401 21.1248 12.0308Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
}

@customElement('js-icon')
export class JsIcon extends LitElement {
  @property({ type: String })
  size = 'md'

  @property({ type: String })
  name = ''

  private _svgContent = ''

  updated(changedProperties: Map<string, any>) {
    if (['name', 'size'].some((prop) => changedProperties.has(prop))) {
      console.log('name changed')
      this.loadSVG()
      this.requestUpdate()
    }
  }

  private loadSVG() {
    switch (this.name) {
      case 'chevron-down':
        this._svgContent =
          icons[`chevron-down${this.size === 'sm' ? '-sm' : ''}`]
        break
      case 'info-circle':
        this._svgContent = icons[`info-circle`]
        break
      default:
        this._svgContent = ''
    }
  }

  render() {
    const classes = {
      'js-icon': true,
      'js-icon--md': this.size === 'md',
      'js-icon--sm': this.size === 'sm',
    }

    return html`<div
      class=${classMap(classes)}
      .innerHTML=${this._svgContent}
    />`
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
