import { LitElement, html, property, customElement} from 'lit-element';
import buttonStyles from '../styles/buttons'
import typographyStyles from '../styles/typography'
import themeStyles from '../styles/theme'

@customElement('nimiq-shop-checkout-button')
export class CheckoutButton extends LitElement {

  static get styles() {
    return [
      themeStyles,
      buttonStyles,
      typographyStyles
    ]
  }

  /**
   * Name of the product to buy
   */
  @property({type: String}) 
  label = '';
  
  protected get hasLabel(): Boolean {
    return this.label.trim().length > 0
  }
  
  /**
   * Name of the product to buy
   */
  @property({type: String}) 
  name = '';
  
  protected get hasName(): Boolean {
    return this.name.trim().length > 0
  }
  
  /**
   * Price of the product to buy
   */
  @property({type: Number}) 
  price = 0;

  /**
   * Flag to inverse button style
   */
  @property({type: Boolean}) 
  inverse = false;

  protected get buttonInverseClass(): String {
    return (this.inverse) ? 'inverse' : ''
  }

  /**
   * Flag to style a small button size
   */
  @property({type: Boolean}) 
  small = false;

  /**
   * Flag to style a pill button
   */
  @property({type: Boolean}) 
  pill = false;
  
  protected get buttonClass(): String {
    return (this.small) 
      ? 'nq-button-s' : (this.pill) 
        ? 'nq-button-pill' 
        : 'nq-button'
  }
  
  /**
   * Flag to disable the button
   */
  @property({type: Boolean}) 
  disable = false;

  /**
   * Button color class
   */
  @property({type: String}) 
  buttonColor = '';
  
  protected get buttonColorClass(): String {
    let clazz: String;
    switch (this.buttonColor) {
      case 'light-blue':
      case 'green':
      case 'orange':
      case 'red':
      case 'gold':
        clazz = this.buttonColor
        break;
      default: 
        clazz = ''
    }
    return clazz;
  }

  protected get classNames(): String {
    let classes = [
      this.buttonClass,
      this.buttonColorClass,
      this.buttonInverseClass,
    ];
    return classes.join(' ')
  }

  clickHandler(ev: Event):void {
    const event = new CustomEvent('checkout', {
      detail: {
        product: this.name, 
        price: this.price
      }
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <button 
        class="${this.classNames}"
        ?disabled="${this.disable}"
        class="nq-button"
        @click="${this.clickHandler}">
          ${this.hasLabel ? this.label : this.name}
      </button>`;
  }
}
