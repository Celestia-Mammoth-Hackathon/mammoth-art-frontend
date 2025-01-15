import { isoToTimestamp } from "../utils";
import { isMainnet } from "./details";

export type ExternalDrop = {
  startDate: number;
  endDate?: number;
  externalMintUri: string;
  externalPlatform: string;
  name: string;
  description: string;
  creator: string;
  creatorUri: string;
  previewImage: string;
  indexed: boolean;
  maxSupply?: string | number;
  price?: string;
  drop?: {
    id: number;
    tokenAddress: string;
    tokenId: string;
    minted: number;
    startDate: number;
    endDate?: number;
  }
};

export const externalDrops: ExternalDrop[] = [
  {
    startDate: isMainnet ? isoToTimestamp('2024-06-27T19:00:00Z') : isoToTimestamp('2024-06-25T16:00:00Z'),
    endDate: isMainnet ? isoToTimestamp('2024-06-30T19:00:00Z') : isoToTimestamp('2024-06-28T16:00:00Z'),
    externalMintUri: 'https://highlight.xyz/razorworks',
    externalPlatform: 'Highlight',
    name: 'Razor works',
    description: 'Dynamic razor clusters and cables. Generated on mint, each output is incrementally unique.',
    creator: 'xsten.eth',
    creatorUri: 'https://highlight.xyz/user/@xsten.eth',
    previewImage: '/images/external-drops/razor-works-800x800.png',
    indexed: true,
    drop: {
      id: 8,
      tokenAddress: "0x32e4d8f1c4AC038159206C5c2aA535482e4aE5Cd",
      tokenId: "0",
      minted: 7124,
      startDate: isMainnet ? isoToTimestamp('2024-06-27T19:00:00Z') : isoToTimestamp('2024-06-25T16:00:00Z'),
      endDate: isMainnet ? isoToTimestamp('2024-06-30T19:00:00Z') : isoToTimestamp('2024-06-28T16:00:00Z'),
    },
  },
  {
    startDate: isoToTimestamp('2024-09-26T15:00:00Z'),
    endDate: isoToTimestamp('2024-09-30T19:00:00Z'),
    externalMintUri: 'https://highlight.xyz/mint/forma:0x0466A3E3F64CE4780f4c073b5cA0540038C0BACe',
    externalPlatform: 'Highlight',
    name: 'The Master of Mountains',
    description: 'In the Master of Mountains, Delaunay triangulation generates unique geometric forms, blending algorithmic randomness and mathematical beauty in each piece.',
    creator: 'praystation',
    creatorUri: 'https://highlight.xyz/user/@praystation.eth',
    previewImage: '/images/external-drops/master-of-mountains-800x800.png',
    indexed: false,
    maxSupply: 'OPEN',
    price: '0.5 TIA',
  },
];
