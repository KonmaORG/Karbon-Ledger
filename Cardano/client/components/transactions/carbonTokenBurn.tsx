"use client";
import { ValidatorContract, ValidatorMinter } from "@/config/scripts/scripts";
import { useWallet } from "@/context/walletContext";
import { Data, mintingPolicyToId } from "@lucid-evolution/lucid";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  multiSignwithPrivateKey,
  privateKeytoAddress,
  refUtxo,
} from "@/lib/utils";
import { KarbonRedeemerMint } from "@/types/cardano";

export default function Validator_contract() {
  const [WalletConnection] = useWallet();
  const { lucid, address } = WalletConnection;

  let signer1 = process.env.NEXT_PUBLIC_SIGNER_1 as string;
  let signer2 = process.env.NEXT_PUBLIC_SIGNER_2 as string;
  let signer3 = process.env.NEXT_PUBLIC_SIGNER_3 as string;

  async function Burn() {
    if (!lucid) throw "Uninitialized Lucid!!!";
    if (!address) throw "Wallet Not Connected";

    const validatorContract = ValidatorContract();
    const policyIDCarbon = mintingPolicyToId(validatorContract);

    const utxos = await lucid.utxosAt(address);
    const utxosWithToken = utxos.filter((utxo) => {
      return Object.keys(utxo.assets).some((asset) =>
        asset.startsWith(policyIDCarbon)
      );
    });

    const refutxo = await refUtxo(lucid);

    const redeemerValidatorMint: KarbonRedeemerMint = {
      action: "Burn",
      amount: 0n,
      oref: {
        transaction_id: utxosWithToken[0].txHash,
        output_index: BigInt(utxosWithToken[0].outputIndex),
      },
    };
    const carbonBurnAssets: { [key: string]: bigint } = utxosWithToken.reduce(
      (acc: { [key: string]: bigint }, utxo) => {
        Object.entries(utxo.assets).forEach(([key, qty]) => {
          if (key.startsWith(policyIDCarbon)) {
            acc[key] = -qty;
          }
        });
        return acc;
      },
      {}
    );

    const tx = await lucid
      .newTx()
      .readFrom(refutxo) // correct
      .mintAssets(
        carbonBurnAssets,
        Data.to(redeemerValidatorMint, KarbonRedeemerMint)
      )
      .attach.MintingPolicy(validatorContract) //correct
      .addSigner(await privateKeytoAddress(signer1)) //correct
      .addSigner(await privateKeytoAddress(signer2)) //correct
      .complete();

    const signed = await multiSignwithPrivateKey(tx, [signer1, signer2]);
    const signedd = await signed.sign.withWallet().complete();
    const txHash = await signedd.submit();
    console.log("------------CarbonToken__Burn---------");

    console.log("txHash: ", txHash);
    console.log("policyID+AssetName", carbonBurnAssets);
  }

  return (
    <>
      <Button onClick={Burn}>Burn Carbon Tokens</Button>
    </>
  );
}
