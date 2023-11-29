const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const {abi,evm} = require('./compile')

const provider = new HDWalletProvider(
    'farm earn idea left donor maze visual acoustic approve traffic tribe tower', //account mnemonic
    'https://sepolia.infura.io/v3/5f1fb91ece9f4756b8e772fa4ac3d604' //endpoint for sepolia
)

const web3 = new Web3(provider)