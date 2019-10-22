export type Product = {
  name: string,
  price: Nimiq.Transaction
}

export type OrderMeta = {
  sender: Nimiq.Address
}

export type Order = {
  price: Number,
  products: Product[],
  meta: OrderMeta,
  txHash: string, // HEX
  timestamp: number
}

// https://github.com/nimiq/hub/blob/master/docs/api-methods/10_checkout.md#request
export type CheckoutOptions = {
  appName: string,
  recipient: string // user friendly address
  value: number,
  shopLogoUrl?: string
  fee?: number,
  extraData?: string
}
