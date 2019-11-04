import { Shop } from '../shop'
import { ShopConfiguration, ShopCrypto, Order } from '../types/shop'
import { WebCrypto } from '../storage/encryption/webcrypto'
import Nimiq, { Client } from '@nimiq/core-web'

const decoder: TextDecoder = new TextDecoder()

export class Backend extends Shop {
  async list(privateKey: JsonWebKey): Promise<Order[]> {
    return this.storage.list(privateKey)
  }

  async bs(privateKey: JsonWebKey): Promise<void> {
    if (this.configuration.live) Nimiq.GenesisConfig.main()
    else {
      Nimiq.GenesisConfig.test()
    }
    const nimiq = Nimiq.Client.Configuration.builder().instantiateClient()
    nimiq.addTransactionListener(
      async (transaction: Client.TransactionDetails) => {
        const orderId = decoder.decode(transaction.data.raw)
        const order = await super.storage.load(orderId, privateKey)
        const correct = order.products.map(product => product.price).
      },
      [this.configuration.address],
    )
  }

  static async generateCrypto(): Promise<ShopCrypto> {
    const crypto = new WebCrypto()
    const pair = await crypto.generateKeyPair()

    const privateKey = await crypto.exportKey(pair.privateKey)
    const publicKey = await crypto.exportKey(pair.publicKey)
    const id = await crypto.hash(publicKey.n)

    return { privateKey, publicKey, id }
  }

  static generateConfiguration(
    publicKey: JsonWebKey,
    id: string,
  ): ShopConfiguration {
    return {
      name:
        'A name for your shop - customers will see this during the payment - short and easy to recognize',
      address: 'Your Nimiq address to receive payments on',
      logo:
        'URL of a 128x128px PNG file showing the logo of your shop on transparent background (optional)',
      live: false,
      id,
      publicKey,
    }
    return
  }
}
