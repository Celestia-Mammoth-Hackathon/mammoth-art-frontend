import "../styles/app.sass";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import '@rainbow-me/rainbowkit/styles.css';
import { UserProvider } from "context/user";
import { WalletProvider } from "context/wallet";
import { RainbowKitProvider, DisclaimerComponent } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi'
import React from 'react'
import { wagmiConfig, chains } from "@/config/wagmi";
import { customTheme } from "@/config/theme";

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    We <strong>HIGHLY</strong> reccomend everyone use desktop and the metamask browser extension at the moment
  </Text>
);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider 
                chains={chains}
                theme={customTheme}
                appInfo={{
                  appName: 'Ubiquity',
                  disclaimer: Disclaimer,
                }}
                modalSize="compact">
                  <WalletProvider>
                    <UserProvider>
                      <Layout layoutNoOverflow footerHide={false}>
                        <Component {...pageProps}/>
                      </Layout>
                    </UserProvider>
                  </WalletProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
