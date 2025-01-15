import { NETWORK } from "@/config/lucid";
import { useWallet } from "@/context/walletContext";
import { AssetClass, ConfigDatum, Multisig } from "@/types/cardano";
import {
  Data,
  fromText,
  paymentCredentialOf,
  Script,
  scriptHashToCredential,
  SpendingValidator,
  Validator,
  validatorToAddress,
  validatorToScriptHash,
} from "@lucid-evolution/lucid";
import React from "react";
import { Button } from "../ui/button";
import {
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

  let signer1 = process.env.NEXT_PUBLIC_SIGNER_1 as string;
  let signer2 = process.env.NEXT_PUBLIC_SIGNER_2 as string;
  let signer3 = process.env.NEXT_PUBLIC_SIGNER_3 as string;

  async function deposit() {
    if (!lucid || !address) throw "Uninitialized Lucid!!!";
    try {
      const configNFT = {
        [identificationPolicyid + fromText("KarbonIdentificationNFT")]: 1n,
      };
      const validator: SpendingValidator = ConfigDatumHolderValidator();
      const contractAddress = validatorToAddress(NETWORK, validator);
      const validatorContract: SpendingValidator = ValidatorContract();
      const validatorContractAddress = validatorToAddress(
        NETWORK,
        validatorContract
      );

      const assestClass: AssetClass = {
        policyid: "",
        asset_name: fromText(""),
      };
      const signer: Multisig = {
        required: 2n,
        signers: [
          paymentCredentialOf(await privateKeytoAddress(signer1)).hash,
          paymentCredentialOf(await privateKeytoAddress(signer2)).hash,
          paymentCredentialOf(await privateKeytoAddress(signer3)).hash,
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
    console.log("utxos: ", utxos);

    const tx = await lucid
      .newTx()
      .collectFrom(utxos, Data.void())
      .attach.SpendingValidator(configDatumHolder)
      .addSigner(await privateKeytoAddress(signer1))
      .addSigner(await privateKeytoAddress(signer2))
      .complete();

    const signed = await multiSignwithPrivateKey(tx, [signer1, signer2]);
    const signedd = await signed.sign.withWallet().complete();
    const txHash = await signedd.submit();
    console.log("-------ConfigDatum__Withdraw-------------");
    console.log("txHash: ", txHash);
  }

  return (
    <div className="flex gap-4">
      <Button onClick={deposit}>send configDatum</Button>
      <Button onClick={withdraw}>modify configDatum</Button>
    </div>
  );
}
