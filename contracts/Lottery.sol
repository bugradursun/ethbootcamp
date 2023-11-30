//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Lottery {
    address public manager;
    address payable[] public players;

    constructor() {
        manager=msg.sender;
    }

    function enter() public payable {
         //users will deposit some ETH with enter fnc
         require(msg.value > .01 ether,"Not enough ethers to enter!Deposit more");
         players.push(payable(msg.sender));
    }

    function random() private view returns(uint256) {
        //to create randomnese we will take players addresses,current block time and block difficulty and put it into sha3
        return uint(keccak256(abi.encodePacked(block.prevrandao,block.timestamp, players)));
    }
    //random fnc will create a very huge number, we will take this number and do % random, with the result we will index the array
    function pickWinner() public {
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);
        players = new address payable[](0); //to infinitely run lottery contract we reset the players array
        //everytime winner is picked, we reset the players array to start over.
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    function getPlayers() public view returns(address payable[] memory) {
        return players;
    }
}