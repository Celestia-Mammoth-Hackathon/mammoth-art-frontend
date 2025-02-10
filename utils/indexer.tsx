/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL!.replace(/\/$/, "");

const BASE_RAILWAY_URL = process.env.NEXT_PUBLIC_RAILWAY_INDEXER_API_URL!.replace(/\/$/, "");

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL!.replace(/\/$/, "");

const EXCLUDE_DROP_IDS = JSON.stringify((process.env.NEXT_PUBLIC_EXLUDE_DROP_IDS! || "1,2,3,4,5").split(","));

const DEFAULT_MAX_PAGES = 40;

const cache = new Map();
const CACHE_DURATION = 500;

const cachedAxiosPost = async (url: string, data: any) => {
  const cacheKey = JSON.stringify({ url, data });

  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (cachedData.promise) {
      return cachedData.promise;
    }
    if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.result;
    }
  }

  const resultPromise = axios.post(url, data);

  cache.set(cacheKey, { promise: resultPromise, timestamp: Date.now() });

  try {
    const result = await resultPromise;
    cache.set(cacheKey, { result, timestamp: Date.now() });
    setTimeout(() => cache.delete(cacheKey), CACHE_DURATION);
    return result;
  } catch (error) {
    cache.delete(cacheKey);
    throw error;
  }
};

const cachedAxiosGet = async (url: string) => {
  const cacheKey = url;

  if (cache.has(cacheKey)) {
    const cachedData = cache.get(cacheKey);
    if (cachedData.promise) {
      return cachedData.promise;
    }
    if (Date.now() - cachedData.timestamp < CACHE_DURATION) {
      return cachedData.result;
    }
  }

  const resultPromise = axios.get(url);

  cache.set(cacheKey, { promise: resultPromise, timestamp: Date.now() });

  try {
    const result = await resultPromise;
    cache.set(cacheKey, { result, timestamp: Date.now() });
    setTimeout(() => cache.delete(cacheKey), CACHE_DURATION);
    return result;
  } catch (error) {
    cache.delete(cacheKey);
    throw error;
  }
};

const getAllDrops = async () => {
    const query = `query AllDrops {
      drops(
        where: {id_not_in: ${EXCLUDE_DROP_IDS}, merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000"}
        orderBy: "id",
        orderDirection: "desc"
      ) {
        items {
          id
          startDate
          endDate
          maxAllowed
          maxPerWallet
          maxPerBlock
          price
          tokenAddress
          tokenId
          minted
          merkleRoot
        }
      }
    }`;
    const {
      data: {
        data: { drops },
      },
    } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });

    if (drops.items.length > 0) {
      return drops.items;
    } else return [];
};

const getDropsByUser = async (userAddress: string) => {
  const query = `query DropsByUser {
    drops(
      where: {id_not_in: ${EXCLUDE_DROP_IDS}, creator: "${userAddress}"}
      orderBy: "id",
      orderDirection: "desc",
    ) {
      items {
        id
        startDate
        endDate
        maxAllowed
        maxPerWallet
        price
        tokenAddress
        tokenId
        minted
        merkleRoot
      }
    }
  }`; 
  const {
    data: {
      data: { drops },
    },
  } = await cachedAxiosPost(`${BASE_RAILWAY_URL}/graphql`, { query });
  if (drops.items.length > 0) {
    return drops.items;
  } else return [];
} 
const getMerkleDrops = async () => {
  const query = `query MerkleDrops {
    drops(
      where: {id_not_in: ${EXCLUDE_DROP_IDS}, merkleRoot_not_in: "0x0000000000000000000000000000000000000000000000000000000000000000"}
      orderBy: "id",
      orderDirection: "desc"
    ) {
      items {
        id
        startDate
        endDate
        maxAllowed
        maxPerWallet
        maxPerBlock
        price
        tokenAddress
        tokenId
        minted
        merkleRoot
      }
    }
  }`;
  const {
    data: {
      data: { drops },
    },
  } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });

  if (drops.items.length > 0) {
    return drops.items;
  } else return [];
};

const getAllTokens = async () => {
    const query = `
        query MyQuery {
          tokens(where: {tokenId_lte: "1"}, limit: 1000) {
            items {
                    tokenAddress
                    tokenId
                    totalSupply
                    isMarketplaceAllowed
                }
            }
        }`;
    const {
      data: {
        data: { tokens },
      },
    } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });

    if (tokens.items.length > 0) {
      return tokens.items;
    } else return [];
};

