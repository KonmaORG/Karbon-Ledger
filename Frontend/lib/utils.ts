import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NETWORK, provider } from "@/config/lucid";
import {
  ConfigDatumHolderValidator,
  identificationPolicyid,
} from "@/config/scripts/scripts";
import {
  fromText,
  LucidEvolution,
  makeWalletFromPrivateKey,
  mintingPolicyToId,
  Script,
  TxSignBuilder,
  Validator,
  validatorToAddress,
} from "@lucid-evolution/lucid";
import { PID_MINTER, VALIDATOR_CONTRACT_ADDRESS } from "@/config/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function req(path: string, req?: RequestInit) {
  const rsp = await fetch(path, { ...req, cache: "no-cache" });

  if (!rsp.ok) {
    throw {
      code: rsp.status,
      info: rsp.statusText,
    };
  }

  return rsp.json();
}

export function handleSuccess(success: any) {
  // toast(`${success}`, { type: "success" });
  console.log(success);
}

export function handleError(error: any) {
  const { info, message } = error;

  function toJSON(error: any) {
    try {
      const errorString = JSON.stringify(error);
      const errorJSON = JSON.parse(errorString);

      return errorJSON;
    } catch {
      return {};
    }
  }

  const { cause } = toJSON(error);
  const { failure } = cause ?? {};

  const failureCause = failure?.cause;
  const failureInfo = failureCause?.info;
  const failureMessage = failureCause?.message;

  // toast(`${failureInfo ?? failureMessage ?? info ?? message ?? error}`, {
  // type: "error",
  // });
  console.error(failureCause ?? { error });
}

export function adaToLovelace(float: string) {
  const [ada, lovelace] = float.split(".");

  return BigInt(ada) * 1_000000n + BigInt(lovelace || 0);
}

export function getAddress(validatorFunction: { (): Validator; (): Script }) {
  const validator: Validator = validatorFunction();
  const address = validatorToAddress(NETWORK, validator);
  return address;
}
export function getPolicyId(validatorFunction: { (): Validator; (): Script }) {
  const validator: Validator = validatorFunction();
  const policyID = mintingPolicyToId(validator);
  return policyID;
}

export async function refUtxo(lucid: LucidEvolution) {
  const address = getAddress(ConfigDatumHolderValidator);
  const utxos = await lucid.utxosAt(address);

  const ref_configNFT = {
    [identificationPolicyid + fromText("KarbonIdentificationNFT")]: 1n,
  };
  const utxoWithIdentificationToken = utxos.filter((utxo) => {
    const assets = utxo.assets;

    return Object.keys(ref_configNFT).some(
      (key) => assets[key] === ref_configNFT[key],
    );
  }); // replace with lucid.findUtxowithUnit()

  return utxoWithIdentificationToken;
}

export async function privateKeytoAddress(privateKey: string) {
  const privateeyAddress = await makeWalletFromPrivateKey(
    provider,
    NETWORK,
    privateKey,
  ).address();
  return privateeyAddress;
}

export async function multiSignwithPrivateKey(
  tx: TxSignBuilder,
  privateKeys: string[],
) {
  let signed = tx;
  for (const privateKey of privateKeys) {
    signed = await signWithPrivateKey(signed, privateKey);
  }
  return signed;
}
export async function signWithPrivateKey(
  tx: TxSignBuilder,
  privateKey: string,
) {
  const signed = await tx.sign.withPrivateKey(privateKey);
  return signed;
}

// export async function getProjectUtxos(lucid: LucidEvolution) {
//   const utxos = await lucid.utxosAt(VALIDATOR_CONTRACT_ADDRESS)
//   console.log(utxos, "utxos")
//   const filteredUtxos = utxos.filter((utxo) => {
//     const assets = utxo.assets;
//     return Object.keys(assets).some((key) => key.startsWith(PID_MINTER));
//   });

//   return filteredUtxos
// }
