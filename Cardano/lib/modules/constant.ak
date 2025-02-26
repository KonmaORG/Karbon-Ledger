// use mocktail/virgin_address.{mock_pub_key_address}
// use mocktail/virgin_key_hash.{mock_policy_id, mock_pub_key_hash}
// use modules/types.{AssetClass, ConfigDatum, KarbonDatum, Multisig}

// // pub const output_reference =
// //   OutputReference(
// //     #"0000000000000000000000000000000000000000000000000000000000000064",
// //     0,
// //   )

// // pub const address1 =
// //   from_verification_key(
// //     #"00000000000000000000000000000000000000000000000000000056",
// //   )

// // pub const token_policyid = "karbon_policy"

// // pub const token_name = assets.from_asset(token_policyid, "KARBON_TOKEN", 1)

// pub const in_datum =
//   KarbonDatum {
//     developer: mock_pub_key_hash(0),
//     document: "doc_hash",
//     fees_amount: 0,
//     category: "water",
//     asset_name: "projectTokenName",
//     fees_asset_class: AssetClass {
//       policy_id: mock_policy_id(0),
//       asset_name: "token",
//     },
//   }

// pub const config_d =
//   ConfigDatum {
//     fees_address: mock_pub_key_hash(0),
//     fees_amount: 2_000_000,
//     fees_asset_class: AssetClass {
//       policy_id: mock_policy_id(0),
//       asset_name: "Token",
//     },
//     categories: [],
//     spend_address: mock_pub_key_hash(0),
//     multisig_validator_group: Multisig {
//       required: 3,
//       signers: [
//         mock_pub_key_hash(0),
//         mock_pub_key_hash(1),
//         mock_pub_key_hash(2),
//       ],
//     },
//     multisig_refutxoupdate: Multisig {
//       required: 3,
//       signers: [
//         mock_pub_key_hash(0),
//         mock_pub_key_hash(2),
//         mock_pub_key_hash(1),
//       ],
//     },
//   }
