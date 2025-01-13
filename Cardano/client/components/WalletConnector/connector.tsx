'use client';
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Snippet } from "@nextui-org/snippet";
import { Skeleton } from "@nextui-org/skeleton";
import { Wallet } from "@/types/cardano";
import { handleError } from "@/lib/utils";
import { useWallet } from "@/context/walletContext";
import { mkLucid } from "@/lib/lucid";
import { SUPPORTEDWALLETS } from "./wallets";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, LogOut } from 'lucide-react';
import { Button } from "../ui/button";
import Image from "next/image";
export default function WalletComponent() {
    const [walletConnection, setWalletConnection] = useWallet();
    const { lucid, address, balance } = walletConnection;

    const [wallets, setWallets] = useState<Wallet[]>(SUPPORTEDWALLETS);
    const [isOpen, setIsOpen] = useState(false);
    const [connecting, setConnecting] = useState<boolean>(false);

    useEffect(() => {
        mkLucid(setWalletConnection);

        const installedWallets: Wallet[] = [];
        const { cardano } = window;
        for (const c in cardano) {
            const wallet = cardano[c];

            if (!wallet.apiVersion) continue;
            installedWallets.push(wallet);
        }
        const updatedPreWallets = wallets.map((preWallet) => {
            const matchingWallet = installedWallets.find((provider) =>
                provider.name.toLowerCase().includes(preWallet.name.toLowerCase())
            );
            return {
                ...preWallet,
                ...(matchingWallet && { enable: matchingWallet.enable })
            };
        });

        setWallets(updatedPreWallets);
    }, []);

    async function onConnectWallet(wallet: Wallet) {
        setConnecting(true);
        setIsOpen(false);
        try {
            if (!lucid) throw "Uninitialized Lucid!!!";

            const api = await wallet.enable();

            lucid.selectWallet.fromAPI(api);

            const address = await lucid.wallet().address();
            const balance = parseInt(await api.getBalance())

            setWalletConnection((prev) => {
                return { ...prev, wallet, address, balance };
            });
        } catch (error) {
            setConnecting(false);
            handleError(error);
        }
        setConnecting(false);
    }


    function disconnect() {
        setWalletConnection((prev) => {
            return {
                ...prev,
                wallet: undefined,
                address: "",
                balance: undefined,
            };
        });
    }



    return (
        <div className="flex flex-col gap-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6">
            {address ? (
                <Button variant="outline" onClick={disconnect}><LogOut />Disconnect</Button>
            ) :
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button disabled={connecting}>{connecting ? "Connecting..." : "Connect Wallet"}</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">

                        <DialogHeader>
                            <DialogTitle>Connect Wallet</DialogTitle>
                            <DialogDescription>
                                Choose a wallet to connect to your account.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-4 py-4 w-full">
                            {wallets.map((wallet) => (
                                <Button
                                    key={wallet.name}
                                    onClick={() => onConnectWallet(wallet)}
                                    disabled={!wallet.enable}
                                    className="w-full"
                                >
                                    <Image src={wallet.icon} alt={wallet.name} width={20} height={20} />
                                    {wallet.name}
                                </Button>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            }
        </div>
    );
}