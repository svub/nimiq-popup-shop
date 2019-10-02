import { LitElement, html, property, customElement, css} from 'lit-element';
import {buttonStyle} from '../styles/buttons'
import {typographyStyle} from '../styles/typography'
import { Product, OrderMeta, Order, CheckoutOptions } from '../types/shop';
import HubApi from '@nimiq/hub-api';
import { DummyShopStorage, IpfsShopStorage, ShopStorage } from '../storage';

enum SubmitState {
  NotSubmitted,
  Submitting,
  SubmitSucceed,
  SubmitFailed
}

@customElement('nimiq-shop-checkout-button')
export class CheckoutButton extends LitElement {

    static get styles() {
      return [
        buttonStyle,
        typographyStyle
        , css`:host ul {
          list-style: none;
        }`
      ]
    }

  // will be set by 'nimiq-shop'
  @property({type: String, attribute: 'shop-address'}) 
  shopAddress = '';

  @property({type: String}) 
  label = '';

  protected get hasLabel(): Boolean {
    return this.label != '' && this.label.length > 0
  }

  @property({type: String}) 
  name = null;

  @property({type: String, attribute: 'button-class'}) 
  buttonClass = 'nq-button';
  
  @property({type: Number}) 
  price = 0;
  
  @property({type: SubmitState}) 
  submitState = SubmitState.NotSubmitted;

  // error messages
  errors: String[] = []

  // Nimiq Hub Api
  hubApi: HubApi = new HubApi(process.env.HUB_API)

  // Storage
  // TODO(sectore): Put 'repo' into storage
  storage: ShopStorage = process.env.production ? 
    new IpfsShopStorage('') : new DummyShopStorage('')

  protected get hasErrors(): Boolean {
    return this.errors.length > 0
  }

  connectedCallback() {
    super.connectedCallback()
    console.log(`checkout button for ${this.name} connected`)
    this.validate()
  }

  attributeChangedCallback(name, oldval, newval) {
    // console.log('attribute change: ', name, newval);
    super.attributeChangedCallback(name, oldval, newval);
  }

  protected validate():void {
    this.errors = []
    if (this.price <= 0) {
      this.errors.push(`Missing or invalid price`)
    }
    if (this.name == null || this.name == '') {
      this.errors.push(`Missing product name`)
    }
    // TODO: Add a proper validation of an Nimiq address
    if (this.shopAddress == '') {
      this.errors.push(`Missing or invalid address ${this.shopAddress}`)
    }
  }

  protected async checkout(product: Product, meta: OrderMeta): Promise<void> {
    const options: CheckoutOptions = {
      appName: this.name,
      recipient: process.env.SHOP_ADDRESS,
      value: this.price * 1e5,
      // TODO(sectore): Fix unsafe fee value 
      fee: parseInt(process.env.SHOP_FEE),
      shopLogoUrl: process.env.SHOP_LOGO,
    };
    // SignedTransaction
    const signedTx = await this.hubApi.checkout(options);
    console.log(signedTx);

    const order: Order = {
      price: this.price,
      products: [product],
      meta,
      txHash: signedTx.hash,
      timestamp: new Date().getTime(),
    }
    const orderId = await this.storage.store(order)
    console.log('orderId', orderId)
  }

  render() {
    return html`<div>
      <button class="nq-button" ?disabled="${this.hasErrors}">${this.hasLabel ? this.label : this.name}</button>
      <!-- ${this.shopAddress ?
         html`<p>Shop address ${this.shopAddress}</p>`:``}  -->
      ${this.hasErrors ?
        html`<ul>
          ${this.errors.map(e => html`<li><p class="nq-notice error">${e}</p></li>`)}
        </ul>` : ``
    }
    </div>`;
  }
}
