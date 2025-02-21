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
  {
    slug: "fini",
    artistAddress: "0x40e46E07B71502D2D8d8285E2Ed1355CE966Ab9D",
    name: "Fini",
    bio: "Finis are digital beings that embody the emotional ties between people and the world around them.",
    profilePic: "/images/artists/fini.png",
    bannerPic: "/images/artists/fini-banner.png",
    links: [
      {
          title: "",
          icon: "x",
          url: "https://x.com/finidotworld",
      },
      {
        title: "Fini World",
        icon: "link",
        url: "https://fini.world",
    },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0xc1A9c67117127c859789c20c4042c0CD87325861" : "0x2487a76723F010CDE2504f793205B4930e33fb0F",
        tokenId: "0",
        type: "ERC721",
      },
    ],
  },
  {
    slug: "maelstrom",
    artistAddress: "0xc955f47333802c9064d655af97552cd49a87d777",
    name: "Maelstrom",
    bio: "With a cryptic history incorporating nearly two decades of aliases and side projects born out of free parties in warehouses, fields and basements, Maelstrom has delivered EPs for imprints such as CPU and Cultivated Electronics in the UK, or Private Persons in Moscow, while playing an all electro live set in clubs and raves, from Paris to London or Tokyo.",
    profilePic: "/images/artists/maelstrom.jpg",
    bannerPic: "/images/artists/maelstrom-banner.jpg",
    links: [
      {
        title: "SoundCloud",
        icon: "link",
        url: "https://soundcloud.com/maelstrom",
    },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0x330491d0a7F74E9592CC6c5b2CE2a25e20206784" : "0xbc738cc95d2d35e29d4b999d3e5036f37edc7e55",
        tokenId: "0",
        type: "ERC1155",
      },
    ],
  },
  {
    slug: "sarah-meyohas",
    artistAddress: "0xD5Fa40f560a30A517db861e9C9E1e6bE200b13CA",
    name: "Sarah Meyohas",
    bio: "Sarah Meyohas (b. 1991, New York) is a conceptual artist and pioneer in the field of crypto art. In 2015, Meyohas created Bitchcoin, a cryptocurrency backed by her physical artwork, which predated the launch of Ethereum and is the first tokenization of physical art on a blockchain, effectively a \"proto-NFT.\" Meyohas's practice provides an intelligible visual language to articulate the systems and complex operations that increasingly govern our world.",
    profilePic: "/images/artists/meyohas.jpg",
    bannerPic: "/images/artists/meyohas-cover.png",
    links: [
      {
        title: "",
        icon: "x",
        url: "https://x.com/SarahMeyohas",
      },
      {
        title: "Website",
        icon: "external-link",
        url: "https://www.sarahmeyohas.com/",
    },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0x460B1b0F69dEF9526DcE4E3e4B9754cfECe160be" : "0x77De4D1F147EA3863E80E4d08b5c3433892D0068",
        tokenId: "0",
        type: "ERC1155",
      },
    ],
  },
  {
    slug: "aura",
    artistAddress: "0xDaF8208B2b11FEbc4f92506Ab03Ced784827a21a",
    name: "Aura",
    bio: "Cultivating onchain wonders.",
    profilePic: "/images/artists/aura.png",
    bannerPic: "/images/artists/aura-banner.png",
    links: [
      {
        title: "",
        icon: "x",
        url: "https://x.com/__auras__",
      },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0x7b69fad7a6975ff5a34c06adc00e447ce24d2fc3" : "0xa230f012ffc26c332460c71a203aea29cc70f08d",
        tokenId: "0",
        type: "ERC1155",
      },
    ],
  },
  {
    slug: "celestine-sloth-society",
    artistAddress: "0x22230D9789B737627FC64a667A49aBBed44cdDc0",
    name: "Celestine Sloth Society",
    bio: "A group of extremely deliberate creatures dedicated to modular expansion.",
    profilePic: "/images/artists/sloths.png",
    bannerPic: "/images/artists/sloths-banner.jpg",
    links: [
      {
        title: "",
        icon: "x",
        url: "https://x.com/CelestineSloths",
      },
      {
        title: "Website",
        icon: "external-link",
        url: "https://www.celestineslothsociety.com/",
    },
    ],
    collections: [
      {
        tokenAddress: isMainnet ? "0x96971371a6f266f074d18f3c3ab7b77c5489923d" : "0xfb5e2491582b96100be5eec673943bd5af7f0c5f",
        tokenId: "0",
        type: "ERC1155",
      },
      {
        tokenAddress: isMainnet ? "0xEA30F63e08a0B01F8BCBE62037Ef810fBDB340Dc" : "0x16cd8DB7c97F4590C867b7fe7853a85D46311410",
        tokenId: "0",
        type: "ERC721",
      },
    ],
  },
];

export const nativeCurrency = {
  symbol: 'TIA',
  name: 'TIA',
  decimals: 18,
}
