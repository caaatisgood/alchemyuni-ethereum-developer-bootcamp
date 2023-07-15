const { program } = require('commander');
const { secp256k1: secp } = require('@noble/curves/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes } = require('ethereum-cryptography/utils');

const { MESSAGE } = require('../constants');

program
  .requiredOption('-pk, --private-key <string>')
  .parse();

const options = program.opts();
const pk = options.privateKey;

const main = () => {
  console.log(`Signing your private key with message: '${MESSAGE}'...`)
  signMessage(MESSAGE, pk);
}

main();

function signMessage(msg, privateKey) {
  const sig = secp.sign(hashMessage(msg), privateKey);
  const result = {
    recovery: sig.recovery,
    compactHex: sig.toCompactHex(),
  }
  console.table(result);
  return result
}

function hashMessage(message) {
  return keccak256(utf8ToBytes(message));
}
