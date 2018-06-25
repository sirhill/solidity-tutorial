'user strict';

const assertRevert = require('./helpers/assertRevert');
const assertJump = require('./helpers/assertJump');
const SimpleToken = artifacts.require('SimpleToken.sol');

contract('SimpleToken', function (accounts) {
  let simpleToken;

  beforeEach(async function () {
    simpleToken = await SimpleToken.new(
      'SimpleToken',
      'STN',
      1000 * 10**18);
  });

  it('should have a name', async function () {
    const name = await simpleToken.name();
    assert.equal(name, 'SimpleToken', 'name');
  });

  it('should have a symbol', async function () {
    const symbol = await simpleToken.symbol();
    assert.equal(symbol, 'STN', 'symbol');
  });

  it('should have decimals',  async function () {
    const decimals = await simpleToken.decimals();
    assert.equal(decimals, 18, 'decimals');
  });

  it('should have a total supply', async function () {
    const totalSupply = await simpleToken.totalSupply();
    assert.equal(totalSupply, 1000 * 10 ** 18, 'total supply');
  });

  it('creator account should have all the tokens', async function () {
    const tokens = await simpleToken.balanceOf(accounts[0]);
    assert.equal(tokens, 1000 * 10 ** 18, 'balances of creator');
  });

  it('non creator accounts should have 0 tokens', async function () {
    for(let i=1; i < 3; i ++) {
      const balance = await simpleToken.balanceOf(accounts[i]);
      assert.equal(balance, 0, 'balance of non creator');
    }
  });

  it('should not let transfer tokens if holder has no tokens', async function () {
    await assertJump(simpleToken.transfer(
      accounts[1], 100 * 10**18, { from: accounts[1] }));
  });

  it('should not let transfer more tokens than holder holds', async function () {
    await assertJump(simpleToken.transfer(accounts[1], 2000 * 10**18));
  });

  it('should not let transfer tokens from someone else', async function () {
    await assertJump(simpleToken.transfer(
      accounts[1],
      1000 * 10**18,
      { from: accounts[1] }));
  });

  it('should let transfer tokens if holder has some tokens', async function () {
    const tx = await simpleToken.transfer(accounts[1], 100 * 10**18);
    assert.equal(tx.receipt.status, '0x01', 'status');
    assert.equal(tx.logs.length, 1, '1 event');
    assert.equal(tx.logs[0].event, 'Transfer', 'event name');
    assert.equal(tx.logs[0].args.from, accounts[0], 'from');
    assert.equal(tx.logs[0].args.to, accounts[1], 'to');
    assert.equal(tx.logs[0].args.value.toNumber(), 100 * 10**18, 'value');

    const balanceFrom = await simpleToken.balanceOf(accounts[0]);
    assert.equal(balanceFrom.toNumber(), 900 * 10 ** 18, 'balance from');
    const balanceTo = await simpleToken.balanceOf(accounts[1]);
    assert.equal(balanceTo.toNumber(), 100 * 10 ** 18, 'balance to');
  });

  it('should not transferFrom tokens if holder has no tokens', async function () {
    await assertRevert(simpleToken.transferFrom(accounts[0], accounts[1], 100 ** 10**18));
  });

  it('should let owner approve some tokens to a spender', async function () {
    const tx = await simpleToken.approve(accounts[1], 100 * 10**18);
    assert.equal(tx.receipt.status, '0x01', 'status');
    assert.equal(tx.logs.length, 1, '1 event');
    assert.equal(tx.logs[0].event, 'Approval', 'event name');
    assert.equal(tx.logs[0].args.owner, accounts[0], 'from');
    assert.equal(tx.logs[0].args.spender, accounts[1], 'to');
    assert.equal(tx.logs[0].args.value.toNumber(), 100 * 10 ** 18, 'value');

    const allowance = await simpleToken.allowance(accounts[0], accounts[1]);
    assert.equal(allowance.toNumber(), 100 * 10 ** 18, 'allowance');
  });

  describe('with an approval from owner to spender', function () {
    beforeEach(async function () {
      await simpleToken.approve(accounts[1], 100 * 10 ** 18);
    });

    it('should let transferFrom more tokens than holder has allowed',
      async function ()
    {
      await assertJump(simpleToken.transferFrom(
        accounts[0],
        accounts[2],
        100 * 10**18 + 1));
    });

    it('should let transferFrom tokens from someone non approved',
      async function ()
    {
      await assertJump(simpleToken.transferFrom(
        accounts[0],
        accounts[2],
        100 * 10**18 + 1,
        { from: accounts[2] }));
    });

    it('should let transferFrom from the approved to a recipient', async function () {
      const tx = await simpleToken.transferFrom(
        accounts[0],
        accounts[2],
        100* 10**18,
        { from: accounts[1] });
      assert.equal(tx.receipt.status, '0x01', 'status');
      assert.equal(tx.logs.length, 1, '1 event');
      assert.equal(tx.logs[0].event, 'Transfer', 'event name');
      assert.equal(tx.logs[0].args.from, accounts[0], 'from');
      assert.equal(tx.logs[0].args.to, accounts[2], 'to');
      assert.equal(tx.logs[0].args.value.toNumber(), 100 * 10 ** 18, 'value');

      const balanceFrom = await simpleToken.balanceOf(accounts[0]);
      assert.equal(balanceFrom.toNumber(), 900 * 10 ** 18, 'balance from');
      const balanceApproved = await simpleToken.balanceOf(accounts[1]);
      assert.equal(balanceApproved.toNumber(), 0, 'balance approved');
      const balanceTo = await simpleToken.balanceOf(accounts[2]);
      assert.equal(balanceTo.toNumber(), 100 * 10 ** 18, 'balance to');
    });

    it('should let owner reset the allowance', async function () {
      const tx = await simpleToken.approve(accounts[1], 0);
      assert.equal(tx.receipt.status, '0x01', 'status');
      assert.equal(tx.logs.length, 1, '1 event');
      assert.equal(tx.logs[0].event, 'Approval', 'event name');
      assert.equal(tx.logs[0].args.owner, accounts[0], 'from');
      assert.equal(tx.logs[0].args.spender, accounts[1], 'to');
      assert.equal(tx.logs[0].args.value, 0, 'value');

      const allowance = await simpleToken.allowance(accounts[0], accounts[1]);
      assert.equal(allowance, 0, 'allowance');
    });
  });

});
