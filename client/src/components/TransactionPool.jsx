import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Transaction from "./Transaction";

const POLL_INERVAL_MS = 10000;

function TransactionPool() {
  const [transactionPoolMap, setTransactionPoolMap] = useState({});

  const history = useHistory();

  useEffect(() => {
    fetchTransactionPoolMap();

    const fetchPoolMapInterval = setInterval(
      () => fetchTransactionPoolMap(),
      POLL_INERVAL_MS
    );

    return () => {
      clearInterval(fetchPoolMapInterval);
    };
  }, []);

  const fetchTransactionPoolMap = () => {
    fetch(`${document.location.origin}/api/transaction-pool-map`)
      .then((response) => response.json())
      .then((data) => setTransactionPoolMap(data));
  };

  const fetchMineTransactions = () => {
    fetch(`${document.location.origin}/api/mine-transactions`).then(
      (response) => {
        if (response.status === 200) {
          alert("success");
          history.push("/blocks");
        } else {
          alert("The mine-transactions block request did not complete.");
        }
      }
    );
  };

  return (
    <div className="transaction-pool">
      <div>
        <a href="/">Home</a>
      </div>
      <h3>Transaction Pool</h3>
      {Object.values(transactionPoolMap).map((transaction, i) => (
        <div key={i}>
          <hr />
          <Transaction transaction={transaction} />
        </div>
      ))}
      <hr />
      <Button onClick={fetchMineTransactions}>Mine the Transactions</Button>
    </div>
  );
}

export default TransactionPool;
