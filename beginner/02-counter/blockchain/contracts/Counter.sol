pragma solidity ^0.4.23;


/**
 * @title Counter
 * @dev Contains a value 'count' and allow the user
 * to decrement it until it reach 0
 *
 * @author cyril.lapinte@mtpelerin.com
*/
contract Counter {

  uint256 private value;

  constructor(uint256 _value) public {
    value = _value;
  }

  function remaining() public view returns (uint256) {
    return value;
  }

  function decrement() public {
    require(value > 0);
    value--;
  }
}
