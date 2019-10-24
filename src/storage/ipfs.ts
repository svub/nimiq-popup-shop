import { Order } from "../types/shop"
import { Storage } from './index'

export class IpfsStorage implements Storage {

  protected repository: string;
  protected ipfs: Object;

  constructor(repository: string) {
    this.repository = repository;
    console.warn('not implemented!');
    // TODO(svub): load IPFS
    this.ipfs =  repository;
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