export type GetAllCollectionTokensParams = {
  tokenAddress: string;
}

export type TokenRow = {
  tokenAddress: string;
  tokenId: string;
  tokenType: string;
  totalSupply: string;
  isMarketplaceAllowed: boolean;
  metadata?: any;
}

const getAllCollectionTokens = async ({ tokenAddress }: GetAllCollectionTokensParams): Promise<TokenRow[]> => {
  const res = await cachedAxiosGet(`${BASE_URL}/collection/${tokenAddress}/tokens`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export type GetCollectionTokenParams = {
  tokenAddress: string;
  tokenId: string;
}

const getCollectionToken = async ({ tokenAddress, tokenId }: GetCollectionTokenParams) => {
  const query = `query CollectionToken {
    tokens(
      where: {tokenAddress: "${tokenAddress}", tokenId: "${tokenId}"}
      limit: 1
    ) {
      items {
        tokenAddress
        tokenId
        totalSupply
        isMarketplaceAllowed
      }
    }
  }`;

  const {
    data: {
      data: { tokens },
    },
  } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });

  if (tokens.items.length > 0) {
    return tokens.items[0];
  }
};

export type GetAllOrdersParams = {
  tokenAddress: string;
  tokenId?: string;
  maxPages?: number;
  limit?: number;
}

const getAllOrders = async ({ tokenAddress, tokenId, maxPages, limit }: GetAllOrdersParams) => {
    let whereToken = `tokenAddress: "${tokenAddress}"`;
    if (tokenId !== undefined) {
      whereToken += `, tokenId: "${tokenId}"`;
    }
    const query = (cursor: string) => `query GetOrders {
      orders(
        limit: ${limit || 1000}
        orderBy: "price"
        orderDirection: "asc"
        where: {orderType: SELL, orderStatus: ACTIVE, ${whereToken}}
        ${cursor ? 'after: "' + cursor + '"' : ''}
      ) {
        items {
          id
          price
          qty
          filled
          tokenAddress
          tokenId
          validFrom
          validUntil
          makerId
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`;

    let ret: any[] = [];
    let cursor = "";
    for (let i = 0; i < (maxPages || DEFAULT_MAX_PAGES); i++) {
      const {
        data: {
          data: { orders },
        },
      } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query: query(cursor) });
      if (orders.items.length > 0) {
        ret = [ ...ret, ...orders.items ];
      }
      if (orders.pageInfo.hasNextPage) {
        cursor = orders.pageInfo.endCursor;
      } else {
        break;
      }
    }
    return ret;
};

export type GetUserBalanceParams = {
  userAddress: string;
  maxPages?: number;
}

export type GetTokenMetadataParams = {
  tokenAddress: string;
  tokenId: string;
}

// const getUserBalance = async ({ userAddress, maxPages }: GetUserBalanceParams) => {
//   const query = (cursor: string) => `query AccountTokenBalances {
//     account(
//       id: "${userAddress}"
//       ${cursor ? 'after: "' + cursor + '"' : ''}
//     ) {
//       id
//       tokens(limit: 1000, where: {balance_gt: "0"}) {
//         items {
//           tokenAddress
//           tokenId
//           balance
//         }
//         pageInfo {
//           hasNextPage
//           endCursor
//         }
//       }
//     }
//   }`;

//   let ret: any[] = [];
//   let cursor = "";
//   for (let i = 0; i < (maxPages || DEFAULT_MAX_PAGES); i++) {
//     const {
//       data: {
//         data: { account },
//       },
//     } = await cachedAxiosPost(`${BASE_RAILWAY_URL}/graphql`, { query: query(cursor) });
//     if (account?.tokens?.items.length > 0) {
//       ret = [ ...ret, ...account.tokens.items ];
//     }
//     if (account?.tokens?.pageInfo?.hasNextPage) {
//       cursor = account.tokens?.pageInfo?.endCursor;
//     } else {
//       break;
//     }
//   }
//   return ret;
// };

