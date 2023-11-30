//we can not import the contract as require(...path) because javascript will consider it as a JS code,however it is solidity code
//so we need to access the smart contract from hard disk

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname,'contracts','Lottery.sol') //dirname : all directory until this file location
const source = fs.readFileSync(lotteryPath,'utf8')

const input = {
    language: 'Solidity',
    sources: {
      'Lottery.sol': {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  };

  module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Lottery.sol'
  ].Lottery;
