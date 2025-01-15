"use client";
import { useEffect, useState } from "react";
import { Wallet } from "@/types/cardano";
import { handleError } from "@/lib/utils";
import { useWallet } from "@/context/walletContext";
import { mkLucid } from "@/lib/lucid";
import { SUPPORTEDWALLETS } from "./wallets";
import { LogOut } from "lucide-react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";

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
        provider.name.toLowerCase().includes(preWallet.name.toLowerCase()),
      );
      return {
        ...preWallet,
        ...(matchingWallet && { enable: matchingWallet.enable }),
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
      const balance = parseInt(await api.getBalance());

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
    <div>
      {address ? (
        <Button
          variant="outlined"
          onClick={disconnect}
          startIcon={<LogOut />}
          sx={{
            borderColor: "#0a3834",
            color: "#0a3834",
            borderRadius: "9999px",
          }}
        >
          Disconnect
        </Button>
      ) : (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            disabled={connecting}
            variant="contained"
            color="success"
            sx={{
              backgroundColor: "#0a3834",
              "&:hover": {
                backgroundColor: "#0c4640",
              },
              borderRadius: "9999px",
            }}
          >
            {connecting ? "Connecting..." : "Connect Wallet"}
          </Button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <DialogTitle>Connect Wallet</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Choose a wallet to connect to your account.
              </DialogContentText>
              <Grid container spacing={2} style={{ marginTop: "16px" }}>
                {wallets.map((wallet) => (
                  <Grid item xs={6} key={wallet.name}>
                    <Button
                      onClick={() => onConnectWallet(wallet)}
                      disabled={!wallet.enable}
                      fullWidth
                      variant="outlined"
                      startIcon={
                        <Image
                          src={wallet.icon}
                          alt={wallet.name}
                          width={20}
                          height={20}
                        />
                      }
                    >
                      {wallet.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
}
