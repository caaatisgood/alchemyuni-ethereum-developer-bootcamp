import { Routes, Route, Link, Outlet, useLocation } from "react-router-dom";

import BlockStream from './BlockStream'
import WalletExplorer from './WalletExplorer'

import "./Layout.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlockStream />} />
        <Route path="wallet-explorer" element={<WalletExplorer />} />
      </Route>
    </Routes>
  );
}

const Layout = () => {
  const location = useLocation()

  return (
    <>
      <div className="layout-header">
        <h1>Block Explorer</h1>
        <p><small>Week 3 assignment of Ethereum Developer Bootcamp by Alchemy University</small></p>
      </div>
      <nav className="layout-nav">
        <li>
          <Link className={location.pathname === "/" ? "active" : ""} to="/">Block Stream</Link>
        </li>
        <li>
          <Link className={location.pathname === "/wallet-explorer" ? "active" : ""} to="/wallet-explorer">Wallet explorer</Link>
        </li>
      </nav>
      <Outlet />
    </>
  )
}

export default App;
