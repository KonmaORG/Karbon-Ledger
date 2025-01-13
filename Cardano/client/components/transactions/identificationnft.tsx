"use client";
import { ConfigDatumHolderValidator, IdentificationNFT_MintValidator, identificationPolicyid } from "@/config/scripts/scripts";
import { useWallet } from "@/context/walletContext";
import {
  Constr,
  Data,
  fromText,
  mintingPolicyToId,
  Validator,
} from "@lucid-evolution/lucid";
import React from "react";
import { Button } from "@/components/ui/button";
import { IdentificationRedeemerSchema } from "@/types/cardano";
import { getAddress, multiSignwithPrivateKey, privateKeytoAddress } from "@/lib/utils";

export default function Identification() {
  const [WalletConnection] = useWallet();
  const { lucid, address } = WalletConnection;
  const [oRef, setORef] = React.useState<Data>(new Constr(0, ["575f070a4adf2deb599afc791a12a5887fb1f7162bc7ff784f18b630726b46f8", 0n]));
  // const [oRef, setORef] = React.useState<Data>(new Constr(0, ["0000000000000000000000000000000000000000000000000000000000000000", 0n]));
  // const [oRef, setORef] = React.useState<Data>(new Constr(0, ["8e5d32d440ce6c3f12f89641399b9627c1ab84b9675622b5d6bb0f3555461199", 0n]));



  let signer1 = process.env.NEXT_PUBLIC_SIGNER_1 as string;
  let signer2 = process.env.NEXT_PUBLIC_SIGNER_2 as string;
  let signer3 = process.env.NEXT_PUBLIC_SIGNER_3 as string;
  async function mint() {
    if (!lucid || !address) throw "Uninitialized Lucid!!!";

    const utxos = await lucid.utxosAt(address);
    // const orefHash = String(utxos[0].txHash);
    // const orefIndex = BigInt(utxos[0].outputIndex);
    // const oref = new Constr(0, [orefHash, orefIndex]);
    // setORef(oref);
    // console.log(utxos)
    const mintingValidator: Validator = IdentificationNFT_MintValidator([oRef]);
    const policyID = mintingPolicyToId(mintingValidator);
    const ref_assetName = "KarbonIdentificationNFT";
    const mintedAssets = { [policyID + fromText(ref_assetName)]: 1n };
    // const redeemer = Data.to("Mint", IdentificationRedeemer);
    const mint = new Constr(0, []);
    const redeemer = Data.to(mint);

    const tx = await lucid
      .newTx()
      .collectFrom([utxos[0]])
      .mintAssets(mintedAssets, redeemer)
      .attach.MintingPolicy(mintingValidator)
      .complete();

    const signed = await tx.sign.withWallet().complete();
    const txHash = await signed.submit();
    console.log("-----------IdentificationNFT__Mint---------");
    console.log("policyId: ", policyID);
    console.log("txHash: ", txHash);
    console.log("assetname", ref_assetName);
  }

  async function burn() {
    if (!lucid || !address) throw "Uninitialized Lucid!!!";

    const ref_assetName = "KarbonIdentificationNFT";
    const assetUnit = `${identificationPolicyid}${fromText(ref_assetName)}`;
    const burnedAssets = { [assetUnit]: -1n };

    const mintingValidator: Validator = IdentificationNFT_MintValidator([oRef]); // pass the oref to the validator as hardcoded from scripts.ts
    const configDatumHolderAddress = getAddress(ConfigDatumHolderValidator)
    const utxos = await lucid.utxosAtWithUnit(configDatumHolderAddress, assetUnit);



    const mint = new Constr(1, []);
    const redeemer = Data.to(mint);
    console.log(oRef)
    const tx = await lucid
      .newTx()
      .collectFrom(utxos, Data.void())
      .attach.SpendingValidator((ConfigDatumHolderValidator()))
      .mintAssets(burnedAssets, redeemer)
      .attach.MintingPolicy(mintingValidator)
      .addSigner(await privateKeytoAddress(signer1))
      .addSigner(await privateKeytoAddress(signer2))
      .complete();

    const multisig = await multiSignwithPrivateKey(tx, [signer1, signer2])
    const signed = await multisig.sign.withWallet().complete();
    const txHash = await signed.submit();
    console.log("-----------IdentificationNFT__Burn---------");
    console.log("txHash: ", txHash);
    console.log("assetname", ref_assetName);
    console.log("policyID+AssetName", assetUnit);
  }

  return (
    <div className="flex gap-4">
      <Button onClick={mint}>mint</Button>
      <Button onClick={burn}>burn</Button>
    </div>
  );
}
