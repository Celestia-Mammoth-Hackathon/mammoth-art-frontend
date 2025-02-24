import { nfts } from "@/constants/nfts";
import { DropState } from "../store";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { ethers } from "ethers";
import indexer from "@/utils/indexer";
import axios from "axios";

export const getPrice = (nft: any) => {
  let price = nft.drop?.price ? Number(ethers.utils.formatEther(ethers.BigNumber.from(nft.drop.price))) : (nft.price || 0);
  if (nft.priceTiers && nft.priceTiers.length > 0) {
    for (const tier of nft.priceTiers) {
      if (nft.mintedSupply >= tier.qty) {
        price = tier.price;
      }
    }
  }
  return price;
}

export const getAllTokenStaticMetadata = (tokenAddress: string, tokenIds: string[]) => {
  let tokens = [];
  for (const tokenId of tokenIds) {
    const nft = nfts.find((nftItem) => {
      if (nftItem.tokens && nftItem.tokens.length > 0) {
        return nftItem.tokenAddress.toLowerCase() === tokenAddress.toLowerCase() && nftItem.tokens.find(t => t.id === tokenId);
      }
      return nftItem.tokenAddress.toLowerCase() === tokenAddress.toLowerCase() && nftItem.tokenId === tokenId;
    });

    if (nft?.tokens && nft?.tokens.length > 0) {
      const tokenMeta = nft.tokens.find(t => t.id === tokenId);
      if (tokenMeta) {
        nft.metadata = tokenMeta;
      }
    }
    if (nft) {
      tokens.push({ ...nft });
    }
  }
  return tokens;
};

export const getTokenStaticMetadata = async (contractAddress: string, tokenId: string) => {
  const nft = nfts.find((nftItem) => {
    if (nftItem.tokens && nftItem.tokens.length > 0) {
      return nftItem.tokenAddress.toLowerCase() === contractAddress.toLowerCase() && nftItem.tokens.find(t => t.id === tokenId);
    }
    return nftItem.tokenAddress.toLowerCase() === contractAddress.toLowerCase() && nftItem.tokenId === tokenId;
  });

  if (nft?.tokens && nft?.tokens.length > 0) {
    const tokenMeta = nft.tokens.find(t => t.id === tokenId);
    if (tokenMeta) {
      nft.metadata = tokenMeta;
    }
  }

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

export const getMatchingTokens = async (formaCollection: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ZIP_SERVER_URL}/matching_tokens`,
      // `http://localhost:3001/matching_tokens`,
    JSON.stringify({ formaCollection: formaCollection }),
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      
    }
    );

    if (!response.data.success) {
      throw new Error('Failed to get matching tokens');
    }
    return response.data.matchingTokens;
  } catch (error) {
    console.error("Error getting matching tokens:", error);
    return [];
  }
}

export const getRevealMetadata = async (collectionAddress: string, collectionSize: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ZIP_SERVER_URL}/revealed_metadata`,
      // `http://localhost:3001/revealed_metadata`,
    JSON.stringify({ collectionAddress: collectionAddress, collectionSize: collectionSize }),
    {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      
    }
    );

    if (!response.data.success) {
      throw new Error('Failed to get revealed metadata');
    }
    console.log(response.data);
    return {
      tokenIds: response.data.tokenIds,
      metadata: response.data.metadata
    };  
  } catch (error) {
    console.error("Error getting matching tokens:", error);
    return [];
  }
}

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
