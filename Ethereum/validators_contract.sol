// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ValidatorContract {
    struct KarbonDatum {
        string category;
        string assetName;
    }

    struct RefDatum {
        address multisigValidatorGroup;
        address spendAddress;
        string[] categories;
    }

    enum Action { Accept, Reject, Mint, Burn }

    struct Redeemer {
        Action action;
        address refAddress; // Reference address for the NFT
        uint256 amount; // Amount for minting or burning
    }

    mapping(address => KarbonDatum) public karbonData; // Store Karbon data for addresses
    mapping(address => RefDatum) public refData; // Store reference data for addresses

    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);
    event FundsSentToDeveloper(address indexed developer, uint256 amount);

    modifier onlyMultisig(address _multisig) {
        require(msg.sender == _multisig, "Not authorized");
        _;
    }

    function spend(Redeemer memory redeemer) external {
        RefDatum memory refDatum = refData[msg.sender];

        // Check if asset name is valid
        require(bytes(karbonData[redeemer.refAddress].assetName).length > 0, "Invalid asset");

        if (redeemer.action == Action.Accept) {
            emit FundsSentToDeveloper(refDatum.spendAddress, redeemer.amount);
            // Transfer funds to developer or handle accordingly
            // ...
        } else if (redeemer.action == Action.Reject) {
            require(redeemer.amount < 0, "Must burn less than 0");
            require(msg.sender == refDatum.multisigValidatorGroup, "Not authorized");
            // Handle rejection logic
            // ...
        } else {
            revert("Invalid action");
        }
    }

    function mint(Redeemer memory redeemer) external {
        RefDatum memory refDatum = refData[msg.sender];

        if (redeemer.action == Action.Mint) {
            KarbonDatum memory datum = karbonData[redeemer.refAddress];
            require(bytes(datum.assetName).length > 0, "Invalid asset name");
            require(keccak256(abi.encodePacked(datum.assetName)) == keccak256(abi.encodePacked("expectedAssetName")), "Incorrect asset name");

            // Mint tokens logic here
            emit TokensMinted(msg.sender, redeemer.amount);
        } else if (redeemer.action == Action.Burn) {
            require(msg.sender == refDatum.multisigValidatorGroup, "Not authorized to burn");
            // Burn tokens logic here
            emit TokensBurned(msg.sender, redeemer.amount);
        } else {
            revert("Invalid action");
        }
    }
    
    function correctAssetNameInDatum(string memory expectedAssetName, string memory actualAssetName) internal pure returns (bool) {
        return keccak256(abi.encodePacked(expectedAssetName)) == keccak256(abi.encodePacked(actualAssetName));
    }

    function isCategoryFromSupportedCategories(string[] memory supportedCategories, string memory category) internal pure returns (bool) {
        for (uint i = 0; i < supportedCategories.length; i++) {
            if (keccak256(abi.encodePacked(supportedCategories[i])) == keccak256(abi.encodePacked(category))) {
                return true;
            }
        }
        return false;
    }
}
