import { Constr, Data, TLiteral, WalletApi } from "@lucid-evolution/lucid";
import { Exo } from "next/font/google";

/**
 * Wallet type definition
 */
export type Wallet = {
  name: string;
  icon: string;
  apiVersion: string;
  enable(): Promise<WalletApi>;
  isEnabled(): Promise<boolean>;
};


export const OrefSchema = Data.Object({
  transaction_id: Data.Bytes(),
  output_index: Data.Integer(),
});


//#region Enum
export type AcceptRejectAction = "Accept" | "Reject";
export const AcceptRejectAction = {
  Accept: {
    Title: "Accept",
    Schema: Data.Literal("Accept"),
    Constr: new Constr(0, []),
  },
  Reject: {
    Title: "Reject",
    Schema: Data.Literal("Reject"),
    Constr: new Constr(1, []),
  },
};
export const AcceptRejectActionSchema = Data.Enum([
  AcceptRejectAction.Accept.Schema,
  AcceptRejectAction.Reject.Schema,
]);
//#endregion
//#region Redeemer

export const KarbonRedeemerSpendSchema = Data.Object({
  action: AcceptRejectActionSchema,
  amount: Data.Integer(),
  oref: OrefSchema,
});
export type KarbonRedeemerSpend = Data.Static<typeof KarbonRedeemerSpendSchema>;
export const KarbonRedeemerSpend =
  KarbonRedeemerSpendSchema as unknown as KarbonRedeemerSpend;


// ...........................

export const IdentificationRedeemerSchema = Data.Enum([
  Data.Literal("Mint"),
  Data.Literal("Burn"),
]);
export type IdentificationRedeemer = Data.Static<
  typeof IdentificationRedeemerSchema
>;
export const IdentificationRedeemer =
  IdentificationRedeemerSchema as unknown as IdentificationRedeemer;
//------------------------------------------------

export const AcceptRedeemerSchema = Data.Enum([
  Data.Literal("Accept"),
  Data.Literal("Reject"),
]);

export type AcceptRedeemer = Data.Static<typeof AcceptRedeemerSchema>;
export const AcceptRedeemer = AcceptRedeemerSchema as unknown as AcceptRedeemer;
//----------------------------------------

//----------------------------------------------
export const KarbonRedeemerMintSchema = Data.Object({
  action: IdentificationRedeemerSchema,
  oref: Data.Bytes(),
  amount: Data.Integer(),
});

export type KarbonRedeemerMint = Data.Static<typeof KarbonRedeemerMintSchema>;
export const KarbonRedeemerMint =
  KarbonRedeemerMintSchema as unknown as KarbonRedeemerMint;
//#endregion

//#region Datum

export const AssetClassSchema = Data.Object({
  policyid: Data.Bytes(),
  asset_name: Data.Bytes(),
});

export type AssetClass = Data.Static<typeof AssetClassSchema>;
export const AssetClass = AssetClassSchema as unknown as AssetClass;
//--------------------------------------------------------
export const Atleast = Data.Integer();

//-----------------------------
export const MultisigSchema = Data.Object({
  required: Atleast,
  signers: Data.Array(Data.Bytes()),
});
export type Multisig = Data.Static<typeof MultisigSchema>;
export const Multisig = MultisigSchema as unknown as Multisig;
//-----------------------------------

export const ConfigDatumSchema = Data.Object({
  fees_address: Data.Bytes(),
  fees_amount: Data.Integer(),
  fees_asset_class: AssetClassSchema,
  spend_address: Data.Bytes(),
  categories: Data.Array(Data.Bytes()),
  multisig_validator_group: MultisigSchema,
  multisig_refutxoupdate: MultisigSchema,
});
export type ConfigDatum = Data.Static<typeof ConfigDatumSchema>;
export const ConfigDatum = ConfigDatumSchema as unknown as ConfigDatum;
//----------------------------------------------------
export const KarbonDatumSchema = Data.Object({
  developer: Data.Bytes(),
  document: Data.Bytes(),
  categories: Data.Bytes(),
  asset_name: Data.Bytes(),
  fees_amount: Data.Integer(),
  fees_asset_class: AssetClassSchema,
});
export type KarbonDatum = Data.Static<typeof KarbonDatumSchema>;
export const KarbonDatum = KarbonDatumSchema as unknown as KarbonDatum;
//----------------------------------------------