const getUserBalance = async ({ userAddress }: GetUserBalanceParams) => {
  const res = await cachedAxiosGet(`${BASE_API_URL}/wallet/${userAddress}/tokens`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
}

const getTokenMetadata = async ({ tokenAddress, tokenId = "1" }: GetTokenMetadataParams) => {
  const res = await cachedAxiosGet(`${BASE_API_URL}/collection/${tokenAddress}/${tokenId}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
}

export type GetUserTokenBalanceParams = {
  userAddress: string;
  tokenAddress: string;
  tokenId: string;
}

const getUserTokenBalance = async ({ userAddress, tokenAddress, tokenId }: GetUserTokenBalanceParams) => {
  const query = `query AccountTokenBalances {
    account(
      id: "${userAddress}"
    ) {
      id
      tokens(
        where: {tokenAddress: "${tokenAddress}", tokenId: "${tokenId}", balance_gt: "0"}
        limit: 1
      ) {
        items {
          balance
        }
      }
    }
  }`;

  const {
    data: {
      data: { account },
    },
  } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });

  if (account?.tokens?.items.length > 0) {
    return account?.tokens.items[0].balance;
  }
  return "0";
};

const getLastestPriceOracleUpdate = async () => {
  const query = `query LastestPriceOracleUpdate {
    priceOracleUpdates(orderBy: "block", orderDirection: "desc", limit: 1) {
      items {
        usd24HourChange
        usd
        timestamp
        block
      }
    }
  }`;
  const {
    data: {
      data: { priceOracleUpdates },
    },
  } = await cachedAxiosPost(`${BASE_URL}/graphql`, { query });
  if (priceOracleUpdates?.items && priceOracleUpdates?.items.length > 0) {
    return priceOracleUpdates.items[0];
  }
};

const getCollectionStats = async ({ tokenAddress }: { tokenAddress: string }) => {
  const res = await axios.get(`${BASE_URL}/stats/${tokenAddress}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

const getTokenStats = async ({ tokenAddress, tokenId }: { tokenAddress: string, tokenId: string }) => {
  const res = await axios.get(`${BASE_URL}/stats/${tokenAddress}/${tokenId}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

const getTokenActivity = async ({ tokenAddress, tokenId }: { tokenAddress: string, tokenId: string }): Promise<ActivityRow[]> => {
  const res = await axios.get(`${BASE_URL}/activity/${tokenAddress}/${tokenId}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

enum EventType {
  MAKE = "MAKE",
  CANCEL = "CANCEL",
  TAKE = "TAKE"
}

export type ActivityRow = {
  event: EventType;
  timestamp: number;
  block: number;
  txhash: `0x${string}`;
  makerId: `0x${string}`;
  takerId: `0x${string}`;
  tokenAddress: `0x${string}`;
  tokenId: string;
  qty: number;
  price: number;
}

const getCollectionActivity = async ({ tokenAddress }: { tokenAddress: string }): Promise<ActivityRow[]> => {
  const res = await cachedAxiosGet(`${BASE_URL}/activity/${tokenAddress}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export type HolderRow = {
  ownerId: `0x${string}`;
  tokenAddress: `0x${string}`;
  tokenId: string;
  balance: string;
};

const getCollectionHolders = async ({ tokenAddress }: { tokenAddress: string }): Promise<HolderRow[]> => {
  const res = await cachedAxiosGet(`${BASE_URL}/holders/${tokenAddress}`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export type ListingRow = {
  tokenId: string;
  floorPrice: number;
  orderId: string;
}

const getCollectionFloorListings = async ({ tokenAddress }: { tokenAddress: string }): Promise<ListingRow[]> => {
  const res = await cachedAxiosGet(`${BASE_URL}/collection/${tokenAddress}/floor-listings`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export type FeuillerRow = {
  flowerNo: number;
  isComplete: boolean;
}

const getFeuillerLaMarguerite = async (): Promise<FeuillerRow[]> => {
  const res = await cachedAxiosGet(`${BASE_URL}/feuiller-la-marguerite`);
  if (!res || !res.data) {
    return [];
  }
  return res.data;
};

export default {
    getAllDrops,
    getMerkleDrops,
    getDropsByUser,
    getAllTokens,
    getAllCollectionTokens,
    getCollectionToken,
    getAllOrders,
    getUserBalance,
    getTokenMetadata,
    getUserTokenBalance,
    getLastestPriceOracleUpdate,
    getCollectionStats,
    getCollectionActivity,
    getCollectionHolders,
    getCollectionFloorListings,
    getFeuillerLaMarguerite,
    getTokenStats,
    getTokenActivity,
};
