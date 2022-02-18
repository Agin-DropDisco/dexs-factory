const HDWalletProvider = require('@truffle/hdwallet-provider');
const dotenv = require('dotenv');
dotenv.config();

const mnemonic = process.env.MNEMONIC;
// const { TruffleProvider } = require('@harmony-js/core');




module.exports = {
  // Uncommenting the defaults below
  // provides for an easier quick-start with Ganache.
  // You can also follow this format for other networks;
  // see <http://truffleframework.com/docs/advanced/configuration>
  // for more details on how to specify configuration options!
  //
  networks: {

    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    aurora: {
      provider: () => new HDWalletProvider(mnemonic, `https://testnet.aurora.dev`),
      network_id: 0x4e454153,
      gas: 10000000,
      from: '0xAd5104295Eedf7cd678387F18cb2da733F40E1be' 
    },
    mumbai: {	
      provider: () => new HDWalletProvider(mnemonic, `https://matic-mumbai.chainstacklabs.com`),
      network_id: 80001,
      skipDryRun: true,
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
