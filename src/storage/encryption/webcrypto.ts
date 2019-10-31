import { Encryption } from '..'

const ALGORITHM = {
  name: 'RSA-OAEP',
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256',
}

const FORMAT = 'jwk'

const crypto: Crypto = window.crypto || window.msCrypto
const encoder = new TextEncoder()
const decoder = new TextDecoder()

export class WebCrypto implements Encryption {
  async encrypt(data: Uint8Array, publicKey: JsonWebKey): Promise<Uint8Array> {
    const key = await this.importKey(publicKey)
    const encrypted = await crypto.subtle.encrypt(ALGORITHM, key, data)
    return new Uint8Array(encrypted)
  }

  async decrypt(data: Uint8Array, privateKey: JsonWebKey): Promise<Uint8Array> {
    const key = await this.importKey(privateKey)
    const decrypted = await crypto.subtle.decrypt(ALGORITHM, key, data)
    return new Uint8Array(decrypted)
  }

  async generateKeyPair(): Promise<CryptoKeyPair> {
    return crypto.subtle.generateKey(ALGORITHM, true, ['encrypt', 'decrypt'])
  }

  async importKey(key: JsonWebKey): Promise<CryptoKey> {
    return await crypto.subtle.importKey(
      FORMAT,
      key,
      ALGORITHM,
      false,
      key.key_ops,
    )
  }

  async exportKey(key: CryptoKey): Promise<JsonWebKey> {
    return await crypto.subtle.exportKey(FORMAT, key)
  }

  async hash(s: string): Promise<string> {
    const data = encoder.encode(s)
    const hash = await crypto.subtle.digest(ALGORITHM.hash, data)
    return decoder.decode(hash)
  }
}
