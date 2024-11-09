// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

/// @dev for testing purpose
contract LoyaltyPointHook {
  bool private _success;
  constructor(bool success) {
    _success = success;
  }

  function onUpdate(address, address, uint256) public view returns (bool) {
    return _success;
  }
}
