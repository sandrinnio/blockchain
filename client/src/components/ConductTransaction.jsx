import React, { useEffect, useState } from "react";
import { FormGroup, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function ConductTransaction() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [knownAddresses, setKnownAddresses] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetch(`${document.location.origin}/api/known-addresses`)
      .then((response) => response.json())
      .then((data) => setKnownAddresses(data));
  }, []);

  const conductTransaction = () => {
    fetch(`${document.location.origin}/api/transact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipient, amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || data.type);
        history.push("/transaction-pool");
      });
  };

  return (
    <div className="conduct-transaction">
      <a href="/">Home</a>
      <h3>Conduct a Transaction</h3>
      <br />
      <h4>Known Addresses</h4>
      {knownAddresses.map((knownAddress) => {
        return (
          <div key={knownAddress}>
            <div>{knownAddress}</div>
            <br />
          </div>
        );
      })}
      <br />
      <FormGroup>
        <FormControl
          type="text"
          placeholder="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </FormGroup>
      <br />
      <FormGroup>
        <FormControl
          type="number"
          placeholder="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </FormGroup>
      <div>
        <Button onClick={conductTransaction}>Submit</Button>
      </div>
    </div>
  );
}

export default ConductTransaction;
