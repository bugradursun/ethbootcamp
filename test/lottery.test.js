const assert = require('assert')
const {Web3} = require('web3')
const ganache = require('ganache')

const web3 = new Web3(ganache.provider)
const {abi,evm} = require("../compile")
let accounts;
let lottery;
beforeEach(async() => {
    accounts = await web3.eth.getAccounts()
    deployer = accounts[0]

    lottery = await new web3.eth.Contract(abi)
    .deploy({data:evm.bytecode.object,})
    .send({from:deployer,gas:'1000000'
}) // send actually does the tx in the blockchain
})

describe('Lottery Contract', () => {
    it('deploys a contract',async () => {
        assert.ok(lottery.options.address)
    })
    it('allows one account to enter',async () => {
        await lottery.methods.enter().send({
            from:deployer,
            value: web3.utils.toWei('0.02','ether')
        })
        const players = await lottery.methods.getPlayers().call({
            from:deployer,
        })
        assert.equal(deployer,players[0]) //deployer 
        assert.equal(1,players.length)
    })

    it('allows multiple accounts to enter',async () => {
        await lottery.methods.enter().send({
            from:deployer,
            value:web3.utils.toWei('0.02','ether'),
        })
        await lottery.methods.enter().send({
            from:accounts[1],
            value:web3.utils.toWei('0.02','ether'),
        })
        await lottery.methods.enter().send({
            from:accounts[2],
            value:web3.utils.toWei('0.02','ether'),
        })
        const players = await lottery.methods.getPlayers().call({
            from:deployer,
        })

        assert.equal(accounts[0],players[0])
        assert.equal(accounts[1],players[1])
        assert.equal(accounts[2],players[2])
        assert.equal(3,players.length)
    })
})