// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/eip/ERC721A.sol";
import "@thirdweb-dev/contracts/extension/LazyMint.sol";
import "@thirdweb-dev/contracts/extension/DropSinglePhase.sol";

contract Contract is ERC721A, LazyMint, DropSinglePhase {
    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC721A(
            _name,
            _symbol
        )
    {}

    function _canLazyMint() internal view override returns (bool) {
        // Your custom implementation here
    }

    function _canSetClaimConditions() internal view override returns (bool) {
        // Your custom implementation here
    }

    function _collectPriceOnClaim(
        address _primarySaleRecipient,
        uint256 _quantityToClaim,
        address _currency,
        uint256 _pricePerToken
    ) internal virtual override {
        // Your custom implementation here
    }

    function _transferTokensOnClaim(address _to, uint256 _quantityBeingClaimed)
        internal
        virtual
        override
        returns (uint256 startTokenId)
    {
        function totalSupply() public view override returns (uint256) {
        // Your custom implementation here (overriding this function is optional)
    }
    }
}
