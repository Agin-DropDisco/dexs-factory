const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const mnemonic = process.env.MNEMONIC;
const privateKey1 = process.env.PRIVATE_KEY_1;
const privateKey2 = process.env.PRIVATE_KEY_2;
const privateKey3 = process.env.PRIVATE_KEY_3;
console.log(`MNEMONIC: ${process.env.MNEMONIC}`)
console.log(`INFURA_API_KEY: ${process.env.INFURA_API_KEY}`)


module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 4,
      gas: 0,
      gasPrice: 2100000000, //2 Gwei,
      skipDryRun: true
    },
    ropsten: {
      provider: () => new HDWalletProvider([privateKey1, privateKey2, privateKey3], `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 3,
      gas: 0,
      gasPrice: 2100000000, //2 Gwei,
      skipDryRun: true
    },
    moonbase: {	
      provider: () => new HDWalletProvider([privateKey1, privateKey2, privateKey3], `https://rpc.testnet.moonbeam.network`),
      network_id: 1287,	
      gas: 0,
      gasPrice: 2100000000,
      skipDryRun: true
    },
    oasis: {	
      provider: () => new HDWalletProvider([privateKey], `https://rpc.oasiseth.org:8545`),
      network_id: 69,	
      gas: 1000000,	
      gasPrice: 1000000000 //1 Gwei	
    },	
    matic: {	
      provider: () => new HDWalletProvider([privateKey1, privateKey2, privateKey3], `https://matic-mumbai.chainstacklabs.com`),
      network_id: 80001,
      gas: 0,
      gasPrice: 2100000000, //2 Gwei,
      skipDryRun: true,
      confirmations: 2,
      timeoutBlocks: 200
    },
  },
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  },
  build: {},
  compilers: {
    solc: {
      version: '0.5.16',
      settings: {
        evmVersion: 'istanbul',
      }
    }
  },
  mocha: {
    // timeout: 100000
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
};
