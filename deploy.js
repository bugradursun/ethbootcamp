const HDWalletProvider = require('@truffle/hdwallet-provider');
const {Web3} = require('web3')
const {abi,evm} = require('./compile')

const provider = new HDWalletProvider(
    'farm earn idea left donor maze visual acoustic approve traffic tribe tower', //account mnemonic
    'https://sepolia.infura.io/v3/5f1fb91ece9f4756b8e772fa4ac3d604' //endpoint for sepolia
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account',accounts[0])
    
    const result = await new web3.eth.Contract(abi)
    .deploy({data:evm.bytecode.object,arguments:['Hi there!']}) //pass bytecode as evm.bytecode.object
    .send({gas:'1000000',from:accounts[0]})

    console.log('contract deployed to:',result.options.address)
    provider.engine.stop() //to prevent hanging deployment
    //contract deployed to 0x8D13c25fB21Eb8b45eF2483588d7a94dC11fF3D0
}

deploy()