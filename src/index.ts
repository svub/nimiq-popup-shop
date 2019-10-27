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

  // TODO(svub) Q: Meta data is to be freely defined by shop owner. String or Object? (will be run through JSON.stringify anyhow)
  async checkout(products: Product[], meta: string): string {
    const price =
      products
        .map(product => product.price)
        .reduce((sum, price) => sum + price) * 1e5

    const signedTx = await this.pay(price)
    const orderId = await this.order(products, meta, signedTx)

    return orderId
  }

  private async pay(price: number) {
    const options: CheckoutOptions = {
      appName: this.configuration.name,
      recipient: this.configuration.address,
      value: price,
      fee: this.configuration.fee,
      shopLogoUrl: this.configuration.logo,
    }
    // TODO(svub) what type is `signedTx`? (also change below)
    const signedTx = await this.hubApi.checkout(options)
    return signedTx
  }

  private async order(
    products: Product[],
    meta: string,
    signedTx: any,
  ): Promise<string> {
    const order: Order = {
      products,
      meta,
      txHash: signedTx.hash,
      timestamp: new Date().getTime(),
    }

    return await this.storage.store(order)
  }
}
