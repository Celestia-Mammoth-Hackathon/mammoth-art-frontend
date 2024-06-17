import { nfts } from "@/constants/nfts";
import { DropState } from "../store";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import indexer from "@/utils/indexer";

export const getTokenStaticMetadata = async (contractAddress: string, tokenId: string) => {
  const nft = nfts.find((nftItem) => {
      return nftItem.tokenAddress.toLowerCase() === contractAddress.toLowerCase() && nftItem.tokenId === tokenId;
  });

  if (nft?.slug === 'finis-milo') {
    const oracleUpdate = await indexer.getLastestPriceOracleUpdate();
    if (oracleUpdate) {
      if (nft.states?.neutral.metadata) {
        nft.metadata = nft.states?.neutral.metadata;
      }
      nft.cloudflareCdnId = nft.states?.neutral.cloudflareCdnId;
      if (oracleUpdate.usd24HourChange < -1) {
        if (nft.states?.sad.metadata) {
          nft.metadata = nft.states?.sad.metadata;
        }
        nft.cloudflareCdnId = nft.states?.sad.cloudflareCdnId;
      }
      if (oracleUpdate.usd24HourChange > 1) {
        if (nft.states?.happy.metadata) {
          nft.metadata = nft.states?.happy.metadata;
        }
        nft.cloudflareCdnId = nft.states?.happy.cloudflareCdnId;
      }
    }
  }

  return nft ? { ...nft } : null;
}

export const getStaticMetadata = (contractAddress: string, contractType: string) => {
  const nft = nfts.filter((nftItem) => {
      return nftItem.tokenAddress === contractAddress && nftItem.contractType === contractType;
  });

  return nft ? nft : null;
};

export const isPrimarySaleActive = (startTime: number, endTime: number) => {
  const currentTime = Math.floor(Date.now()); // Get current time in seconds

  return currentTime >= startTime && currentTime <= endTime;
};

export const getDropState = (drop: any, token: any): DropState => {
  const startTime = new Date(Number(drop.startDate) * 1000).getTime();
  const endTime = new Date(Number(drop.endDate) * 1000).getTime();
  const currentTime = Math.floor(Date.now());

  if (currentTime < startTime || startTime === 0) {
    return DropState.NotStarted;
  }

  if (currentTime <= endTime) {
    if (drop.maxAllowed > 0 && drop.minted >= drop.maxAllowed) {
      // if (token.isMarketplaceAllowed) {
      //   return DropState.SecondaryListingsActive;
      // }
      return DropState.SoldOut;
    }
    return DropState.InProgress;
  }

  return token.isMarketplaceAllowed
    ? DropState.SecondaryListingsActive
    : DropState.SecondaryListingsNone;
};

export const truncateDescription = (description: string, maxLen: number = 300) => {
  if (description.length <= maxLen) {
    return description;
  }

  const truncated = description.slice(0, maxLen);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return `${truncated.slice(0, lastSpaceIndex)}...`;
}

export const addressInMerkleTree = (token: any, address: string): boolean => {
  const tree = StandardMerkleTree.load(token.merkleTree)
  for (const [_i, v] of tree.entries()) {
    if (v[0].toLocaleLowerCase() === address.toLocaleLowerCase()) {
      return true;
    }
  }
  return false;
}
