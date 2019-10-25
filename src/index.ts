import './polyfills'
import './components/shop'
import './components/checkout-button'
import {
  ShopConfiguartion,
  Product,
  CheckoutOptions,
  Order,
} from './types/shop'
import { Storage } from './storage'

export class Shop {
  private configuration: ShopConfiguartion
  private hubApi: HubApi
  private storage: Storage

  constructor(configuration: ShopConfiguartion) {
    this.configuration = configuration
    this.hubApi = new HubApi(
      configuration.hubUrl
        ? configuration.hubUrl
        : `https://hub.nimiq${configuration.live ? '' : '-testnet'}.com`,
    )
    this.storage = new Storage(
      configuration.id,
      configuration.live,
      configuration.live,
    )
  }

  // TODO Meta data is to be freely defined by shop owner. String or Object? (will be run through JSON.stringify anyhow)
  async checkout(products: Product[], meta: string): Promise<string> {
    const price =
      products
        .map(product => product.price)
        .reduce((sum, price) => sum + price) * 1e5

    const options: CheckoutOptions = {
      appName: this.configuration.name,
      recipient: this.configuration.address,
      value: price,
      fee: this.configuration.fee,
      shopLogoUrl: this.configuration.logo,
    }

    // TODO what type is `signedTx`?
    const signedTx = await this.hubApi.checkout(options)

    const order: Order = {
      price,
      products,
      meta,
      txHash: signedTx.hash,
      timestamp: new Date().getTime(),
    }

    return await this.storage.store(order)
  }
}
