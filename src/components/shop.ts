import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult,
} from 'lit-element'
import { TAG_NAME as BUTTON_TAG_NAME } from './checkout-button'

const TAG_NAME = 'nimiq-shop'

/**
 * <nimiq-shop> web component
 * It`s acting as a wrapper to provide needed properties
 * to nested `<nimiq-shop-checkout-button> components
 * @export
 * @class NimiqShop
 * @extends {LitElement}
 */
@customElement(TAG_NAME)
export class NimiqShop extends LitElement {
  @property({ type: String })
  address = ''

  connectedCallback(): void {
    super.connectedCallback()
    for (const button of document.getElementsByTagName(BUTTON_TAG_NAME)) {
      button.addEventListener('checkout', this.checkout)
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    for (const button of this.getElementsByTagName(BUTTON_TAG_NAME)) {
      button.removeEventListener('checkout', this.checkout)
    }
  }

  protected checkout(ev: CustomEvent): void {
    console.log('checkout', ev)
  }

  render(): TemplateResult {
    // Render all nested children using <slot/>
    // https://lit-element.polymer-project.org/guide/templates#render-light-dom-children-with-the-slot-element
    return html`
      <slot></slot>
    `
  }
}
