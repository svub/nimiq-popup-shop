import { DummyStorage } from './dummy'
import { IpfsStorage } from './ipfs'
import { Order } from '../types/shop'
import { WebCrypto } from './encryption/webcrypto'
import { DummyEncryption } from './encryption/dummy'

export interface StorageBackend {
  store(data: Uint8Array): Promise<string>
  load(id: string): Promise<Uint8Array>
  list(): Promise<Uint8Array[]>
}

export interface Encryption {
  encrypt(data: Uint8Array, publicKey: JsonWebKey): Promise<Uint8Array>
  decrypt(data: Uint8Array, privateKey: JsonWebKey): Promise<Uint8Array>
}

export class Storage {
  private backend: StorageBackend
  private encryption: Encryption

  constructor(
    repository: string,
    production: boolean = process.env.production == 'true',
    encryption: boolean = production,
  ) {
    this.backend = production
      ? new IpfsStorage(repository)
      : new DummyStorage(repository)
    this.encryption = encryption ? new WebCrypto() : new DummyEncryption()
  }

  async store(order: Order, publicKey?: JsonWebKey): Promise<string> {
    return this.backend.store(
      await this.encryption.encrypt(this.encode(order), publicKey),
    )
  }
  async load(id: string, privateKey?: JsonWebKey): Promise<Order> {
    return this.decode(
      await this.encryption.decrypt(await this.backend.load(id), privateKey),
    )
  }
  async list(privateKey?: JsonWebKey): Promise<Order[]> {
    return Promise.all(
      (await this.backend.list()).map(async data =>
        // TODO(svub) Optimization: parse and import pk only once and reuse it. Performance impact unknown.
        this.decode(await this.encryption.decrypt(data, privateKey)),
      ),
    )
  }

  private encoder = new TextEncoder()
  private decoder = new TextDecoder()

  encode(order: Order): Uint8Array {
    return this.encoder.encode(JSON.stringify(order))
  }

  decode(data: Uint8Array): Order {
    return JSON.parse(this.decoder.decode(data))
  }
}
