import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Transaction from "./Transaction";

function Block({ timestamp, hash, data }) {
  const [toggleTransaction, setToggleTransaction] = useState(false);

  const hashDisplay = `${hash.substring(0, 15)}...`;
  const stringifiedData = JSON.stringify(data);

  const displayTransaction = () => {
    const dataDisplay =
      stringifiedData.length > 35
        ? `${stringifiedData.substring(0, 35)}...`
        : stringifiedData;

    if (toggleTransaction) {
      return (
        <div>
          {data.map((transaction) => (
            <div key={transaction.id}>
              <hr />
              <Transaction transaction={transaction} />
            </div>
          ))}
          <br />
          <Button onClick={() => setToggleTransaction(!toggleTransaction)}>
            Show Less
          </Button>
        </div>
      );
    }

    return (
      <div>
        <div>Data: {dataDisplay}</div>
        <Button onClick={() => setToggleTransaction(!toggleTransaction)}>
          Show More
        </Button>
      </div>
    );
  };

  return (
    <div className="block">
      <div>Hash: {hashDisplay}</div>
      <div>Timestamp: {new Date(timestamp).toLocaleString()}</div>
      {displayTransaction()}
    </div>
  );
}

export default Block;
