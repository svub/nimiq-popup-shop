import { ALGORITHM, FORMAT } from './const.js';
import config from '../config.js';

const crypto = (window.crypto || window.msCrypto).subtle;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default class Crypto {

    static get crypto() { return crypto; }

    static async loadKey() {
        return this.key || (this.key = await Crypto.importKey(config.key));
    }

    static async loadPk() {
        // return this.pk || (this.pk = await Crypto.importKey(localStorage.privateKey));
        // return this.pk ? this.pk : this.pk = await Crypto.importKey(localStorage.privateKey);
        if (!this.pk) {
            this.pk = await Crypto.importKey(localStorage.privateKey);
        }
        return this.pk;
    }

    static async hash(string) {
        if (typeof string !== 'string') {
            string = JSON.stringify(string);
        }
        const data = encoder.encode(string);
        return await crypto.digest(ALGORITHM.hash, data);
    }

    static async encryptObject(data) {
        data = JSON.stringify(data);
        return await this.encryptString(data);
    }
    static async encryptString(data) {
        data = encoder.encode(data);
        return await this.encryptRaw(data);
    }

    static async encryptRaw(data) {
        // if (typeof data === 'string') {
        //     data = encoder.encode(data);
        // }
        const encrypted = await crypto.encrypt(ALGORITHM, await this.loadKey(), data);
        return await decoder.decode(encrypted);
    }

    static async decryptRaw(data) {
        data = encoder.encode(data);
        return await crypto.decrypt(ALGORITHM, await this.loadPk(), data);
    }

    static async decryptString(data) {
        const decrypted = await this.decryptRaw(data);
        return decoder.decode(decrypted);
    }

    static async decryptObject(data) {
        const decrypted = await this.decryptString(data);
        return JSON.parse(decrypted);
    }

    static async generateKey() {
        return await crypto.generateKey(ALGORITHM, true, ['encrypt', 'decrypt']);
    }

    static async exportKey(key) {
        const exported = await crypto.exportKey(FORMAT, key);
        return JSON.stringify(exported, null, " ");
    }

    static async importKey(key) {
        if (typeof key === 'string') {
            key = JSON.parse(key);
        }
        // return await crypto.importKey(FORMAT, key, ALGORITHM, false, ['encrypt', 'decrypt']);
        return await crypto.importKey(FORMAT, key, ALGORITHM, false, key.key_ops);
    }
}

window.nimpop.Crypto = Crypto;
