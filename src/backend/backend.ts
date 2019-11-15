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
  private nimiq = new Promise<Nimiq.Client>(resolve =>
    this.loadNimiq().then(resolve),
  )

  // TODO(svub) import and export order and TX history

  async sync(privateKey: JsonWebKey): Promise<void> {
    const newTx = await this.getLatestTransactions()

    const newOrders: OrderProcess[] = await Promise.all(
      newTx
        .filter(tx => tx.data && tx.data.raw.length > 0)
        .map(async tx => {
          // example: QmbThHLUV4gfw2DHubf7xA1oumv8N7TphtpEJeonBjR4jY
          const orderId = decoder.decode(tx.data.raw)
          try {
            const order = await this.storage.load(orderId, privateKey)
            return {
              order,
              txHash: tx.transactionHash.toHex(),
              state:
                this.sumUp(order.products) * 1e5 > tx.value
                  ? OrderProcessState.underFunded
                  : OrderProcessState.paid,
            }
          } catch (e) {
            console.warn(
              `No order found for ${orderId} from tx ${tx.transactionHash.toHex()}`,
            )
          }
        }),
    )

    this.addOrders(newOrders.filter(order => !!order))
  }

  async getLatestTransactions(): Promise<Nimiq.Client.TransactionDetails[]> {
    const nimiq = await this.nimiq
    const lastTx: Nimiq.Client.TransactionDetails = JSON.parse(
      localStorage.lastTx || 0,
    ) || { transactionHash: undefined }
    const newTx: Nimiq.Client.TransactionDetails[] = await nimiq.getTransactionsByAddress(
      this.configuration.address,
    )

    newTx
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(
        newTx.findIndex(tx => tx.transactionHash == lastTx.transactionHash),
      )
    // eslint-disable-next-line
    localStorage.lastTx = JSON.stringify(newTx[newTx.length - 1])

    return newTx
  }

  private async loadNimiq(): Promise<Nimiq.Client> {
    // @ts-ignore parameter exists but missing in type definition, PR submitted
    await Nimiq.load(location.origin + '/backend/wasm/')
    this.configuration.live
      ? Nimiq.GenesisConfig.main()
      : Nimiq.GenesisConfig.test()
    const nimiq = Nimiq.Client.Configuration.builder().instantiateClient()
    await nimiq.waitForConsensusEstablished()
    return nimiq
  }

  list(): OrderProcess[] {
    return JSON.parse(localStorage.orders || '[]')
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
