import { Order } from "../types/shop"
import { Storage } from './index'

export class IpfsStorage implements Storage {

  protected repository: string;
  protected ipfs: Object;

  private constructor(repository: string) {
    this.repository = repository;
    console.warn('not implemented!');
    // TODO(svub): add IPFS
    this.ipfs =  repository;
  }

  static async create(repo) {
    const storage = new IpfsStorage(repo);
    return new Promise<IpfsStorage>((resolve, reject) => {
        // TODO(svub): add IPFS
        // storage.ipfs.on('ready', () => resolve(storage));
        resolve(storage);
    });
  }

  store(order: Order): Promise<string> {
    console.warn('not implemented!');
    // TODO(sectore): Implementation
    return null
  }

  load(id: string, privateKey: string): Promise<Order> {
    console.warn('not implemented!');
    // TODO(sectore): Implementation
    return null
  }

  list(privateKey: string): Promise<Order[]> {
    console.warn('not implemented!');
    // TODO(sectore): Implementation
    return null
  }
}
