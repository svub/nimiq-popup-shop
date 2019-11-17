import { Shop } from './shop'
import {
  ShopConfiguration,
  Product,
  Order,
  CheckoutOptions,
  OrderReceipt,
} from './types/shop'
import HubApi from '@nimiq/hub-api'

const encoder = new TextEncoder()

export class Frontend extends Shop {
  private hubApi: HubApi

  constructor(configuration: ShopConfiguration) {
    super(configuration)
    const { hubUrl, live } = configuration

    this.hubApi = new HubApi(
      hubUrl || `https://hub.nimiq${live ? '' : '-testnet'}.com`,
    )
  }

  async checkout(products: Product[], meta: JSON): Promise<OrderReceipt> {
    const sum = super.sumUp(products)

    const orderId = await this.order(products, meta)
    const txHash = await this.pay(orderId, sum)

    return { products, sum, orderId, txHash }
  }

  private async pay(
    orderId: string,
    price: number,
  ): Promise<HubApi.SignedTransaction> {
    const { name, address, fee, logo } = this.configuration
    const options: CheckoutOptions = {
      appName: name,
      recipient: address,
      value: price * 1e5,
      extraData: encoder.encode(orderId),
      fee,
      shopLogoUrl: logo,
    }
    return await this.hubApi.checkout(options)
  }

  private async order(products: Product[], meta: JSON): Promise<string> {
    const order: Order = {
      products,
      meta,
      timestamp: new Date().getTime(),
    }

    return await this.storage.store(order, this.configuration.publicKey)
  }
}
