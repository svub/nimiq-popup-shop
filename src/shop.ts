import {
  ShopConfiguartion,
  Product,
  CheckoutOptions,
  Order,
} from './types/shop'
import { Storage } from './storage'
import HubApi from '@nimiq/hub-api'
// TODO(svub) Is there a clean way to import this type: https://github.com/nimiq/hub/blob/574adcf5880c150b7b9d3cb016aeea78034c1316/src/lib/PublicRequestTypes.ts#L44 ?
import { SignedTransaction } from '@nimiq/hub-api/dist/src/src/lib/PublicRequestTypes'

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

  // TODO(svub) Q: Meta data is to be freely defined by shop owner. String or Object? (will be run through JSON.stringify anyhow)
  async checkout(products: Product[], meta: string): Promise<string> {
    const price =
      products
        .map(product => product.price)
        .reduce((sum, price) => sum + price) * 1e5

    const signedTx = await this.pay(price)
    const orderId = await this.order(products, meta, signedTx)

    return orderId
  }

  private async pay(price: number): Promise<SignedTransaction> {
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
    meta: string,
    signedTx: SignedTransaction,
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
