import config from '../config.js';
//import Ipfs from 'https://unpkg.com/ipfs/dist/index.js';
// import { IPFS } from 'https://unpkg.com/ipfs';

// const { Buffer } = Ipfs;

export default class IpfsStorage {

    constructor(repo) {
        this.repo = repo;
        // ipfs = new Ipfs({ repo: repoPath })
        this.ipfs = new Ipfs();
    }

    static async create(repo) {
        const ipfs = new IpfsStorage(repo);
        return new Promise((resolve, reject) => {
            ipfs.ipfs.on('ready', () => resolve(ipfs));
        });
    }

    store(data) {
        console.warn('not implemented!');
        return '';
    }
    load(id) {
        console.warn('not implemented!');
        return null;
    }
    list() {
        console.warn('not implemented!');
        return [];
    }
}
