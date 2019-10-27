import { StorageBackend } from './index'

export class DummyStorage implements StorageBackend {
  protected repository: string
  protected namespace: string

  constructor(repository: string) {
    this.repository = repository
    this.namespace = `dummy-${this.repository}`
  }

  protected _id(id: string): string {
    return `${this.namespace}-${id}`
  }

  async store(data: Uint8Array): Promise<string> {
    const id = Math.floor(Math.random() * 10e10).toString(16)
    localStorage.setItem(this._id(id), this.encode(data))
    // return new Promise(resolve => resolve(id));
    return id
  }

  async load(id: string): Promise<Uint8Array> {
    // return new Promise((resolve, reject) => {
    //   const data: string = localStorage.getItem(this._id(id))
    //   if (data != null) {
    //     resolve(this.decode(data))
    //   } else {
    //     reject(`Order with id ${id} not found in storage`)
    //   }
    // });
    const data: string = localStorage.getItem(this._id(id))
    if (data == null) {
      throw new Error(`Order with id ${id} not found in storage`)
    }
    return this.decode(data)
  }

  async list(): Promise<Uint8Array[]> {
    const entries: Uint8Array[] = []
    // TODO(svub): is there a more elegant way?
    for (let x = 0; x < localStorage.length; x++) {
      const key = localStorage.key(x)
      if (key.startsWith(this.namespace)) {
        entries.push(this.decode(localStorage.getItem(key)))
      }
    }
    return entries
  }

  private decode(data: string): Uint8Array {
    return new Uint8Array(JSON.parse(data))
  }

  private encode(data: Uint8Array): string {
    return JSON.stringify(Array.from(data))
  }
}
