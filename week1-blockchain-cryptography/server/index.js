const express = require("express");
const app = express();
const cors = require("cors");
const { isAddress } = require("web3-validator");

const { MESSAGE } = require('./constants');
const { getPublicKeyFromSignature, getAddress } = require('./utils');
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xd8da6bf26964af9d7eed9e03e53415d37aa96045": 10000000,
  "0x489eab77a56e53aa6a193ae69e9795b20ef5096f": 50,
  "0x7603a07a53553bdcbc28c7631f7a1ebeb4b5a1e9": 3,
};

app.get("/api/balances", (req, res) => {
  res.send(balances);
});

app.post("/api/send", (req, res) => {
  const { signature, recipient, amount, recovery } = req.body;

  if (!signature || !recipient || typeof amount !== 'number') {
    res.status(400).send({ message: "MISSING_PAYLOAD" });
    return
  }

  if (!isAddress(recipient)) {
    res.status(400).send({ message: "INVALID_RECIPIENT" });
    return
  }

  if (amount <= 0) {
    res.status(400).send({ message: "INVALID_AMOUNT" });
    return
  }

  let bytes
  try {
    ;({ bytes } = getPublicKeyFromSignature(signature, MESSAGE, recovery));
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: "INVALID_SIGNATURE" });
    return
  }

  const sender = "0x" + getAddress(bytes);

  console.log('[transaction]')
  console.table({ sender, recipient, amount });

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(403).send({ message: "INSUFFICIENT_FUNDS" });
    return
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
    return
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
