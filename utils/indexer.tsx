/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL!;

const EXCLUDE_DROP_IDS = JSON.stringify((process.env.NEXT_PUBLIC_EXLUDE_DROP_IDS! || "1").split(","));

const DEFAULT_MAX_PAGES = 10;

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
    } = await axios.post(`${BASE_URL}`, { query });

    if (drops.items.length > 0) {
      return drops.items;
    } else return [];
};

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
  } = await axios.post(`${BASE_URL}`, { query });

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
    } = await axios.post(`${BASE_URL}`, { query });

    if (tokens.items.length > 0) {
      return tokens.items;
    } else return [];
};

export type GetAllOrdersParams = {
  tokenAddress: string;
  tokenId?: string;
  maxPages?: number;
}

const getAllOrders = async ({ tokenAddress, tokenId, maxPages }: GetAllOrdersParams) => {
    let whereToken = `tokenAddress: "${tokenAddress}"`;
    if (tokenId !== undefined) {
      whereToken += `, tokenId: "${tokenId}"`;
    }
    const query = (cursor: string) => `query GetOrders {
      orders(
        limit: 1000
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
      } = await axios.post(`${BASE_URL}`, { query: query(cursor) });
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

const getUserBalance = async (userAddress:string) => {
    const query = `
        query MyQuery {
            account(id: "${userAddress}") {
            id
            tokens(limit: 1000) {
                items {
                    tokenAddress
                    tokenId
                    balance
                }
            }
            }
        }`
    ;

    const {
        data: {
          data: { account },
        },
    } = await axios.post(`${BASE_URL}`, { query });
    if (account?.tokens?.items) {
      return account.tokens.items;
    } else return [];
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
  } = await axios.post(`${BASE_URL}`, { query });
  if (priceOracleUpdates?.items && priceOracleUpdates?.items.length > 0) {
    return priceOracleUpdates.items[0];
  }
};

export default {
    getAllDrops,
    getMerkleDrops,
    getAllTokens,
    getAllOrders,
    getUserBalance,
    getLastestPriceOracleUpdate,
};
