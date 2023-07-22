import { BrowserProvider } from 'ethers'

import { ganacheProvider } from './config'

const provider = new BrowserProvider(ganacheProvider)

async function findEther(address: string) {
  const addresses: string[] = []
  const blockNumber = await provider.getBlockNumber()
  for (let i = 0; i <= blockNumber; i++) {
    const block = await provider.getBlock(i, true)
    block.prefetchedTransactions.forEach((tx) => {
      if (tx.from === address) {
        addresses.push(tx.to)
      }
    })
  }
  return addresses
}

export default findEther
