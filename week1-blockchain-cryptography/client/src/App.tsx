import { useCallback, useEffect, useState } from 'react'

import "./App.scss";
import request from './request'
import Wallet from "./Wallet";
import Transfer from "./Transfer";
import { BalanceMap } from './types'

function App() {
  const [balanceMap, setBalanceMap] = useState<BalanceMap>()

  const _fetchBalances = useCallback(() => {
    request
      .get<BalanceMap>('/api/balances')
      .then(({ data }) => {
        setBalanceMap(data)
      })
  }, [])

  useEffect(() => {
    _fetchBalances();
  }, [_fetchBalances])

  return (
    <div className="app">
      <Wallet balanceMap={balanceMap} />
      <Transfer
        onTransferred={_fetchBalances}
      />
    </div>
  );
}

export default App;
