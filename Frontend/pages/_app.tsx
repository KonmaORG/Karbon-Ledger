import { Fragment, useEffect } from "react";
import Head from "next/head";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/router";
import "./global.css";
import WalletProvider from "@/context/walletProvider";

export default function MyApp(props: { Component: any; pageProps: any }) {
  const router = useRouter();
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const muiTheme = createTheme();

  return (
    <NextUIProvider navigate={router.push}>
      <Fragment>
        <Head>
          <title>Karbon Ledger</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <ThemeProvider theme={muiTheme}>
          <WalletProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </WalletProvider>
        </ThemeProvider>
      </Fragment>
    </NextUIProvider>
  );
}
