const { secp256k1: secp } = require('@noble/curves/secp256k1');
const { toHex } = require("ethereum-cryptography/utils");

const main = () => {
  const privateKey = toHex(secp.utils.randomPrivateKey());
  const publicKey = toHex(secp.getPublicKey(privateKey));
  console.table({
    publicKey,
    privateKey,
  });
}

main();
