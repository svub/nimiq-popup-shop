export type Product = {
  name: string
  price: number
}

export type Order = {
  products: Product[]
  meta?: JSON
  timestamp: number
}

export enum OrderProcessState {
  paid,
  done,
  underFunded,
}

export type OrderProcess = {
  order: Order
  txHash: string // HEX
  state: OrderProcessState
}

// https://github.com/nimiq/hub/blob/master/docs/api-methods/10_checkout.md#request
export type CheckoutOptions = {
  appName: string
  recipient: string // user friendly address
  value: number
  shopLogoUrl?: string
  fee?: number
  extraData?: string | Uint8Array
}

export type ShopConfiguration = {
  address: string
  name: string
  logo?: string
  id: string
  publicKey: JsonWebKey
  fee?: number
  hubUrl?: string
  live?: boolean
  force?: {
    // force feature when not "live" (for testing mostly)
    ipfs?: boolean
    mainnet?: boolean
    encryption?: boolean
  }
}

export type ShopCrypto = {
  publicKey: JsonWebKey
  privateKey: JsonWebKey
  id: string
}

export type Transaction = {
  timestamp: number
  block_height: number
  hash: string
  sender_address: string
  receiver_address: string
  value: number
  fee: number
}
