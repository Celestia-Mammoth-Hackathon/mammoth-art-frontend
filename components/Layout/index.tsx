import { useEffect } from "react";
import { useRouter } from "next/router";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import cn from "classnames";
import styles from "./Layout.module.sass";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, base, zora],
    [
      alchemyProvider({ apiKey: "RBNALLRs6gTRtUEysoiVIlBOApoVg2FP" ?? "" }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: '4eb381bbc93fbca3ed9f372e8c934c8a',
    chains
  });
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

type LayoutProps = {
    layoutNoOverflow?: boolean;
    classHeader?: string;
    headerHide?: boolean;
    noRegistration?: boolean;
    lightHeader?: any;
    emptyHeader?: boolean;
    footerHide?: boolean;
    background?: string;
    children: React.ReactNode;
};

const Layout = ({
    layoutNoOverflow,
    classHeader,
    noRegistration,
    headerHide,
    lightHeader,
    emptyHeader,
    footerHide,
    background,
    children,
}: LayoutProps) => {
    const { pathname } = useRouter();

    useEffect(() => {
        clearQueueScrollLocks();
        enablePageScroll();
    }, [pathname]);

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider 
                chains={chains}
                theme={darkTheme({
                    accentColor: '#FF6B6B',
                    borderRadius: 'small',
                    fontStack: 'system',
                })}>
                <>
                    <Head>
                        <title>Ubiquity.art</title>
                    </Head>
                    <div
                        className={cn(styles.layout, {
                            [styles.noOverflow]: layoutNoOverflow,
                        })}
                        style={{ backgroundColor: background }}
                    >
                        {!headerHide && (
                            <Header
                                className={classHeader}
                                noRegistration={noRegistration}
                                light={lightHeader}
                                empty={emptyHeader}
                            />
                        )}
                        <div className={styles.inner}>{children}</div>
                        {!footerHide && <Footer />}
                    </div>
                </>
            </RainbowKitProvider>
        </WagmiConfig>
        
    );
};

export default Layout;
