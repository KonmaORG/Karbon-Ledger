import { getAddress } from "@/lib/utils";
import { ValidatorContract, ValidatorMinter } from "./scripts/scripts";
import { mintingPolicyToId, Validator } from "@lucid-evolution/lucid";

export const SIGNER1 = process.env.NEXT_PUBLIC_SIGNER_1 as string;
export const SIGNER2 = process.env.NEXT_PUBLIC_SIGNER_2 as string;
export const SIGNER3 = process.env.NEXT_PUBLIC_SIGNER_3 as string;



export const VALIDATOR_CONTRACT_ADDRESS = getAddress(ValidatorContract);
export const VALIDATOR_MINTER: Validator = ValidatorMinter();
export const PID_MINTER = mintingPolicyToId(VALIDATOR_MINTER);