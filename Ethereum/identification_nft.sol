// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentificationNFT {
    enum Action { Mint, Burn }

    struct OutputReference {
        address owner;
        uint256 tokenId;
    }

    address public policyId;
    mapping(address => uint256) public balances;

    constructor(address _policyId) {
        policyId = _policyId;
    }

    modifier onlyPolicy() {
        require(msg.sender == policyId, "Caller is not the policy ID");
        _;
    }

    // Function to mint or burn tokens based on the action
    function mint(Action redeemer, OutputReference memory oRef, address[] memory inputs, uint256 mintAmount) external onlyPolicy {
        if (redeemer == Action.Mint) {
            require(mustConsumeUTXO(inputs, oRef), "UTXO not consumed");
            require(mustMintExactlyOne(mintAmount), "Must mint exactly one token");
            balances[oRef.owner] += mintAmount;
        } else if (redeemer == Action.Burn) {
            require(mustBurnToken(mintAmount), "Must burn tokens correctly");
            balances[oRef.owner] -= mintAmount;
        } else {
            revert("Invalid action");
        }
    }

    // Checks if the required UTXO is consumed
    function mustConsumeUTXO(address[] memory inputs, OutputReference memory oRef) internal pure returns (bool) {
        for (uint256 i = 0; i < inputs.length; i++) {
            if (inputs[i] == oRef.owner) {
                return true;
            }
        }
        return false;
    }

    // Ensures exactly one token is minted
    function mustMintExactlyOne(uint256 mintAmount) internal pure returns (bool) {
        return mintAmount == 1;
    }

    // Validates that tokens are burned correctly
    function mustBurnToken(uint256 burnAmount) internal pure returns (bool) {
        return burnAmount > 0;
    }
}
