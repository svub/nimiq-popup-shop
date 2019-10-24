import { encryptObject, decryptObject } from './utils/crypto';
import { Order } from './types/shop'
import { Storage } from './index'

export class DummyStorage implements Storage {

  protected repository: string;
  protected namespace: string;

  constructor(repository: string) {
    this.repository = repository;
    this.namespace = `dummy-${this.repository}`;
  }

  // TODO(sectore): Do we still need this static `create` function?
  static async create(repository: string): Promise<DummyShopStorage> {
  }

  protected _id(id: string): string {
    return `${this.namespace}-${id}`;
  }

  async store(order: Order): Promise<string> {
    const id = Math.floor(Math.random() * 10e10).toString(16);
    const encrypted = await encryptObject(order);
    localStorage.setItem(this._id(id), encrypted);
    return new Promise(resolve => resolve(id));
  }

  async load(id: string, privateKey: string): Promise<Order> {
    const order = localStorage.getItem(this._id(id))
    if (order != null) {
      return await decryptObject(order);
    } else {
      return new Promise((_, reject) => {
        reject(`Order with id ${id} not found in storage`)
      });
    }
  }

  async list(privateKey: string): Promise<Order[]> {
    let encrypted: string[] = [];
    for (let x = 0; x < localStorage.length; x++) {
      const key = localStorage.key(x);
      if (key.startsWith(this.namespace)) {
        encrypted.push(localStorage.getItem(key));
      }
    }
    // TODO(sectore) Fix types
    // return encrypted.map(
    //   async o => await decryptObject<Order>(o)
    // );
    return [];
  }
}

