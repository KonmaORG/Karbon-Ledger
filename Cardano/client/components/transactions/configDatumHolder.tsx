"use client";
import { NETWORK } from "@/config/lucid";
import { useWallet } from "@/context/walletContext";
import { AssetClass, ConfigDatum, Multisig } from "@/types/cardano";
import {
  Data,
  fromText,
  mintingPolicyToId,
  paymentCredentialOf,
  Script,
  scriptHashToCredential,
  SpendingValidator,
  Validator,
  validatorToAddress,
  validatorToScriptHash,
} from "@lucid-evolution/lucid";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  CETMINTER,
  ConfigDatumHolderValidator,
  identificationPolicyid,
  ValidatorContract,
} from "@/config/scripts/scripts";
import {
  getAddress,
  handleError,
  multiSignwithPrivateKey,
  privateKeytoAddress,
} from "@/lib/utils";
import { accountB, accountC } from "@/config/emulator";
import { get } from "http";
import { CATEGORIES } from "@/config/constants";

export default function ConfigDatumHolder() {
  const [WalletConnection] = useWallet();
  const { lucid, address } = WalletConnection;
  const [partialSign1, setPartialSign1] = useState<string>("");
  const [partialSign2, setPartialSign2] = useState<string>("");
  const [TX, setTx] = useState<string>("");
  let signer1 = process.env.NEXT_PUBLIC_SIGNER_1 as string;
  let signer2 = process.env.NEXT_PUBLIC_SIGNER_2 as string;
  let signer3 = process.env.NEXT_PUBLIC_SIGNER_3 as string;
  const configNFT = {
    [identificationPolicyid + fromText("KarbonIdentificationNFT")]: 1n,
  };
  async function deposit() {
    if (!lucid || !address) throw "Uninitialized Lucid!!!";
    try {
      const validator: SpendingValidator = ConfigDatumHolderValidator();
      const contractAddress = validatorToAddress(NETWORK, validator);
      const validatorContract: SpendingValidator = ValidatorContract();
      const validatorContractAddress = validatorToAddress(
        NETWORK,
        validatorContract
      );
      const cetMintingPolicy = CETMINTER;
      const cetPolicyId = mintingPolicyToId(cetMintingPolicy);
      const cotMintingPolicy = ValidatorContract();
      const cotPolicyId = mintingPolicyToId(cotMintingPolicy);
      console.log("configDatum", contractAddress);
      console.log("cetPolicyId", cetPolicyId);
      console.log("cotPolicyId", cotPolicyId);
      const assestClass: AssetClass = {
        policyid: "",
        asset_name: fromText(""),
      };
      const signer: Multisig = {
        required: 3n,
        signers: [
          paymentCredentialOf(
            "addr_test1qzk08tz3s7xcaxq5q0udh5kpm6fz8vhpd230c07nehtzl5ahaqav4a8stg7sfudah7uxw5g9umv897ppygy559le55tql9690r"
          ).hash,
          paymentCredentialOf(
            "addr_test1qppjp6z53cr6axg59ezf93vlcqqva7wg6d5zfxr5fctnsuveaxzar94mukjwdp323ahhs3tsn0nmawextjtkfztcs20q6fmam2"
          ).hash,
          paymentCredentialOf(
            "addr_test1qzzxrfxg6hq8zerw8g85cvcpxutjtgez5v75rs99kdnn404cfuf2xydw2zrehxmvd3k9nqywe3d6mn64a08ncc5h5s3qd5ewlk"
          ).hash,
          paymentCredentialOf(
            "addr_test1qr3deh8jxn9ejxmuunv6krgtt6q600tt289pkdhg0vrfcvvrm9x488u4tefkkjay9k49yvdwc459uxc2064eulk2raaqjzwsv3"
          ).hash,
          paymentCredentialOf(
            "addr_test1qzs3pj8vvkhu8d7g0p3sfj8896wds459gqcdes04c5fp7pcs2k7ckl5mly9f89s6zpnx9av7qnl59edp0jy2ac6twtmss44zee"
          ).hash,
        ],
      };
      // scriptHashToCredential
      const datum: ConfigDatum = {
        fees_address: paymentCredentialOf(await privateKeytoAddress(signer3))
          .hash,
        fees_amount: 100_000_000n,
        fees_asset_class: assestClass, // need verification form sourabh
        spend_address: paymentCredentialOf(validatorContractAddress).hash, // need verification form sourabh (how to pass address directly?)
        categories: CATEGORIES.map((category) => fromText(category)),
        multisig_validator_group: signer,
        multisig_refutxoupdate: signer,
        cet_policyid: cetPolicyId,
        cot_policyId: cotPolicyId,
      };
      const tx = await lucid
        .newTx()
        .pay.ToAddressWithData(
          contractAddress,
          { kind: "inline", value: Data.to(datum, ConfigDatum) },
          { lovelace: 5_000_000n, ...configNFT }
        )
        .complete();

      const signed = await tx.sign.withWallet().complete();
      const txHash = await signed.submit();
      console.log("-------ConfigDatum__Deposite------------");
      console.log(
        "validatorhash",
        paymentCredentialOf(validatorContractAddress).hash
      );
      console.log("txHash: ", txHash);
    } catch (error) {
      handleError(error);
    }
  }

  async function withdraw() {
    if (!lucid) throw new Error("Uninitialized Lucid!!!");

    const configDatumHolder = ConfigDatumHolderValidator();
    const configDatumHolderAddress = getAddress(ConfigDatumHolderValidator);

    const utxos = await lucid.utxosAt(configDatumHolderAddress);
    console.log("utxos: ", utxos, configNFT);

    const tx = await lucid
      .newTx()
      .collectFrom(utxos, Data.void())
      .pay.ToAddress(
        "addr_test1qzk08tz3s7xcaxq5q0udh5kpm6fz8vhpd230c07nehtzl5ahaqav4a8stg7sfudah7uxw5g9umv897ppygy559le55tql9690r",
        { lovelace: 5_000_000n, ...configNFT }
      )
      .attach.SpendingValidator(configDatumHolder)
      .addSigner(
        "addr_test1qzk08tz3s7xcaxq5q0udh5kpm6fz8vhpd230c07nehtzl5ahaqav4a8stg7sfudah7uxw5g9umv897ppygy559le55tql9690r"
      )
      .addSigner(
        "addr_test1qppjp6z53cr6axg59ezf93vlcqqva7wg6d5zfxr5fctnsuveaxzar94mukjwdp323ahhs3tsn0nmawextjtkfztcs20q6fmam2"
      )
      .addSigner(
        "addr_test1qzzxrfxg6hq8zerw8g85cvcpxutjtgez5v75rs99kdnn404cfuf2xydw2zrehxmvd3k9nqywe3d6mn64a08ncc5h5s3qd5ewlk"
      )
      .complete();
    // ***************88IMPORTANT************ ALSO ADD THIRD SIGNER AND UPDATE BELOW LOGIC ACCORDING TO THAT
    // const signed = await multiSignwithPrivateKey(tx, [signer1, signer2]);
    const partialSign = await tx.partialSign.withWallet();
    const txcbor = tx.toCBOR();
    setTx(txcbor);
    setPartialSign1(partialSign);
    console.log("partialSign1 added try with next signer ");
  }

  async function addSigner() {
    if (!lucid) {
      console.log("wallet not connected");
      return;
    }
    const tx = lucid.fromTx(TX);
    const partialSign3 = await tx.partialSign.withWallet();
    if (!partialSign2) {
      setPartialSign2(partialSign3);
      console.log("added 2nd signer, try with 3rd signer");
      return;
    }
    const signed = await tx
      .assemble([partialSign1, partialSign2, partialSign3])
      .complete();
    console.log("assembled");
    const txHash = await signed.submit();
    console.log("-------ConfigDatum__Withdraw-------------");
    console.log("txHash: ", txHash);
  }

  return (
    <div className="flex gap-4">
      <Button onClick={deposit}>send configDatum</Button>
      <Button onClick={withdraw}>modify configDatum</Button>
      <Button onClick={addSigner}>2nd signer</Button>
      <Button onClick={addSigner}>3rd signer</Button>
    </div>
  );
}
