import { Alchemy, Network, Wallet, Utils } from 'alchemy-sdk'
import 'dotenv/config'

const TEST_API_KEY = process.env.TEST_API_KEY!
const TEST_PRIVATE_KEY = process.env.TEST_PRIVATE_KEY!

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_GOERLI,
}
const alchemy = new Alchemy(settings)

const wallet = new Wallet(TEST_PRIVATE_KEY)

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  )

  const receiverAddr = '0x043965E1C8FB1Ed7F7a3828b5CAE4D8Ef078f902'

  const tx = {
    to: receiverAddr,
    value: Utils.parseEther('0.001'), // 0.001 worth of ETH being sent
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce,
    type: 2,
    chainId: 5, // göerli transaction
  }

  const rawTx = await wallet.signTransaction(tx)
  console.log({ rawTx })
  const sentTx = await alchemy.core.sendTransaction(rawTx)
  console.log(`https://goerli.etherscan.io/tx/${sentTx.hash}`)
}

main()
