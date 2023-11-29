const assert = require('assert') //testler hakkinda iddialarda bulunuruz
const ganache = require('ganache')
const {Web3} = require('web3') //constructor of web3 instances, and also it is starting with capitalized letter since it is a constructor function(like a class)
const web3 = new Web3(ganache.provider())

const {abi,evm} = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(abi).deploy({ //deploy just states we initialize the smart contract,not has sent to web3 yet
        data:evm.bytecode.object, //evm compile.js'deki bytecode
        arguments:['Hi there!'],
    })
    .send({from:accounts[0],gas:'1000000'}) //send method actually sends the smart contract to web3. 
})

describe('Inbox',() => {
    it('deploys a contract',() => {
        assert.ok(inbox.options.address) //inbox abi'da options objesinin altinda address methodu var,assert.ok ile bunu kontrol ediyoruz, ok mthodu is this defined value kontrol eder
    })

    it('it has a default message',async () => {
        const message = await inbox.methods.message().call() //call:just retrieve data 
        assert.equal(message,'Hi there!')
    })
    it('sets a new message',async() => {
        await inbox.methods.setMessage('bye').send({from:accounts[0]}) //send : modify some data inside contract,with this tx we just get a tx hash in return.
        const message = await inbox.methods.message().call()
        assert.equal(message,'bye')  

    })
})
 