import { NimiqShop } from "../components/shop"

export type Product = {
  name: string
  price: number
}

export type Order = {
  products: Product[]
  meta?: JSON
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

export type ShopConfiguration = {
  address: string
  name: string
  logo?: string
  id: string
  publicKey: JsonWebKey
  fee?: number
  live?: boolean
  hubUrl?: string
}

export type ShopCrypto = {
  publicKey: JsonWebKey
  privateKey: JsonWebKey
  id: string
}
