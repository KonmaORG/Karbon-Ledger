use aiken/collection/list
use aiken/primitive/bytearray
use cardano/address.{Script}
use cardano/assets.{PolicyId}
use cardano/transaction.{InlineDatum, Input, OutputReference, Transaction}
use modules/cip68.{Cip68,
  must_consume_nonce, must_send_ref_token_to_self_script}
use modules/types.{Action, Burn, Mint, Update}
use modules/value

validator cip_68(nonce: OutputReference) {
  mint(redeemer action: Action, policy_id: PolicyId, tx: Transaction) {
    let mint_qty =
      when action is {
        Mint -> 1
        Burn -> -1
        _ -> fail @"Invalid redeemer action!"
      }

    expect [ref_token, usr_token] = tx.mint |> value.to_pairs(policy_id)

    let Pair(ref_token_name, ref_token_qty) = ref_token
    expect ref_token_qty == mint_qty
    expect #"000643b0" = ref_token_name |> bytearray.take(4)

    let Pair(usr_token_name, usr_token_qty) = usr_token
    expect usr_token_qty == mint_qty
    expect #"000de140" = usr_token_name |> bytearray.take(4)

    expect
      bytearray.drop(usr_token_name, 4) == bytearray.drop(ref_token_name, 4)

    when action is {
      Mint -> and {
          tx.inputs
            |> must_consume_nonce(nonce),
          tx.outputs
            |> must_send_ref_token_to_self_script(policy_id, ref_token_name),
        }
      Update -> False
      Burn -> True
    }
  }

  spend(
    _datum: Option<Cip68>,
    redeemer action: Action,
    o_ref: OutputReference,
    tx: Transaction,
  ) {
    expect Some(input) = tx.inputs |> transaction.find_input(o_ref)
    expect Script(policy_id) = input.output.address.payment_credential

    when action is {
      Mint -> False

      Update -> {
        expect [Pair(ref_token_name, _)] =
          input.output.value |> value.to_pairs(policy_id)
        let token_name = ref_token_name |> bytearray.drop(4)
        expect {
          let input <- list.any(tx.inputs)
          let tokens = input.output.value |> value.to_pairs(policy_id)
          let Pair(asset_name, _) <- list.any(tokens)
          and {
            asset_name != ref_token_name,
            bytearray.drop(asset_name, 4) == token_name,
          }
        }

        expect [output] =
          tx.outputs |> transaction.find_script_outputs(policy_id)
        expect InlineDatum(metadata) = output.datum
        expect _: Cip68 = metadata
        expect [Pair(o_ref_token_name, _)] =
          output.value |> value.to_pairs(policy_id)
        and {
          o_ref_token_name == ref_token_name,
          output.address == input.output.address,
          output.reference_script == input.output.reference_script,
        }
      }

      Burn ->
        tx.mint
          |> assets.policies
          |> list.has(policy_id)
    }
  }

  else(_) {
    fail
  }
}
