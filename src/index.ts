import './polyfills'
import './components/shop'
import './components/checkout-button'
import './shop'
import { Shop } from './shop'

// Shop.doSomething(Math.random())

export { Shop } from './shop'
console.log('################')
export default Shop

// only this one works so far! :(
window['Shop'] = Shop
