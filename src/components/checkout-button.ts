import { LitElement, html, property, customElement } from 'lit-element';
import buttonStyles from '../styles/buttons'
import typographyStyles from '../styles/typography'
import themeStyles from '../styles/theme'

export const TAG_NAME = 'nimiq-shop-checkout-button'

@customElement(TAG_NAME)
export class CheckoutButton extends LitElement {
  static get styles(): CSSResult[] {
    return [themeStyles, buttonStyles, typographyStyles]
  }

  /**
   * Optional label of the button - if not provided, product name will be used.
   */
  @property({ type: String })
  label = '';

  protected get hasLabel(): Boolean {
    return this.label.trim().length > 0
  }

  /**
   * Name of the product to buy
   */
  @property({ type: String })
  name = '';

  /**
   * Price of the product to buy in NIM, minimum `0.00001`
   */
  @property({ type: Number })
  price = 0

  /**
   * Flag to inverse button style
   */
  @property({ type: Boolean })
  inverse = false

  protected get buttonInverseClass(): string {
    return this.inverse ? 'inverse' : ''
  }

  /**
   * Flag to style a small button size
   */
  @property({ type: Boolean })
  small = false

  /**
   * Flag to style a pill button
   */
  @property({ type: Boolean })
  pill = false

  protected get buttonClass(): string {
    return this.small
      ? 'nq-button-s'
      : this.pill
      ? 'nq-button-pill'
      : 'nq-button'
  }

  /**
   * Flag to disable the button
   */
  @property({ type: Boolean })
  disable = false

  /**
   * Button color class
   */
  @property({ type: String })
  buttonColor = ''

  protected get buttonColorClass(): string {
    return ['light-blue', 'green', 'orange', 'red', 'gold'].includes(
      this.buttonColor,
    )
      ? this.buttonColor
      : ''
  }

  protected get classNames(): string {
    const classes = [
      this.buttonClass,
      this.buttonColorClass,
      this.buttonInverseClass,
    ]
    return classes.join(' ')
  }

  clickHandler(): void {
    const event = new CustomEvent('checkout', {
      detail: {
        product: this.name,
        price: this.price,
      },
    })
    this.dispatchEvent(event)
  }

  render(): TemplateResult {
    return html`
      <button
        class="${this.classNames}"
        ?disabled="${this.disable}"
        class="nq-button"
        @click="${this.clickHandler}"
      >
        ${this.hasLabel ? this.label : this.name}
      </button>
    `
  }
}
