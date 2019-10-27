import {
  ShopConfiguartion,
  Product,
  CheckoutOptions,
  Order,
} from './types/shop'
import { Storage } from './storage'
import HubApi from '@nimiq/hub-api'

export class Shop {
  private configuration: ShopConfiguartion
  private hubApi: HubApi
  private storage: Storage

  constructor(configuration: ShopConfiguartion) {
    const { hubUrl, id, live } = configuration

    this.configuration = configuration
    this.storage = new Storage(id, live, live)
    this.hubApi = new HubApi(
      hubUrl || `https://hub.nimiq${live ? '' : '-testnet'}.com`,
    )
  }

  async checkout(products: Product[], meta: JSON): Promise<string> {
    const price =
      products
        .map(product => product.price)
        .reduce((sum, price) => sum + price) * 1e5

    const signedTx = await this.pay(price)
    const orderId = await this.order(products, meta, signedTx)

    return orderId
  }

  private async pay(price: number): Promise<HubApi.SignedTransaction> {
    const { name, address, fee, logo } = this.configuration
    const options: CheckoutOptions = {
      appName: name,
      recipient: address,
      value: price,
      fee,
      shopLogoUrl: logo,
    }
    return await this.hubApi.checkout(options)
  }

  private async order(
    products: Product[],
    meta: JSON,
    signedTx: HubApi.SignedTransaction,
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
