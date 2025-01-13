import { NETWORK, provider } from "@/config/lucid";
import { WalletConnection } from "@/context/walletContext";
import { Lucid } from "@lucid-evolution/lucid";

export const mkLucid = async (
    setWalletConnection: (value: React.SetStateAction<WalletConnection>) => void
): Promise<void> => {
    try {
        const lucidInstance = await Lucid(
            provider,
            NETWORK
        );

        setWalletConnection((prev) => ({
            ...prev,
            lucid: lucidInstance,
        }));
    } catch (error) {
        console.error("Error initializing Lucid:", error);
    }
};