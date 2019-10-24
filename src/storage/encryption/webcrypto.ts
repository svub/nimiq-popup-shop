import { Encryption } from "..";

export class WebCrypto implements Encryption {
    encrypt(data: Uint8Array): Promise<Uint8Array> {
        throw new Error("Method not implemented.");
    }
    decrypt(data: Uint8Array): Promise<Uint8Array> {
        throw new Error("Method not implemented.");
    }




}
