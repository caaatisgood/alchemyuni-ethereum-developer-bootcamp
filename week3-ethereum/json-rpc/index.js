const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config()

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = process.env.ALCHEMY_URL;

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    "0x043965E1C8FB1Ed7F7a3828b5CAE4D8Ef078f902",
  ]
}).then((response) => {
  console.log(response.data.result);
});
