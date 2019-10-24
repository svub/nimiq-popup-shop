import { LitElement, html, property, customElement } from 'lit-element';


/**
 * <nimiq-shop> web component
 * It`s acting as a wrapper to provide needed properties
 * to nested `<nimiq-shop-checkout-button> components
 * @export
 * @class NimiqShop
 * @extends {LitElement}
 */
@customElement('nimiq-shop')
export class NimiqShop extends LitElement {
  @property({type: String}) 
  address = '';

  connectedCallback() {
    super.connectedCallback()
    const buttons = this.getElementsByTagName('nimiq-shop-checkout-button')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('checkout', this.checkout);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    const buttons = this.getElementsByTagName('nimiq-shop-checkout-button')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].removeEventListener('checkout', this.checkout);
    }
  }

  protected checkout(ev: CustomEvent): void {
    console.log("checkout", ev)
  }
  
  render() {
    // Render all nested children using <slot/>
    // https://lit-element.polymer-project.org/guide/templates#render-light-dom-children-with-the-slot-element
    return html`
      <slot></slot>
    `;
  }
}
