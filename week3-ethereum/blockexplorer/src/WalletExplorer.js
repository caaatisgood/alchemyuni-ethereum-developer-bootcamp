import { useState } from 'react';
import { Utils } from 'alchemy-sdk'

import alchemy from './utils/alchemy';

import "./WalletExplorer.css"

const WalletExplorer = () => {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState()

  const _handleChangeAddress = (evt) => {
    setAddress(evt.target.value)
  }

  const _handleSearch = async (evt) => {
    evt.preventDefault()
    setBalance()
    setBalance(await alchemy.core.getBalance(address))
  }

  return (
    <div>
      <p className="page-title">Wallet Explorer</p>
      <form className="search-form" onSubmit={_handleSearch}>
        <input
          autoFocus
          name="walletAddress"
          placeholder="vitalik.eth"
          value={address}
          onChange={_handleChangeAddress}
        />&nbsp;
        <button type="submit">search</button>
      </form>
      {
        balance !== undefined ? (
          <div>
            <p>balance of <code>{address}</code>: {Utils.formatEther(balance)}</p>
          </div>
        ) : null
      }
    </div>
  );
};

export default WalletExplorer;
