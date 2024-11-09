// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

import { Ownable2Step, Ownable } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { Pausable } from "@openzeppelin/contracts/utils/Pausable.sol";
import { LoyaltyPoint } from "./LoyaltyPoint.sol";

/// @title  LoyaltyPoint Factory Contract
/// @author Galxe Team
/// @notice This contract is used to create a loyalty point contract
/// @custom:security-contact security@galxe.com
contract LoyaltyPointFactory is Ownable2Step, Pausable {
  error InvalidAddress();

  constructor(address _initialAdmin) Ownable(_initialAdmin) {
    if (_initialAdmin == address(0)) {
      revert InvalidAddress();
    }
  }

  event CreateLoyaltyPoint(address loyaltyPoint, string name, string symbol, address initialAdmin, address[] minters);

  /// @notice Pauses the contract.
  function pause() public onlyOwner {
    _pause();
  }

  /// @notice Unpauses the contract.
  function unpause() public onlyOwner {
    _unpause();
  }

  function createLoyaltyPoint(
    string calldata _name,
    string calldata _symbol,
    address _initialAdmin,
    address[] memory _minters
  ) external whenNotPaused returns (address contractAddr) {
    bytes32 salt = keccak256(abi.encodePacked(_name, _symbol));
    LoyaltyPoint _contract = new LoyaltyPoint{ salt: salt }(_name, _symbol, _initialAdmin, _minters);
    contractAddr = address(_contract);
    emit CreateLoyaltyPoint(contractAddr, _name, _symbol, _initialAdmin, _minters);
  }
}
