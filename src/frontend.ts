import { Shop } from './shop'
import {
  ShopConfiguration,
  Product,
  Order,
  CheckoutOptions,
} from './types/shop'
import HubApi from '@nimiq/hub-api'

export class Frontend extends Shop {
  private hubApi: HubApi

  constructor(configuration: ShopConfiguration) {
    super(configuration)
    const { hubUrl, live } = configuration

    this.hubApi = new HubApi(
      hubUrl || `https://hub.nimiq${live ? '' : '-testnet'}.com`,
    )
  }

  async checkout(products: Product[], meta: JSON): Promise<string> {
    const price = super.sum(products)

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

    return await this.storage.store(order, this.configuration.publicKey)
  }
}
