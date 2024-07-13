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
  },
];
