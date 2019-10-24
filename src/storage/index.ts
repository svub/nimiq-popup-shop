import { DummyStorage } from './dummy'
import { IpfsStorage } from './ipfs'
import { Order } from '../types/shop';

export interface Storage {
    store(order: Order): Promise<string>
    load(id: string, privateKey: string): Promise<Order>
    list(privateKey: string): Promise<Order[]>
}

export class StorageProvider {
    static get(repository: string, production: boolean = (process.env.production == 'true')):Promise<Storage> {
        return production
            ? IpfsStorage.create(repository)
            : new Promise(resolve => resolve(new DummyStorage(repository)));
    }
}
