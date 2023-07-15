import { BalanceMap } from './types'

const Wallet: React.FC<{ balanceMap: BalanceMap | undefined }> = ({ balanceMap }) => {
  return (
    <div className="container wallet">
      <h1>Balances</h1>

      <div className="balance">
        <code style={{ whiteSpace: "pre", overflow: "scroll" }}>
          {balanceMap && JSON.stringify(balanceMap, null, 2)}
        </code>
      </div>
    </div>
  );
}

export default Wallet;
