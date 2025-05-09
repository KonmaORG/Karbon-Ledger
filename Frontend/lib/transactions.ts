import { ValidatorContract, ValidatorMinter } from "@/config/scripts/scripts";
import { useWallet, WalletConnection } from "@/context/walletContext";
import {
  addressFromHexOrBech32,
  Constr,
  credentialToAddress,
  Data,
  fromHex,
  fromText,
  keyHashToCredential,
  LucidEvolution,
  mintingPolicyToId,
  OutRef,
  paymentCredentialOf,
  stakeCredentialOf,
  TxSignBuilder,
  UTxO,
  Validator,
} from "@lucid-evolution/lucid";
import {
  getAddress,
  multiSignwithPrivateKey,
  privateKeytoAddress,
  refUtxo,
} from "@/lib/utils";
import {
  AssetClass,
  KarbonDatum,
  KarbonRedeemerMint,
  KarbonRedeemerSpend,
} from "@/types/cardano";
import { SIGNER1, SIGNER2, SIGNER3 } from "@/config/constants";
import { blake2bHex } from "blakejs";
import { NETWORK } from "@/config/lucid";

export async function submit(tx: TxSignBuilder) {
  const signed = await tx.sign.withWallet().complete();
  const txHash = await signed.submit();
  return txHash;
}

async function getDatum(lucid: LucidEvolution, utxo: UTxO) {
  const data = await lucid.datumOf(utxo);
  const datum = Data.castFrom(data, KarbonDatum);
  return datum;
}

function hashtoAddress(hash: string[]) {
  const vkh = keyHashToCredential(hash[0]);
  const skh = keyHashToCredential(hash[1]);
  const address = credentialToAddress(NETWORK, vkh, skh);
  return address;
}
export async function submitProject(
  walletConnection: WalletConnection,
  fileHash: string,
  category: string,
  projectTitle: string
) {
  const { lucid, address } = walletConnection;
  if (!lucid) throw new Error("Uninitialized Lucid!");
  if (!address) throw new Error("Wallet Not Connected!");

  const validatorContractAddress = getAddress(ValidatorContract);
  const mintingValidator: Validator = ValidatorMinter();

  const policyID = mintingPolicyToId(mintingValidator);
  const projectAssetName = projectTitle;
  const mintedAssets = { [policyID + fromText(projectAssetName)]: 1n };

  const refutxo = await refUtxo(lucid);

  const redeemer = Data.to(0n);

  const assestClass: AssetClass = {
    policyid: "",
    asset_name: fromText(""),
  };

  const datum: KarbonDatum = {
    developer: [
      paymentCredentialOf(address).hash,
      stakeCredentialOf(address).hash,
    ],
    document: fileHash,
    categories: fromText(category),
    asset_name: fromText(projectAssetName),
    fees_amount: 100_000_000n,
    fees_asset_class: assestClass,
  };

  const tx = await lucid
    .newTx()
    .readFrom(refutxo)
    .pay.ToAddressWithData(
      validatorContractAddress,
      { kind: "inline", value: Data.to(datum, KarbonDatum) },
      { lovelace: 3_000_000n, ...mintedAssets }
    )
    .pay.ToAddress(await privateKeytoAddress(SIGNER3), {
      lovelace: 100_000_000n,
    })
    .mintAssets(mintedAssets, redeemer)
    .attach.MintingPolicy(mintingValidator)
    .attachMetadata(721, {
      [policyID]: {
        [projectAssetName]: {
          name: projectAssetName,
          image: "https://avatars.githubusercontent.com/u/106166350",
        },
      },
    })
    .complete();

  const txHash = await submit(tx);

  console.log("-----------ProjectLister---------");
  console.log("txHash: ", txHash);
  console.log("assetname: ", projectAssetName);
  console.log("policyID+AssetName: ", mintedAssets);
}

