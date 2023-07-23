import { ethers } from 'ethers'
import Ganache from 'ganache'

/**
 * [IMPORTANT NOTICE]
 * 
 * This is a PK from the course website. In reality this should be stored
 * in a `.env` file and should NEVER be committed to git history.
 */
export const PRIVATE_KEY = '0xf2f48ee19680706196e2e339e5da3491186e0c4c5030670656b0e0164837257d'
const INITIAL_BALANCE = ethers.parseEther('10')

// create our test account from the private key, initialize it with 10 ether
const accounts = [{
  balance: INITIAL_BALANCE,
  secretKey: PRIVATE_KEY,
}]

export const ganacheProvider = Ganache.provider({ accounts })
