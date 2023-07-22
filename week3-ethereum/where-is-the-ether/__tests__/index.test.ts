import { assert } from 'chai'
import { Wallet, BrowserProvider, parseEther } from 'ethers'

import { PRIVATE_KEY, ganacheProvider } from '../src/config'
import findEther from '../src/findEther'

const FROM_ADDRESS = '0x5409ED021D9299bf6814279A6A1411A7e866A631'
const provider = new BrowserProvider(ganacheProvider)
const wallet = new Wallet(PRIVATE_KEY, provider)

const stopMiner = () => ganacheProvider.request({ method: 'miner_stop', params: [] })
const mineBlock = () => ganacheProvider.request({ method: 'evm_mine', params: [] })

describe('findEther', () => {
  const expected = []

  const sendEther = async (i) => {
    const address = Wallet.createRandom().address
    await wallet.sendTransaction({
      value: parseEther('.5'),
      to: address,
      nonce: i,
    })
    expected.push(address)
  }

  before(async () => {
    await stopMiner()
    let i = 0
    // block 1
    for (; i < 3; i++) await sendEther(i)
    await mineBlock()
    // block 2
    for (; i < 7; i++) await sendEther(i)
    await mineBlock()
    // block 3
    for (; i < 10; i++) await sendEther(i)
    await mineBlock()
  })

  it('should find all the addresses', async () => {
    const actual = await findEther(FROM_ADDRESS)
    const err = `Sent ether to ${expected.length} addresses, you returned ${actual.length}`
    assert.equal(actual.length, expected.length, err)
    assert.sameMembers(actual, expected)
  })
})
