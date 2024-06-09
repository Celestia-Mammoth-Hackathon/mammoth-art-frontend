declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
      NEXT_PUBLIC_ALCHEMY_ID: string;
      NEXT_PUBLIC_TOKEN_ADDRESS: string;
      NEXT_PUBLIC_TOKEN_ID: string;
      NEXT_PUBLIC_TOKEN_TYPE: string;
      NEXT_PUBLIC_DROP_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_MARKETPLACE_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_CHAIN_NAME: string;
      NEXT_PUBLIC_CHAIN_MONIKER: string;
      NEXT_PUBLIC_CHAIN_RPC: string;
      NEXT_PUBLIC_CHAIN_ID: number;
      NEXT_PUBLIC_CHAIN_NETWORK: string;
      NEXT_PUBLIC_CHAIN_EXPLORER_URL: string;
      NEXT_PUBLIC_CHAIN_EXPLORER_NAME: string;
      NEXT_PUBLIC_BRIDGE_URL: string;
      NEXT_PUBLIC_INDEXER_API_URL: string;
    }
  }