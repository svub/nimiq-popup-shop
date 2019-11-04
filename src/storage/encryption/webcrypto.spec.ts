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
  }),
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
})
