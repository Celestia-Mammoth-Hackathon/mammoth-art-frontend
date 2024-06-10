import { createConfig, configureChains, Chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    coinbaseWallet,
    injectedWallet, 
    walletConnectWallet,
    ledgerWallet, // ledgerWallet,
    metaMaskWallet, 
    omniWallet, // omniWallet,
    rainbowWallet,
    trustWallet,
  } from '@rainbow-me/rainbowkit/wallets';
import { appName, walletConnectProjectId, chainName, chainMoniker, chainRPC, chainId, chainExplorerName, chainExplorerURL, nativeCurrency } from "../constants/details";

// Define RPC details
const chain : Chain = {
  id: chainId,
  name: chainName,
  network: chainMoniker,
  nativeCurrency,
  rpcUrls: {
    default: { http: [chainRPC] },
    public: { http: [chainRPC] },
  },
  blockExplorers: {
    default: { name: chainExplorerName, url: chainExplorerURL },
  },
};

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ chain ],
  [ publicProvider() ]
);

const connectorConfig = {
  chains,
  publicClient,
  appName,
  projectId: walletConnectProjectId,
};

const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet(connectorConfig),
        // injectedWallet(connectorConfig),
        // walletConnectWallet(connectorConfig),
        // ledgerWallet(connectorConfig),
      ],
    },
    // {
    //   groupName: 'More',
    //   wallets: [
    //     coinbaseWallet(connectorConfig),
    //     omniWallet(connectorConfig),
    //     rainbowWallet(connectorConfig),
    //     trustWallet(connectorConfig),
    //     argentWallet(connectorConfig),
    //   ],
    // },
  ]);

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient,
});

export {
  wagmiConfig,
  chains,
};