use aiken/cbor
use aiken/crypto.{VerificationKeyHash}
use cardano/address.{Address}
use cardano/assets.{AssetName, PolicyId}
use cardano/transaction.{OutputReference}

pub type AssetClass {
  policy_id: PolicyId,
  asset_name: AssetName,
}

pub type Action {
  Mint
  Burn
}

pub type AcceptRejectAction {
  Accept
  Reject
}

pub type Atleast =
  Int

pub type Multisig {
  required: Atleast,
  signers: List<VerificationKeyHash>,
}

pub type ConfigDatum {
  fees_address: VerificationKeyHash,
  fees_amount: Int,
  fees_asset_class: AssetClass,
  spend_address: VerificationKeyHash,
  categories: List<ByteArray>,
  // minter_policyid: 
  multisig_validator_group: Multisig,
  multisig_refutxoupdate: Multisig,
  cet_policyid: PolicyId,
  cot_policyid: PolicyId,
}

pub type KarbonDatum {
  developer: VerificationKeyHash,
  document: ByteArray,
  category: ByteArray,
  asset_name: ByteArray,
  fees_amount: Int,
  fees_asset_class: AssetClass,
}

pub type KarbonRedeemerSpend {
  action: AcceptRejectAction,
  amount: Int,
  oref: OutputReference,
}

pub type KarbonRedeemerMint {
  action: Action,
  amount: Int,
  oref: OutputReference,
}
// test datummatch() {
//   let config_d =
//     ConfigDatum {
//       fees_address: #"817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28",
//       fees_amount: 100000000,
//       fees_asset_class: AssetClass { policy_id: #"", asset_name: #"" },
//       categories: [#"666f72657374", #"7761746572"],
//       spend_address: #"bf0563478cfeaf1f8cf732ec58a7db47c0e3cd22aa767e7a82aeedaf",
//       multisig_validator_group: Multisig {
//         required: 1,
//         signers: [
//           #"817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28",
//           #"817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28",
//         ],
//       },
//       multisig_refutxoupdate: Multisig {
//         required: 1,
//         signers: [
//           #"817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28",
//           #"817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28",
//         ],
//       },
//     }

//   let datum_cbor = cbor.serialise(config_d)
//   trace @"datum_cbor": datum_cbor
//   let lucid =
//     #"d8799f581c817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa281a05f5e100d8799f4040ff581cbf0563478cfeaf1f8cf732ec58a7db47c0e3cd22aa767e7a82aeedaf9f46666f72657374457761746572ffd8799f019f581c817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28581c817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28ffffd8799f019f581c817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28581c817176370a2149c13b98122edb0208c7fdc4926e664f3bb623b6fa28ffffff"
//   datum_cbor == lucid
// }

// test redeemermatch() {
//   let redeemer =
//     KarbonRedeemerSpend {
//       action: Reject,
//       amount: 0,
//       oref: OutputReference {
//         transaction_id: #"932880cc2efb299f5fa8108e47d43e5881b3e3f599dc442e07116271b2536031",
//         output_index: 0,
//       },
//     }

//   let redeemer_cbor = cbor.serialise(redeemer)
//   trace @"redeemer_cbor": redeemer_cbor
//   let lucid =
//     #"d8799fd87a8000d8799f5820932880cc2efb299f5fa8108e47d43e5881b3e3f599dc442e07116271b253603100ffff"
//   redeemer_cbor == lucid
// }
