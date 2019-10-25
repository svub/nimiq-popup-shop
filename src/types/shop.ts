import { NimiqShop } from "../components/shop"

export type Product = {
  name: string
  price: Nimiq.Transaction
}

export type Order = {
  price: number
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