export async function rejectProject(
  walletConnection: WalletConnection,
  utxo: UTxO
) {
  const { lucid, address } = walletConnection;
  if (!lucid) throw new Error("Uninitialized Lucid!");
  if (!address) throw new Error("Wallet Not Connected!");

  const mintingValidator: Validator = ValidatorMinter();
  const policyID = mintingPolicyToId(mintingValidator);
  const validatorContract = ValidatorContract();
  const burnedAssets = Object.fromEntries(
    Object.entries(utxo.assets)
      .filter(([unit]) => unit.startsWith(policyID))
      .map(([unit, quantity]) => [unit, -quantity])
  );

  const refutxo = await refUtxo(lucid);

  const redeemerValidator: KarbonRedeemerSpend = {
    action: "Reject",
    amount: 0n,
    oref: {
      transaction_id: utxo.txHash,
      output_index: BigInt(utxo.outputIndex),
    },
  };
  const redeemer = Data.to(1n); // Burn

  const tx = await lucid
    .newTx()
    .readFrom(refutxo)
    .collectFrom([utxo], Data.to(redeemerValidator, KarbonRedeemerSpend))
    .attach.SpendingValidator(validatorContract)
    .mintAssets(burnedAssets, redeemer)
    .attach.MintingPolicy(mintingValidator)
    .addSigner(await privateKeytoAddress(SIGNER1))
    .addSigner(await privateKeytoAddress(SIGNER2))
    .complete();

  const signed = await multiSignwithPrivateKey(tx, [SIGNER1, SIGNER2]);
  const txHash = await submit(signed);

  console.log("-----------ProjectReject---------");
  console.log("txHash: ", txHash);
  console.log("BurnedAsset: ", burnedAssets);
}

export async function acceptProject(
  walletConnection: WalletConnection,
  utxo: UTxO
) {
  const { lucid, address } = walletConnection;
  if (!lucid) throw "Uninitialized Lucid!!!";
  if (!address) throw "Wallet Not Connected";

  const mintingValidator: Validator = ValidatorMinter();
  const policyIDMinter = mintingPolicyToId(mintingValidator);
  const validatorContract = ValidatorContract();
  const policyIDCarbon = mintingPolicyToId(validatorContract);

  const burnedAssets = Object.fromEntries(
    Object.entries(utxo.assets)
      .filter(([unit]) => unit.startsWith(policyIDMinter))
      .map(([unit, quantity]) => [unit, -quantity])
  );

  const datum = await getDatum(lucid, utxo);
  const DeveloperAddress = hashtoAddress(datum.developer);
  // reference Utxo
  const refutxo = await refUtxo(lucid);

  // Reedemer
  const redeemer = {
    amount: 100n,
    oref: {
      transaction_id: utxo.txHash,
      output_index: BigInt(utxo.outputIndex),
    },
  };
  const redeemerValidatorSpend: KarbonRedeemerSpend = {
    action: "Accept",
    ...redeemer,
  };
  const redeemerValidatorMint: KarbonRedeemerMint = {
    action: "Mint",
    ...redeemer,
  };
  const validatorMinterRedeemer = Data.to(1n); // Burn
  // end Redeemer
  const oRef = new Constr(0, [String(utxo.txHash), BigInt(utxo.outputIndex)]);

  // assetName
  const oRefCBOR = Data.to(oRef);
  const assetName = blake2bHex(fromHex(oRefCBOR), undefined, 28);
  const carbonMintAssets = { [policyIDCarbon + assetName]: redeemer.amount };
  // Transaction
  const tx = await lucid
    .newTx()
    .readFrom(refutxo)
    .collectFrom([utxo], Data.to(redeemerValidatorSpend, KarbonRedeemerSpend))
    .pay.ToAddress(DeveloperAddress, { ...carbonMintAssets, lovelace: 100n })
    .attach.SpendingValidator(validatorContract)
    .mintAssets(burnedAssets, validatorMinterRedeemer)
    .attach.MintingPolicy(mintingValidator)
    .mintAssets(
      carbonMintAssets,
      Data.to(redeemerValidatorMint, KarbonRedeemerMint)
    )
    .attach.MintingPolicy(validatorContract)
    .addSigner(await privateKeytoAddress(SIGNER1))
    .addSigner(await privateKeytoAddress(SIGNER2))
    .complete();

  const signed = await multiSignwithPrivateKey(tx, [SIGNER1, SIGNER2]);
  const txHash = await submit(signed);

  console.log("-----------ProjectAccept---------");
  console.log("txHash: ", txHash);
  console.log("minted-assetname: ", assetName);
  console.log("burned-policyID+AssetName: ", burnedAssets);
  console.log("minted-policyID+AssetName: ", carbonMintAssets);
}
