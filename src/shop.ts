import { ShopConfiguration, Product } from './types/shop'
import { Storage } from './storage'

export class Shop {
  protected configuration: ShopConfiguration
  protected storage: Storage

  constructor(configuration: ShopConfiguration) {
    const { id, live } = configuration

    try {
      new URL(configuration.logo)
    } catch (e) {
      configuration.logo = location + configuration.logo
    }
    this.configuration = configuration
    this.storage = new Storage(id, live, live)
  }

  sumUp(products: Product[]): number {
    return products
      .map(product => product.price)
      .reduce((sum, price) => sum + price, 0)
  }
}
