import React from 'react'
import "../styles/app.sass";
import Layout from "@/components/Layout";
import type { AppProps } from "next/app";
import { UserProvider } from "context/user";
import { wagmiConfig } from "@/config/wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { forma } from "@/config/chain";
import { walletConnectProjectId } from '@/constants/details';
import { useRouter } from 'next/router';

// const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
//   <Text>
//     We <strong>HIGHLY</strong> reccomend everyone use desktop and the metamask browser extension at the moment
//   </Text>
// );

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  let loginMethods: ("wallet" | "email" | "sms" | "google" | "twitter" | "discord" | "github" | "linkedin" | "spotify" | "instagram" | "tiktok" | "apple" | "farcaster" | "telegram")[] = ['email', 'sms', 'wallet'];
  let landingHeader = 'Connect a Wallet';
  if (router.asPath === '/drop/modularsummit') {
    loginMethods = ['email'];
    landingHeader = 'Connect with Email';
  }

  return (
    <PrivyProvider
      appId={typeof window !== 'undefined' && window.location.hostname.endsWith('modularium.art') ? 'clyd28wj504pvrnubbcqjlpgl' : 'clxnlyg3300d5cfvojrsgoxgs'}
      config={{
        walletConnectCloudProjectId: walletConnectProjectId,
        appearance: {
          theme: 'dark',
          showWalletLoginFirst: true,
          walletList: [ 'metamask', 'wallet_connect', 'detected_wallets' ],
          landingHeader,
          logo: <></>,
        },
        loginMethods: loginMethods,
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
        defaultChain: forma,
        supportedChains: [forma],
      }}
    >
      <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
          <UserProvider>
            <Layout layoutNoOverflow footerHide={false}>
              <Component {...pageProps}/>
            </Layout>
          </UserProvider>
      </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}

export default MyApp;
