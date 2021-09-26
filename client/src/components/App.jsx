import React, { useEffect, useState } from "react";

function App() {
  const [walletInfo, setWalletInfo] = useState({ address: "", balance: "" });

  useEffect(() => {
    fetch(`${document.location.origin}/api/wallet-info`)
      .then((response) => response.json())
      .then((data) => setWalletInfo(data));
  }, []);

  const { address, balance } = walletInfo;

  return (
    <div className="app">
      <img
        className="logo"
        src="https://raw.githubusercontent.com/15Dkatz/cryptochain/master/client/src/assets/logo.png"
      />
      <br />
      <div>Welcome to the blockchain...</div>
      <br />
      <div>
        <a href="/blocks">Blocks</a>
      </div>
      <div>
        <a href="/conduct-transaction">Conduct a Transaction</a>
      </div>
      <div>
        <a href="/transaction-pool">Transaction Pool</a>
      </div>
      <br />
      <div className="wallet-info">
        <div>Address: {address}</div>
        <div>Balance: {balance}</div>
      </div>
    </div>
  );
}

export default App;
