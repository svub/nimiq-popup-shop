import { StorageBackend } from './index'
import { Buffer } from 'buffer'
import Ipfs from 'ipfs'

export class IpfsStorage implements StorageBackend {
  protected repository: string
  protected ipfs = Ipfs.createNode(null)

  constructor(repository: string) {
    this.repository = repository
  }

  async store(data: Uint8Array): Promise<string> {
    // @ts-ignore seems types are not up-to-date with the JS
    const orderId = (await this.ipfs.add(Buffer.from(data)))[0].hash
    return orderId
  }

  async load(id: string): Promise<Uint8Array> {
    console.log(`IPFS online ${this.ipfs.isOnline()}`)
    // @ts-ignore seems types are not up-to-date with the JS
    const buffer: Buffer = await this.ipfs.cat(id)
    console.log(buffer.toString('utf8'))
    return new Uint8Array(buffer)
  }

  async list(): Promise<Uint8Array[]> {
    console.warn('not implemented!')
    // TODO(sectore): Implementation
    return null
  }
}
