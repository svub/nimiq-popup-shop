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
    // set address to checkout buttons
    let buttons = this.getElementsByTagName('nimiq-shop-checkout-button')
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('shop-address', this.address)
    }
  }
  
  render() {
    // Render all nested children using <slot/>
    // https://lit-element.polymer-project.org/guide/templates#render-light-dom-children-with-the-slot-element
    return html`
      <slot></slot>
    `;
  }
}
