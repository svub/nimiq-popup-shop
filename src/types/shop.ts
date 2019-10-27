export type Product = {
  name: string
  price: number //TODO(svub) Q: was `Nimiq.Transaction` before. Don't understand. (?)
}

export type Order = {
  // TODO(svub) Q: price is part of product >> would consider it redudant info here (?)
  //price: number
  products: Product[]
  meta: string
  txHash: string // HEX
  timestamp: number
}

// https://github.com/nimiq/hub/blob/master/docs/api-methods/10_checkout.md#request
export type CheckoutOptions = {
  appName: string
  recipient: string // user friendly address
  value: number
  shopLogoUrl?: string
  fee?: number
  extraData?: string
}

export type ShopConfiguartion = {
  address: Nimiq.Address
  name: string
  logo?: string
  id: string
  publicKey: string
  fee?: number
  live?: boolean
  hubUrl?: string
}
