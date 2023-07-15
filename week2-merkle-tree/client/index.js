const { program } = require('commander');
const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

program
  .requiredOption("-n, --name <string>");

program.parse();

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

async function main() {
  const name = program.opts().name;
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
  });

  console.log({ gift });
}

main();
