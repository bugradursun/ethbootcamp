const assert = require('assert') //testler hakkinda iddialarda bulunuruz
const ganache = require('ganache')
const {Web3} = require('web3') //constructor of web3 instances, and also it is starting with capitalized letter since it is a constructor function(like a class)

const web3 = new Web3(ganache.provider())

class Car {
    park() {
        return 'stopped'
    }
    drive() {
        return 'vroom'
    }
}
let car;
beforeEach(() => {
    car = new Car()
})

describe('Car', () => {
    it('park should return a string',() => {
        assert.equal(car.park(),'stopped')
    });

    it('can drive and return vroom',() => {
        assert.equal(car.drive(),'vroom')
    })
})