import React, { Dispatch, SetStateAction, useState } from "react";
import { isAddress } from 'web3-validator';

import request from "./request";
import {
  signMessage,
  getPublicKey,
} from "./utils";

const MESSAGE = "alchemyunirocks"

const Transfer: React.FC<{ onTransferred: () => void }> = ({ onTransferred }) => {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientError, setRecipientError] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [privateKeyError, setPrivateKeyError] = useState("");
  const [signature, setSignature] = useState("");
  const [recovery, setRecovery] = useState("");
  const [recoveryError, setRecoveryError] = useState("");

  const setValue = (setter: Dispatch<SetStateAction<string>>) =>
    (evt: React.ChangeEvent<HTMLInputElement>) => setter(evt.target.value);

  const _getPublicKey = () => {
    try {
      return getPublicKey(privateKey)
    } catch (error) {
      return ""
    }
  }

  async function transfer(evt: React.FormEvent) {
    evt.preventDefault();
    _resetErrors();

    const pkProvided = !!privateKey
    let _recovery = Number(recovery);

    const isValidRecipient = isAddress(recipient);
    const isValidRecovery = !pkProvided || !Number.isNaN(_recovery);
    const isValid = isValidRecipient && isValidRecovery;

    if (!isValidRecipient) setRecipientError("Invalid address");
    if (!isValidRecovery) setRecoveryError("Invalid recovery");
    if (!isValid) return;

    let _signature = signature
    if (!_signature) {
      try {
        const sig = signMessage(MESSAGE, privateKey);
        _recovery = sig.recovery;
        _signature = sig.toCompactHex();
      } catch (error) {
        setPrivateKeyError("Invalid private key")
        return
      }
    }

    try {
      await request.post(`/api/send`, {
        signature: _signature,
        recovery: _recovery,
        amount: Number(sendAmount),
        recipient,
      }).then(res => {
        alert(`Transfer success! Balance: ${res.data.balance}`);
        onTransferred();
      });
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  const _resetErrors = () => {
    setRecipientError("");
    setRecoveryError("");
    setPrivateKeyError("");
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          required
          type="number"
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          required
          placeholder="Enter an address, for example: 0xd8da6bf26964af9d7eed9e03e53415d37aa96045"
          value={recipient}
          onChange={setValue(setRecipient)}
          style={{ fontFamily: "monospace" }}
          ></input>
        {recipientError && (
          <p style={{ color: "tomato" }}>{recipientError}</p>
        )}
      </label>

      <label>
        Your Signature (compact hex)<br />
        <p>Sign this string <code><i>alchemyunirocks</i></code> with your private key</p>
        <input
          required
          placeholder="Enter a signature"
          value={signature}
          onChange={setValue(setSignature)}
          style={{ fontFamily: "monospace" }}
          disabled={!!privateKey}
        ></input>
      </label>

      <label>
        Recovery of your signature<br />
        <input
          required
          placeholder="Enter a recovery"
          value={recovery}
          onChange={setValue(setRecovery)}
          style={{ fontFamily: "monospace" }}
          disabled={!!privateKey}
        ></input>
        {recoveryError && (
          <p style={{ color: "tomato" }}>{recoveryError}</p>
        )}
      </label>

      <p>
        or dangerously expose your private key to sign
      </p>

      <label>
        Your Private Key
        <input
          required
          placeholder="Enter a private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
          style={{ fontFamily: "monospace" }}
          disabled={!!signature}
          ></input>
          {privateKeyError && (
            <p style={{ color: "tomato" }}>{privateKeyError}</p>
          )}
      </label>

      <label style={{ color: "grey" }}>
        Your Public Key
        <input
          value={_getPublicKey()}
          disabled
          style={{ fontFamily: "monospace" }}
          ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
