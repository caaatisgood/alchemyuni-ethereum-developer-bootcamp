import { useState, useEffect } from "react"

import alchemy from "./utils/alchemy"

export const useBlockTransactions = (blockNumber) => {
  const [blockNumbers, setBlockNumbers] = useState([])
  const [blockMap, setBlockMap] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!blockNumber) return

    setBlockNumbers(bns => {
      if (!bns.includes(blockNumber)) {
        bns.unshift(blockNumber)
      }
      return bns
    })

    ;(async () => {
      setIsLoading(true)
      const blockWithTransactions = await alchemy.core.getBlockWithTransactions(blockNumber)
      setBlockMap(bm => ({
        ...bm,
        [blockNumber]: blockWithTransactions,
      }))
      setIsLoading(false)
    })()
  }, [blockNumber])

  return {
    isLoading,
    blockNumbers,
    blockWithTransactionsMap: blockMap,
  }
}

export const useTransactionReceipt = (hash) => {
  const [isLoading, setIsLoading] = useState(false)
  const [receipt, setReceipt] = useState()
  
  useEffect(() => {
    if (receipt || isLoading || !hash) {
      return
    }
    ;(async () => {
      setIsLoading(true)
      setReceipt(await alchemy.core.getTransactionReceipt(hash))
      setIsLoading(false)
    })()
  }, [hash, isLoading, receipt])

  return {
    isLoading,
    receipt,
  }
}
