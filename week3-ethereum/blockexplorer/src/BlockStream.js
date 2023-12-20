import { useCallback, useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk'

import alchemy from './utils/alchemy'
import { useBlockTransactions, useTransactionReceipt } from './hooks'

import './BlockStream.css';

function BlockStream() {
  const [blockNumber, setBlockNumber] = useState();
  const {
    blockNumbers,
    blockWithTransactionsMap,
  } = useBlockTransactions(blockNumber)

  const getBlockNumber = useCallback(async () => {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }, [])

  useEffect(() => {
    if (blockNumber) return
    getBlockNumber()
  }, [getBlockNumber, blockNumber])

  useEffect(() => {
    const timer = setInterval(() => getBlockNumber(), 12000);
    return () => clearInterval(timer)
  }, [getBlockNumber]);

  return (
    <div>
      <p className="page-title">Ethereum Block Stream</p>
      <div className="blocks">
        {blockNumbers.map(blockNumber => {
          return (
            <Block
              key={blockNumber}
              blockNumber={blockNumber}
              blockInfo={blockWithTransactionsMap[blockNumber]}
            />
          )
        })}
      </div>
    </div>
  );
}

const Block = ({ blockNumber, blockInfo }) => {
  const [expanded, setExpanded] = useState(false)

  if (!blockInfo) {
    return (
      <div key={blockNumber} className='block'>
        <div>
          <p>Block Number: {blockNumber}</p>
        </div>
        loading...
      </div>
    )
  }

  return(
    <div key={blockNumber} className='block'>
      <div className='title'>
        <p>Block Number: {blockNumber}</p>
      </div>
      <div className="block-info">
        <p>hash: <code>{blockInfo.hash}</code></p>
        <p>transactionCount: {blockInfo.transactions.length}</p>
        <p>timestamp: {new Date(blockInfo.timestamp * 1000).toUTCString()}</p>
        <button onClick={() => {
          setExpanded(state => !state)
        }}>{expanded ? "hide txs" : "show txs"}</button>
        {expanded ? (
          <div className="txs">
            {blockInfo.transactions.map(tx => (
              <Tx key={tx.transactionIndex} tx={tx} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

const Tx = ({ tx }) => {
  const [expanded, setExpanded] = useState(false)

  const {
    isLoading,
    receipt,
  } = useTransactionReceipt(expanded ? tx.hash : null)

  return (
    <div className="tx">
      <h4>tx index: {tx.transactionIndex}</h4>
      <p>from: <code>{tx.from}</code> to: <code>{tx.to}</code></p>
      <p>value: <code>{Utils.formatEther(tx.value)}</code></p>
      <button onClick={() => {
        setExpanded(state => !state)
      }}>{expanded ? "hide receipt" : "show receipt"}</button>
      {expanded ? (
        <div className="receipt">
          {isLoading ? "loading receipt..." : (
            receipt ? (
              <div className="content">
                <code>{JSON.stringify(receipt, null, 2)}</code>
              </div>
            ): null
          )}
        </div>
      ) : null}
    </div>
  )
}

export default BlockStream;
