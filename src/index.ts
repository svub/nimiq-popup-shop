import './polyfills'
import './components/shop'
import './components/checkout-button'
import './shop'
import { Backend } from './admin/backend'

// Tried for a while to get the re-export working, but only the hack at the bottom worked so far!
// TODO(svub) The re-export needs to be fixed. @sectore, please have a look if you can.

// export { Backend } from './admin/backend'
// export default Backend

window['Backend'] = Backend
