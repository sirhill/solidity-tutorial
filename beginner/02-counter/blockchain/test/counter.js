'user strict';

const assertRevert = require('./helpers/assertRevert');
const Counter = artifacts.require('Counter.sol');

contract('Counter', function (accounts) {
  let counter;

  describe('starting from 0', function () {
    beforeEach(async function () {
      counter = await Counter.new(0);
    });

    it('should remain 0', async function () {
      const remaining = await counter.remaining();
      assert.equal(remaining, 0, 'no remaining');
    });

    it('should not allow decrement', async function () {
      await assertRevert(counter.decrement());
    });
  });

  describe('starting from 3', function () {
    beforeEach(async function () {
      counter = await Counter.new(3);
    });

    it('should remain 3', async function () {
      const remaining = await counter.remaining();
      assert.equal(remaining, 3, 'remaining');
    });

    it('should decrement', async function () {
      const tx = await counter.decrement();
      assert.equal(tx.receipt.status, '0x01');
    });
  });
});
