pragma solidity ^0.4.24;

import "./SafeMath.sol";
import "./ERC20Interface.sol";


/**
 * @title SimpleToken
 * @dev simple implementation of the ERC20 Interface
 **/
contract SimpleToken is ERC20Interface {
  using SafeMath for uint256;
  
  string public name;
  string public symbol;

  // 18 is the most common number of decimal places
  uint8 public decimals = 18; 

  // Total of the tokens supply
  uint public totalSupply;
  
  // Balances for each account
  mapping(address => uint256) balances;

  // Owner of account approves the transfer of an amount to another account
  mapping(address => mapping (address => uint256)) allowed;

  constructor(string _name, string _symbol, uint256 _totalSupply) public {
    name = _name;
    symbol = _symbol;
    balances[msg.sender] = _totalSupply;
    totalSupply = _totalSupply;
  }

  function totalSupply() public view returns (uint) {
    return totalSupply;
  }

  function balanceOf(address _holder) public view returns (uint balance) {
    return balances[_holder]; 
  }

  function allowance(address _holder, address _spender) public view returns (uint remaining) {
    return allowed[_holder][_spender];
  }

  function transfer(address _to, uint _tokens) public returns (bool success) {
    balances[msg.sender] = balances[msg.sender].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);
    emit Transfer(msg.sender, _to, _tokens);
    return true;
  }
   
  function approve(address _spender, uint _tokens) public returns (bool success) {
    allowed[msg.sender][_spender] = _tokens;
    emit Approval(msg.sender, _spender, _tokens);
    return true;
  }

  function transferFrom(address _from, address _to, uint _tokens) public returns (bool success) {
    balances[_from] = balances[_from].sub(_tokens);
    allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_tokens);
    balances[_to] = balances[_to].add(_tokens);
    emit Transfer(_from, _to, _tokens);
    return true;
  }
}
