import Data from './data.js';
import config from '../config.js';
// import HubApi from '@nimiq/hub-api';
import HubApi from 'https://cdn.jsdelivr.net/npm/@nimiq/hub-api@v1.0/dist/standalone/HubApi.standalone.es.js';
import IpfsStorage from './Ipfs.storage.js';
import DummyStorage from './dummy.storage.js';


export default class Shop {

    constructor() {
        // Nimiq Hub
        this.hubApi = new HubApi(config.production ? 'https://hub.nimiq.com' : 'https://hub.nimiq-testnet.com');

        // Data access
        this.storage = config.production ? new IpfsStorage() : new DummyStorage();
        this.data = new Data(config, this.storage);
    }

    async checkout(products, meta) {
        const price = products.reduce((sum, product) => sum + product.price, 0);
        const options = {
            appName: config.name,
            recipient: config.address,
            value: price * 1e5,
            fee: config.fee,
            shopLogoUrl: config.shopLogoUrl,
        };
        const signedTx = await this.hubApi.checkout(options);
        console.log(signedTx);

        const order = {
            price, products, meta,
            tx: signedTx.hash,
            date: new Date().getTime(),
        };
        const id = await this.data.store(order);
        console.log(id);
    }
}
