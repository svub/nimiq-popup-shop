// Sören: I don't know what you want to export here and if that's even necessary
import './polyfills'

// Components
import { NimiqShop } from './components/shop'
import { CheckoutButton } from './components/checkout-button'

// Exports the components under the window.Components namespace
export const Components = {
    NimiqShop,
    CheckoutButton,
}

// Libraries
export { Shop } from './shop'
export { Backend } from './admin/backend'
