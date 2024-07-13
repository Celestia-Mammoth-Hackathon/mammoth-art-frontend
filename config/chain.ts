import { defineChain } from 'viem';
import { chainName, chainMoniker, chainRPC, chainId, chainExplorerName, chainExplorerURL, nativeCurrency } from "../constants/details";

const rpcUrl = { http: [chainRPC], webSocket: [chainRPC.replace('https://', 'wss://')] };

export const forma = defineChain({
  id: chainId,
  name: chainName,
  network: chainMoniker,
  nativeCurrency,
  rpcUrls: {
    default: rpcUrl,
    public: rpcUrl,
  },
  blockExplorers: {
    default: { name: chainExplorerName, url: chainExplorerURL },
  },
});
