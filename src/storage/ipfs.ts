import { Order } from '../types/shop'
import { StorageBackend } from './index'

export class IpfsStorage implements StorageBackend {
  protected repository: string
  protected ipfs

  constructor(repository: string) {
    this.repository = repository
    console.warn('not implemented!')
    // TODO(svub): load IPFS
    this.ipfs = repository
  }

  store(data: Uint8Array): Promise<string> {
    console.warn('not implemented!')
    // TODO(sectore): Implementation
    return null
  }

  load(id: string): Promise<Uint8Array> {
    console.warn('not implemented!')
    // TODO(sectore): Implementation
    return null
  }

  list(): Promise<Uint8Array[]> {
    console.warn('not implemented!')
    // TODO(sectore): Implementation
    return null
  }
}
