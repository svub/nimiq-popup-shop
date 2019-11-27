import { Shop } from '../shop'
import {
  ShopConfiguration,
  ShopCrypto,
  OrderProcess,
  OrderProcessState,
} from '../types/shop'
import { WebCrypto } from '../storage/encryption/webcrypto'
import Nimiq from '@nimiq/core-web'

const decoder = new TextDecoder()

export class Backend extends Shop {
  private nimiq
  private privateKey: JsonWebKey
  private wasmLocation: string

  // TODO(svub) import and export order and TX history

  constructor(configuration: ShopConfiguration, privateKey: JsonWebKey, wasm: string = location.origin + '/backend/wasm/') {
    super(configuration)
    this.privateKey =
      typeof privateKey == 'string' ? JSON.parse(privateKey) : privateKey
    this.nimiq = new Promise<Nimiq.Client>(resolve =>
      this.loadNimiq(wasm).then(resolve),
    )
  }

  async sync(): Promise<void> {
    // const knownTx = this.list().map(process => process.txHash)
    const newTx = await this.getLatestTransactions()

    const newOrders: OrderProcess[] = await Promise.all(
      newTx
        .filter(
          tx =>
            // !knownTx.includes(tx.transactionHash.toHex()) &&
            tx.data && tx.data.raw.length > 0,
        )
        .map(async tx => {
          // example: QmbThHLUV4gfw2DHubf7xA1oumv8N7TphtpEJeonBjR4jY
          const orderId = decoder.decode(tx.data.raw)
          try {
            const order = await this.storage.load(orderId, this.privateKey)
            return {
              order,
              txHash: tx.transactionHash.toHex(),
              state:
                this.sumUp(order.products) * 1e5 > tx.value
                  ? OrderProcessState.underFunded
                  : OrderProcessState.paid,
            }
          } catch (e) {
            if (e.message == 'Non-base58 character') {
              console.warn(
                `Invalid order ID ${orderId} in TX ${tx.transactionHash.toHex()}`,
              )
            } else {
              if (e.code == 0 && e.name == 'OperationError') {
                console.warn(
                  `Failed decrypting order ${orderId} for TX ${tx.transactionHash.toHex()}`,
                )
              } else {
                console.warn(
                  `No order found for ${orderId} from TX ${tx.transactionHash.toHex()}`,
                )
                console.log(e)
              }
            }
          }
        }),
    )

    this.addOrders(newOrders.filter(order => !!order))
  }

  async getLatestTransactions(): Promise<Nimiq.Client.TransactionDetails[]> {
    const nimiq = await this.nimiq
    const lastTx: string = localStorage.lastTx
    const latestTx: Nimiq.Client.TransactionDetails[] = await nimiq.getTransactionsByAddress(
      this.configuration.address,
    )

    const x = latestTx.sort((a, b) => a.timestamp - b.timestamp)
    console.log(x)
    const i = x.findIndex(tx => tx.transactionHash.toHex() == lastTx)
    console.log(i)
    console.log(x.slice(0, Math.max(i, 0)))

    const newTx = latestTx
      .sort((a, b) => a.timestamp - b.timestamp) // old .. new
      .slice(latestTx.findIndex(tx => tx.transactionHash.toHex() == lastTx) + 1)
    // eslint-disable-next-line
    if (newTx.length > 0)
      localStorage.lastTx = newTx[newTx.length - 1].transactionHash.toHex()

    return newTx
  }

  private async loadNimiq(wasmLocation): Promise<Nimiq.Client> {
    // @ts-ignore parameter exists but missing in type definition, PR submitted
    await Nimiq.load(wasmLocation)
    this.configuration.live || this.configuration.force.mainnet
      ? Nimiq.GenesisConfig.main()
      : Nimiq.GenesisConfig.test()
    const nimiq = Nimiq.Client.Configuration.builder().instantiateClient()
    await nimiq.waitForConsensusEstablished()
    return nimiq
  }

  list(): OrderProcess[] {
    return JSON.parse(localStorage.orders || '[]')
  }

  clearCache(): void {
    localStorage.orders = []
  }

  private addOrders(orders: OrderProcess[]): void {
    localStorage.orders = JSON.stringify([...this.list(), ...orders])
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
  }
}
