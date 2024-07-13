import { http } from 'wagmi'
import { createConfig } from '@privy-io/wagmi';
import { forma } from "@/config/chain";
import { chainName, chainMoniker, chainRPC, chainId, chainExplorerName, chainExplorerURL, nativeCurrency } from "../constants/details";

// Define RPC details
// const rpcUrl = { http: [chainRPC], webSocket: [chainRPC.replace('https://', 'wss://')] };
// export const forma = {
//   id: chainId,
//   name: chainName,
//   network: chainMoniker,
//   nativeCurrency,
//   rpcUrls: {
//     default: rpcUrl,
//     public: rpcUrl,
//   },
//   blockExplorers: {
//     default: { name: chainExplorerName, url: chainExplorerURL },
//   },
// };

export const wagmiConfig = createConfig({
  chains: [forma],
  transports: {
    [forma.id]: http(),
  },
});
