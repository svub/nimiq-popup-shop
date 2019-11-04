import { ShopConfiguration, Product } from './types/shop'
import { Storage } from './storage'

export class Shop {
  protected configuration: ShopConfiguration
  protected storage: Storage

  constructor(configuration: ShopConfiguration) {
    const { id, live } = configuration

    this.configuration = configuration
    this.storage = new Storage(id, live, live)
  }

  protected sum(products: Product[]): number {
    return (
      products
        .map(product => product.price)
        .reduce((sum, price) => sum + price) * 1e5
    )
  }
}
