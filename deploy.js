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
    const abi1 = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "enter",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getPlayers",
            "outputs": [
                {
                    "internalType": "address payable[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "manager",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pickWinner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "players",
            "outputs": [
                {
                    "internalType": "address payable",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
    const result = await new web3.eth.Contract(abi1)
    .deploy({data:evm.bytecode.object}) //pass bytecode as evm.bytecode.object
    .send({gas:'1000000',from:accounts[0]})

    console.log(JSON.stringify(abi1))
    console.log('contract deployed to:',result.options.address)
    
    provider.engine.stop() //to prevent hanging deployment
    //guncel adress 0x896FC5314A80EE1C8fE1e2A098E65bA55D029367
}

deploy()