import { Transaction } from '../types/shop'

async function getLatestTransactions(
  lastTxHash: string,
): Promise<Transaction[]> {
  const page = 50
  const newTx: Transaction[] = []
  let skip = 0
  while (skip < 1000) {
    const url = `http://api.nimiq.watch/account-transactions/${this.configuration.address}/${page}/${skip}`
    const newTx: Transaction[] = await (await fetch(url)).json()
    for (const tx of newTx) {
      if (tx.hash == lastTxHash) break

      this.cacheTransaction(tx)
      newTx.push(tx)
    }
    skip += page
  }
  return newTx.sort((a, b) => a.timestamp - b.timestamp)
}
