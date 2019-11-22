import { WebCrypto } from './webcrypto'
import { Backend } from '../../backend/backend'
const encoder = new TextEncoder()
const decoder = new TextDecoder()

const message = 'secret'

describe('crypto', () => {
  it('generating shop crypto', async () => {
    const crypto = new WebCrypto()

    const { privateKey, publicKey, id } = await Backend.generateCrypto()

    expect(privateKey.n).toEqual(publicKey.n)
    expect(id).toEqual(await crypto.hash(publicKey.n))
  })
  it('roundtrip: encrypt/decrypt string', async () => {
    const crypto = new WebCrypto()
    const { privateKey, publicKey } = await Backend.generateCrypto()

    const data = new Uint8Array(encoder.encode(message))
    const encrypted = await crypto.encrypt(data, publicKey)

    const decrypted = await crypto.decrypt(encrypted, privateKey)
    const message2 = decoder.decode(decrypted.buffer)

    expect(encrypted).not.toEqual(decrypted)
    expect(message2).toBe(message)
  })
  it('hashing', async () => {
    const crypto = new WebCrypto()

    const hash1 = await crypto.hash('text1')
    const hash2 = await crypto.hash('text2')
    const hash3 = await crypto.hash('text1')

    // expecting something like NXjrr9G94YjFX5Udn34+/KuIFzy32OeGU7RPiXDd7p8=
    expect(typeof hash1).toEqual('string')
    expect(hash1.length).toEqual(44)
    expect(hash2.length).toEqual(44)
    expect(hash1).not.toEqual(hash2)
    expect(hash1).toEqual(hash3)
  })
})
