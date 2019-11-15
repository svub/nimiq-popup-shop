import { ShopConfiguration, Product } from './types/shop'
import { Storage } from './storage'

export class Shop {
  protected configuration: ShopConfiguration
  protected storage: Storage

  constructor(configuration: ShopConfiguration) {
    const { id, live, force } = configuration

    try {
      new URL(configuration.logo)
    } catch (e) {
      configuration.logo = location + configuration.logo
    }
    this.configuration = configuration
    this.storage = new Storage(id, live || force.ipfs, live || force.encryption )
  }

  sumUp(products: Product[]): number {
    return products
      .map(product => product.price)
      .reduce((sum, price) => sum + price, 0)
  }
}
