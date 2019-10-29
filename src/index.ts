import './polyfills'
import './components/shop'
import './components/checkout-button'
import './shop'
import { Shop } from './shop'

// Tried for a while to get the re-export working, but only the hack at the bottom worked so far!
// TODO(svub) The re-export needs to be fixed. @sectore, please have a look if you can.

// export { Shop } from './shop'
// export default Shop

window['Shop'] = Shop
