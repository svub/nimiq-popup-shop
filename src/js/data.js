import config from '../config.js';
import Crypto from './crypto.js';

export default class Data {

    constructor(config, storage) {
        this.config = config;
        this.storage = storage;
    }

    // async _store(value, collection = "orders") {
    //     return (await Postcard.database.collection(collection).add(value)).id;
    // }

    // async _load(collection) {
    //     await Postcard.database.collection(collection).get();
    // }

    async store(order) {
        const encrypted = await Crypto.encryptObject(order);
        return await this.storage.store(encrypted);
    }

    async list(privateKey) {
        const encrypted = await this.storage.list();
        return encrypted.map(async order => await Crypto.decryptObject(order, privateKey));
    }
}
