import { Storage } from '.'
import { Order } from '../types/shop'

const order: Order = {
  price: 1,
  meta: null,
  products: [],
  timestamp: new Date().getMilliseconds(),
  txHash: 'TX hash',
}

describe('storage', () => {
  it('encode/decode 0rder', async () => {
    const storage = new Storage('test', false, false)

    expect(storage.decode(storage.encode(order))).toEqual(order)
  })

  it('store, load and list', async () => {
    const storage = new Storage('test', false, false)

    const id = await storage.store(order)

    expect(localStorage.length == 1)
    expect(localStorage.key(0).indexOf(id)).toBeGreaterThan(-1)
    expect(await storage.load(id)).toEqual(order)

    const orders:Order[] = await storage.list()

    expect(orders.length == 1)
    expect(orders[0]).toEqual(order)
  })
})
