import { applyDoubleCborEncoding, applyParamsToScript, Data, Validator } from "@lucid-evolution/lucid";
import {
    identification_nft_identification_nft_mint,
    config_datum_holder_config_datum_holder_spend,
    validator_contract_validator_contract_mint,
    validator_contract_validator_contract_mint_mint

} from "./plutus";
import { getPolicyId } from "@/libs/utils";

export const identificationPolicyid: Data = "bfe8d93cd78ecef16f4c9c104a12b64ea785257b6bf736c0389f6641"
//------------------------------------------------------------------
const identificationNFT_Mint = applyDoubleCborEncoding(
    identification_nft_identification_nft_mint
);


export function IdentificationNFT_MintValidator(params: any[]): Validator {
    return {
        type: "PlutusV3",
        script: applyParamsToScript(identificationNFT_Mint, params),
    }
};

//------------------------------------------------------------------
const configdatumholderscript = applyDoubleCborEncoding(
    config_datum_holder_config_datum_holder_spend
);

export function ConfigDatumHolderValidator(): Validator {
    return {
        type: "PlutusV3",
        script: configdatumholderscript,
    }
};

// --------------------------------------------------------------
const ValidatorContractScript = applyDoubleCborEncoding(
    validator_contract_validator_contract_mint
);
export function ValidatorContract(): Validator { //config_nft : PolicyId; validator_contract_mint: PolicyId
    const validatorMinterParam = getPolicyId(ValidatorMinter);
    return {
        type: "PlutusV3",
        script: applyParamsToScript(ValidatorContractScript, [identificationPolicyid, validatorMinterParam]),
    }
};


// --------------------------------------------------------------
const ValidatorMinterScript = applyDoubleCborEncoding(
    validator_contract_validator_contract_mint_mint
);
export function ValidatorMinter(): Validator { //config_nft : PolicyId;
    return {
        type: "PlutusV3",
        script: applyParamsToScript(ValidatorMinterScript, [identificationPolicyid]),
    }
};