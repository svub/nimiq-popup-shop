import { Shop } from '../shop'
import { ShopConfiguration, ShopCrypto, Order } from '../types/shop'
import { WebCrypto } from '../storage/encryption/webcrypto'

export class Backend extends Shop {
  async list(privateKey: JsonWebKey): Promise<Order[]> {
    return this.storage.list(privateKey)
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
