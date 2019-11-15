import {
  LitElement,
  html,
  property,
  customElement,
  TemplateResult,
} from 'lit-element'
import { TAG_NAME as BUTTON_TAG_NAME } from './checkout-button'
import { Frontend } from '../frontend'
import { Product } from '../types/shop'

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
  config

  @property({ type: String })
  collectMetadata

  @property({ type: String })
  onError

  private metadataCallback: Function = product => {
    console.warn('collect metadata not implements')
    console.log(product)
  }

  private errorCallback: Function = error => {
    console.warn(error)
  }

  private frontend: Promise<Frontend>

  constructor() {
    super()
    this.config = 'nimiq-pop-up-shop-configuration.json'
    this.checkout = this.checkout.bind(this)
  }

  firstUpdated(changedProperties): void {
    console.log(this.config)
    this.frontend = new Promise<Frontend>(resolve => {
      fetch(location + this.config)
        .then(data => data.json())
        .then(configuration => resolve(new Frontend(configuration)))
    })
  }

  connectedCallback(): void {
    super.connectedCallback()
    for (const button of document.getElementsByTagName(BUTTON_TAG_NAME)) {
      button.addEventListener('checkout', this.checkout)
    }

    if (this.collectMetadata) {
      this.metadataCallback = eval(this.collectMetadata)
    }
    if (this.onError) {
      this.errorCallback = eval(this.onError)
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    for (const button of this.getElementsByTagName(BUTTON_TAG_NAME)) {
      button.removeEventListener('checkout', this.checkout)
    }
  }

  protected async checkout(ev: CustomEvent): Promise<string> {
    console.log('checkout', ev)
    const frontend = await this.frontend
    const products: Product[] = [ev.detail]
    try {
      const metadata = await this.metadataCallback(
        products,
        frontend.sumUp(products),
      )
      if (metadata) return frontend.checkout(products, metadata)
    } catch (e) {
      this.errorCallback(e)
    }
  }

  render(): TemplateResult {
    // Render all nested children using <slot/>
    // https://lit-element.polymer-project.org/guide/templates#render-light-dom-children-with-the-slot-element
    return html`
      <slot></slot>
    `
  }
}
