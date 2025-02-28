use aiken/cbor
use aiken/collection/dict
use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/address.{
  Address, Inline, Script, VerificationKey, from_verification_key,
}
use cardano/assets.{AssetName, PolicyId, Value}
use cardano/transaction.{InlineDatum,
  Input, Output, OutputReference, find_input}
use modules/types.{
  AssetClass, ConfigDatum, KarbonDatum, KarbonRedeemerMint, KarbonRedeemerSpend,
  Multisig, PaymentKeyHash, StakeKeyHash,
}

pub fn address_from_tuple(key_hash_tuple: (PaymentKeyHash, StakeKeyHash)) {
  let (pkh, skh) = key_hash_tuple
  Address {
    payment_credential: pkh |> VerificationKey,
    stake_credential: if skh == "" {
      None
    } else {
      skh |> Script |> Inline |> Some
    },
  }
}

pub fn must_consume_utxo(inputs: List<Input>, o_ref: OutputReference) {
  expect Some(_input) = find_input(inputs, o_ref)
  True
}

pub fn must_mint_exactly_one(mint: Value, policy_id: PolicyId) -> Bool {
  expect [Pair(_, qty)] =
    mint
      |> assets.tokens(policy_id)
      |> dict.to_pairs()
  (qty == 1)?
}

pub fn must_burn_token(mint: Value, policy_id: PolicyId) -> Bool {
  expect [Pair(_, qty)] =
    mint
      |> assets.tokens(policy_id)
      |> dict.to_pairs()
  (qty < 0)?
}

pub fn must_burn_less_than_0(mint: Value, policy_id: PolicyId) -> Bool {
  //TODO: test if it throws error when mint has not found token for `policy_id` then throws error or not
  let values: Pairs<AssetName, Int> =
    mint
      |> assets.tokens(policy_id)
      |> dict.to_pairs()

  list.all(
    values,
    fn(Pair(_, amount)) {
      trace @"amount": amount
      amount < 0
    },
  )
}

pub fn find_ref_config_datum_with_config_nft(
  inputs: List<Input>,
  nft: PolicyId,
) -> ConfigDatum {
  expect Some(ref_input) =
    list.find(
      inputs,
      fn(input) { list.has(input.output.value |> assets.policies, nft) },
    )
  find_ref_datum_from_utxo(ref_input.output)
}

pub fn find_ref_datum_from_utxo(output: Output) -> ConfigDatum {
  expect InlineDatum(ref_input_datum) = output.datum
  expect ref_datum: ConfigDatum = ref_input_datum

  ref_datum
}

pub fn must_send_fees_to_address(
  outputs: List<Output>,
  ref_datum: ConfigDatum,
) -> Bool {
  let AssetClass { policy_id, asset_name } = ref_datum.fees_asset_class
  list.any(
    outputs,
    fn(output) {
      and {
        when output.address.payment_credential is {
          Script(vkh) | VerificationKey(vkh) -> vkh == ref_datum.fees_address
        }?,
        (assets.quantity_of(output.value, policy_id, asset_name) == ref_datum.fees_amount)?,
      }
    },
  )
}

pub fn must_send_nft_and_datum_to_script(output: Output, policy_id: PolicyId) {
  expect InlineDatum(output_datum) = output.datum
  expect _: KarbonDatum = output_datum
  list.has(output.value |> assets.policies, policy_id)?
}

pub fn atleast_signedby(
  signatories: List<VerificationKeyHash>,
  atleast_signatories: Multisig,
) -> Bool {
  let Multisig { required, signers } = atleast_signatories
  trace @"signers": signers
  trace @"extra_signatories": signatories
  (required <= list.count(signers, fn(signer) { list.has(signatories, signer) }))?
}

pub fn funds_sent_to_developer(
  outputs: List<Output>,
  datum: KarbonDatum,
  redeemer: KarbonRedeemerSpend,
  policy_id: PolicyId,
) -> Bool {
  let KarbonDatum { developer, .. } = datum
  let KarbonRedeemerSpend { amount, oref, .. } = redeemer
  expect Some(output) =
    list.find(
      outputs,
      fn(output) { output.address == address_from_tuple(developer) },
    )

  let temp = assets.quantity_of(output.value, policy_id, token_name_oref(oref))
  (temp == amount)?
}

pub fn must_mint_tokens(
  mint: Value,
  policy_id: PolicyId,
  redeemer: KarbonRedeemerMint,
) {
  let KarbonRedeemerMint { amount, oref, .. } = redeemer
  expect [Pair(mint_assetname, qty)] =
    assets.tokens(mint, policy_id) |> dict.to_pairs
  and {
    mint_assetname == token_name_oref(oref),
    qty == amount,
  }
}

pub fn must_spend_script_input(inputs: List<Input>, address: Address) {
  let input <- list.any(inputs)
  input.output.address == address
}

//fucntion for oref transaction_id + output_index == name of asset

pub fn token_name_oref(oref: OutputReference) {
  // let OutputReference { transaction_id, output_index } = oref

  // let hashed =
  //   crypto.blake2b_224(
  //     bytearray.concat(
  //       transaction_id,
  //       bytearray.from_int_little_endian(output_index, 2),
  //     ),
  //   )
  let hashed = oref |> cbor.serialise |> crypto.blake2b_224
  hashed
}

pub fn is_category_from_supported_categories(
  categories: List<ByteArray>,
  category: ByteArray,
) -> Bool {
  list.has(categories, category)
}

pub fn correct_asset_name_in_datum(
  value: Value,
  policy_id: PolicyId,
  asset_name: ByteArray,
) -> Bool {
  expect [Pair(mint_assetname, 1)] =
    assets.tokens(value, policy_id) |> dict.to_pairs

  mint_assetname == asset_name
}

pub fn must_have_asset_and_burn(value: Value, policy_id: PolicyId) -> Bool {
  // expect [Pair(_, -1)] = assets.tokens(value, policy_id) |> dict.to_pairs
  must_burn_token(value, policy_id)
}
