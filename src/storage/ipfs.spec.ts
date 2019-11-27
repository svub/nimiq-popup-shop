import { IpfsStorage } from './ipfs'

const repository = 'test-repo'
let storage: IpfsStorage

describe('storage', () => {
  beforeEach(function() {
    storage = new IpfsStorage(repository)
  })

  it('store and load file', async () => {
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()
    const message = 'Test message'
    const data = encoder.encode(message)

    const id = await storage.store(data)
    console.log(id)
    const data2 = await storage.load(id)
    console.log(data2)
    const message2 = decoder.decode(data2)
    console.log(message2)

    expect(message).toEqual(message2)
  })
})
