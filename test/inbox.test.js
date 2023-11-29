const assert = require('assert') //testler hakkinda iddialarda bulunuruz
const ganache = require('ganache')
const {Web3} = require('web3') //constructor of web3 instances, and also it is starting with capitalized letter since it is a constructor function(like a class)
const web3 = new Web3(ganache.provider())
const {interface,bytecode} = require('../compile')

let accounts;

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts()

    //use one of those accounts to deploy the contract
    new web3.eth.Contract(JSON.parse(interface)).deploy({data:bytecode,arguments:['Hi there!']})
})

describe('Inbox',() => {
    it('deploys a contract',() => {
        console.log(accounts)
    })
})
