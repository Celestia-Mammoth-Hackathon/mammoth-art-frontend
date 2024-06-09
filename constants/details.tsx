const tokenAddress: string = process.env.NEXT_PUBLIC_TOKEN_ADDRESS!;
const tokenId: string = process.env.NEXT_PUBLIC_TOKEN_ID!;
const tokenType: string = process.env.NEXT_PUBLIC_TOKEN_TYPE!;
export const appName: string = process.env.NEXT_PUBLIC_APP_NAME!;
export const walletConnectProjectId: string = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!;
export const dropAddress: `0x${string}` = process.env.NEXT_PUBLIC_DROP_ADDRESS!;
export const marketplaceAddress: `0x${string}` = process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS!;
export const chainName: string = process.env.NEXT_PUBLIC_CHAIN_NAME!;
export const chainMoniker: string = process.env.NEXT_PUBLIC_CHAIN_MONIKER!;
export const chainRPC: string = process.env.NEXT_PUBLIC_CHAIN_RPC!;
export const chainId: number = Number(process.env.NEXT_PUBLIC_CHAIN_ID!);
export const chainNetwork: string = process.env.NEXT_PUBLIC_CHAIN_NETWORK!;
export const chainExplorerName: string = process.env.NEXT_PUBLIC_CHAIN_EXPLORER_NAME!;
export const chainExplorerURL: string = process.env.NEXT_PUBLIC_CHAIN_EXPLORER_URL!;
export const chainBridgeURL: string = process.env.NEXT_PUBLIC_BRIDGE_URL!;
export const isMainnet = chainMoniker === 'forma';

if (!appName || !walletConnectProjectId || !tokenAddress || tokenId === "" || !tokenType || !dropAddress || !marketplaceAddress || !chainName || !chainMoniker || !chainRPC || isNaN(chainId) || !chainNetwork || !chainExplorerName || !chainExplorerURL || !chainBridgeURL) {
  throw new Error('One or more environment variables are missing.');
}

export const artistAddresses = [
  {
    slug: "codecrafting",
    artistAddress:"0xc0de00000dE60f7F19C70311982e74c854E0ef6C",
    name: "Codecrafting",
    bio: "mystery",
    profilePic: "/images/artists/codecrafting.png",
    bannerPic: "/images/artists/ccbanner.jpg",
    links: [
      {
          title: "",
          icon: "x",
          url: "https://twitter.com/mycodecrafting",
      },
    ],
    collections: [
      {
        tokenAddress: "0x0aa7a608343faf8c0db275205d1eaf70585103e8",
        tokenId: "0",
        type: "ERC1155",
      },
    ],
  },
  {
    slug: "nic-hamilton",
    artistAddress: "0x518201899E316bf98c957C73e1326b77672Fe52b",
    name: "Nic Hamilton",
    bio: "Nic Hamilton is an artist who works with digital imagery, blending video, AI, code and installations. His work is practice-led and informed by architecture, software, nature, the online world and underground music culture.",
    profilePic: "/images/artists/nic.jpg",
    bannerPic: "/images/gloverinterface_header_1800x500_.jpg",
    links: [
      {
          title: "",
          icon: "x",
          url: "https://twitter.com/_nic_hamilton_",
      },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0xf14eee1d7ec4a417bfd99c08a4f7ffca73ca5dcc" : "0x063eA336c397d8112bcd7707164148cCCBEfB218",
        tokenId: "0",
        type: "ERC1155",
      },
    ],
  },
  {
    slug: "acrb",
    artistAddress: "0x7af35AACf09082a535119c18E2a565BA947C5B40",
    name: "ACRB",
    bio: "Investigating the affordances and perils of autonomously evolving culture.",
    profilePic: "/images/artists/acrb.jpg",
    bannerPic: "/images/artists/acrb-banner.jpg",
    links: [
      {
          title: "",
          icon: "x",
          url: "https://twitter.com/__acrb__",
      },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0x1Ac85C299aB35E3dd768F39cA76Ba1bAC56d28f5" : "0xb6617f457b33e02e6bdd973c29376a192a5b0908",
        tokenId: "0",
        type: "ERC1155",
      },
      {
        tokenAddress: isMainnet ? "0x1Ac85C299aB35E3dd768F39cA76Ba1bAC56d28f5" : "0xb6617f457b33e02e6bdd973c29376a192a5b0908",
        tokenId: "1",
        type: "ERC1155",
      },
    ],
  },
];

export const nativeCurrency = {
  symbol: 'TIA',
  name: 'TIA',
  decimals: 18,
}
