import './polyfills'
import './components/shop'
import './components/checkout-button'
import './shop'
import { Shop } from './shop'

export { Shop } from './shop'
export default Shop

// TODO(svub) tried for a while, but only this hack below worked so far!
//  The re-export needs some fixing. @sectore, please have a look if you can.
window['Shop'] = Shop
