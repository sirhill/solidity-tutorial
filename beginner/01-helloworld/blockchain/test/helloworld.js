'user strict';

const HelloWorld = artifacts.require('HelloWorld.sol');

contract('HelloWorld', function (accounts) {
  let helloWorld;
 
  beforeEach(async function () {
    helloWorld = await HelloWorld.new();
  });

  it('should deployed', async function () {
    assert.ok(helloWorld.address != null, 'Contract is not deployed');
  });

  it('should say helloworld', async function () {
    const message = await helloWorld.message();
    assert.equal(message, 'Hello world !');
  });
});
