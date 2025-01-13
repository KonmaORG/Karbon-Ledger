'use client';
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Snippet } from "@nextui-org/snippet";
import { EmulatorAccount, Lucid, paymentCredentialOf } from "@lucid-evolution/lucid";
import { Skeleton } from "@nextui-org/skeleton";
import { handleError } from "@/lib/utils";
import { useWallet } from "@/context/walletContext";
import { accountA, accountB, accountC, accountD, emulator } from "@/config/emulator";
import { Button } from "../ui/button";

export default function EmulatorConnectors() {
    const [walletConnection, setWalletConnection] = useWallet();
    const { lucid } = walletConnection;

    const [wallets, setWallets] = useState<EmulatorAccount[]>();

    let isInit = false;
    useEffect(() => {
        if (isInit) return;
        else isInit = true;
        Lucid(emulator, "Custom")
            .then((lucid) => {
                setWalletConnection((walletConnection) => {
                    return { ...walletConnection, lucid };
                })
                setWallets([accountA, accountB, accountC, accountD])
            }
            )
            .catch((error) =>
                // toast error
                console.log(error)
            );
    }, []);

    async function onConnectWallet(account: EmulatorAccount) {
        try {
            if (!lucid) throw "Uninitialized Lucid!!!";
            lucid.selectWallet.fromSeed(account.seedPhrase);
            const address = await lucid.wallet().address();

            setWalletConnection((walletConnection) => {
                return { ...walletConnection, address };
            });
            console.log("connected emulator wallet");
        } catch (error) {
            handleError(error);
        }
    }

    if (!wallets)
        return (
            <Snippet hideCopyButton hideSymbol variant="bordered">
                <Spinner label="Browsing Cardano Wallets" />
            </Snippet>
        );

    if (!wallets.length)
        return (
            <Snippet hideCopyButton hideSymbol variant="bordered">
                <p className="uppercase">No Cardano Wallet</p>
            </Snippet>
        );

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            {wallets.map((wallet, w) => {
                return (
                    <>
                        <Skeleton
                            key={`wallet.${w}`}
                            className="rounded-full"
                            isLoaded={!!lucid}
                        >
                            <Button
                                className="capitalize"
                                color="primary"
                                onClick={() => onConnectWallet(wallet)}
                            >
                                {`${wallet.address.slice(0, 30)}...${wallet.address.slice(-5)}`}
                            </Button>
                            {paymentCredentialOf(wallet.address).hash}
                        </Skeleton>
                    </>
                )
            })}
        </div>
    );
}



