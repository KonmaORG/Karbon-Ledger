import { Blockfrost, Koios, Network, Provider } from "@lucid-evolution/lucid";
const BF_URL = process.env.NEXT_PUBLIC_BF_URL!;
const BF_PID = process.env.NEXT_PUBLIC_BF_PID!;
const NETWORKx = process.env.NEXT_PUBLIC_CARDANO_NETWORK as Network;

export const NETWORK: Network = NETWORKx;
export const provider: Provider = new Blockfrost(BF_URL, BF_PID);
// export const provider: Provider = new Koios("/koios");
