import { PrivKey, Hex } from '@noble/curves/abstract/utils'
import { secp256k1 as secp } from '@noble/curves/secp256k1'
import { keccak256 } from 'ethereum-cryptography/keccak'
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils'

function hashMessage(message: string) {
  return keccak256(utf8ToBytes(message))
}

export function signMessage(msg: string, privateKey: PrivKey) {
  return secp.sign(hashMessage(msg), privateKey)
}

export function getPublicKey(privateKey: Hex) {
  return toHex(secp.getPublicKey(privateKey))
}
