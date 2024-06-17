/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_INDEXER_API_URL!;

const EXCLUDE_DROP_IDS = JSON.stringify((process.env.NEXT_PUBLIC_EXLUDE_DROP_IDS! || "1").split(","));

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

const getAllOrders = async () => {
    const query = `
        query MyQuery {
          orders(where: {orderType: SELL, orderStatus: ACTIVE}, limit: 1000) {
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
            }
        }`;
    const {
      data: {
        data: { orders },
      },
    } = await axios.post(`${BASE_URL}`, { query });

    if (orders.items.length > 0) {
      return orders.items;
    } else return [];
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

export default {
    getAllDrops,
    getMerkleDrops,
    getAllTokens,
    getAllOrders,
    getUserBalance
};
