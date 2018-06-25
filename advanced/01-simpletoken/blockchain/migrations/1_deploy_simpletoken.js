var SimpleToken = artifacts.require("./SimpleToken.sol");

// 10**5 supply
const SUPPLY = 10**5 * 10**18;

module.exports = function(deployer) {
  deployer.deploy(SimpleToken, 'SimpleToken', 'STN', SUPPLY);
};
