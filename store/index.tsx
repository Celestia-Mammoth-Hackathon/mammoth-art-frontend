import create from 'zustand';
import indexer from "@/utils/indexer";
import { getTokenStaticMetadata, getDropState } from "@/utils/nft"

export enum DropState {
    NotStarted,
    InProgress,
    SecondaryListingsActive,
    SecondaryListingsNone,
    SoldOut,
}

export type Attribute = {
    trait_type: string,
    value: string | number,
};

type TokenState = {
    "contractCreator": string,
    "metadata": {
        "name": string,
        "description": string,
        "image": string,
        "id": string,
        "uri": string,
        "animation_url"?: string,
        "tags": string[],
        attributes?: Attribute[];
    },
    "drop": {
        "id": string,
        "startDate": number,
        "endDate": number,
        "maxAllowed": number,
        "maxPerWallet": number,
        "price": string,
        "tokenAddress": string,
        "tokenId": string,
        "minted": string,
        "merkleRoot": string
    },
    "order": {},
    "type": string,
    "tokenAddress": string,
    "tokenId": string,
    "contractType"?: string,
    "royalty": number,
    "price": number,
    "mintedSupply": number,
    isMarketplaceAllowed: boolean,
    cloudflareCdnId?: string,
    merkleDrops: [],
};

type CollectionState = {
    token: TokenState;
    dropState: DropState;
    secondaryListings: [];
    tokenIds: string[];
    ownedSupply?: number;
};

type UserState = {
    collections: Record<string, CollectionState>;
};

interface State {
    collections: Record<string, CollectionState>;
    users: Record<string, UserState>;
    fetchAllCollections: () => Promise<void>;
    fetchCollection: (tokenAddress: string, tokenId: string) => Promise<void>;
    fetchMintedSupply: (tokenAddress: string, tokenId: string) => Promise<void>;
    setSecondaryListings: (tokenAddress: string, tokenId: string) => Promise<void>;
    fetchOwnNfts: (tokenAddress: string, tokenId: string, userAddress: string) => Promise<void>;
};

const useCollectionStore = create<State>((set , get) => ({
    collections: {},
    users: {},
    fetchAllCollections: async () => {
        try {
            const [ drops, allMerkleDrops, tokens, allListings ] = await Promise.all([
                indexer.getAllDrops(),
                indexer.getMerkleDrops(),
                indexer.getAllTokens(),
                indexer.getAllOrders()
            ]);

            drops.forEach((item: any) => {
                const token: any = getTokenStaticMetadata(item.tokenAddress, item.tokenId);
                if (!token) return;
                const foundToken = tokens.find((token:any) =>
                    token.tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase()
                        && token.tokenId === item.tokenId);

                token.drop = item;
                token.mintedSupply = Number(token.drop.minted || 0);
                token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;

                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
                const dropState = getDropState(item, token);

                const merkleDrops = allMerkleDrops
                    .filter((d: any) => token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId)
                    .filter((d: any) => getDropState(d, token) === DropState.InProgress);
                token.merkleDrops = merkleDrops;
                token.mintedSupply += token.merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);

                set((state) => ({
                    collections: {
                        ...state.collections,
                        [collectionId]: {
                            token,
                            dropState,
                            tokenIds: [item.tokenId],
                            secondaryListings: allListings.filter(
                                (listing : any) =>
                                    listing.tokenAddress.toLowerCase() === token.tokenAddress.toLowerCase() &&
                                    listing.tokenId === token.tokenId
                            ),
                        },
                    },
                }));
            });
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    },

    fetchCollection: async (tokenAddress: string, tokenId: string) => {
        try {
            const token:any = getTokenStaticMetadata(tokenAddress, tokenId);

            const [ drops, allMerkleDrops, tokens ] = await Promise.all([
                indexer.getAllDrops(),
                indexer.getMerkleDrops(),
                indexer.getAllTokens(),
            ]);
            
            const foundToken = tokens.find((token:any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                    && token.tokenId === tokenId);

            token.drop = drops.find((token:any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                    && token.tokenId === tokenId);
            token.mintedSupply = Number(token.drop.minted || 0);
            token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;
            
            const collectionId = `${token.tokenAddress.toLowerCase()}_${token.tokenId}`;
            const dropState = getDropState(token.drop, token);

            const merkleDrops = allMerkleDrops
                .filter((d: any) => token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId)
                .filter((d: any) => getDropState(d, token) === DropState.InProgress);
            token.merkleDrops = merkleDrops;
            token.mintedSupply += token.merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);

            set((state) => ({
                collections: {
                    ...state.collections,
                    [collectionId]: {
                        token,
                        dropState,
                        tokenIds: [tokenId],
                        secondaryListings: state.collections[collectionId]?.secondaryListings || [],
                    },
                },
            }));
        } catch (error) {
            console.error("Error fetching collections:", error);
        }
    },

    fetchMintedSupply: async (tokenAddress: string, tokenId: string) => {
        try {
            const [ drops, allMerkleDrops, tokens ] = await Promise.all([
                indexer.getAllDrops(),
                indexer.getMerkleDrops(),
                indexer.getAllTokens(),
            ]);
            const foundToken = tokens.find((token: any) =>
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase() &&
                token.tokenId === tokenId);

            const drop = drops.find((token:any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                    && token.tokenId === tokenId);
            let mintedSupply = Number(drop?.minted || 0);

            const merkleDrops = allMerkleDrops
                .filter((d: any) => foundToken.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && foundToken.tokenId === d.tokenId)
                .filter((d: any) => getDropState(d, foundToken) === DropState.InProgress);
            mintedSupply += merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);

            const collectionId = `${tokenAddress.toLowerCase()}_${tokenId}`;
            const isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;

            set((state) => ({
                collections: {
                    ...state.collections,
                    [collectionId]: {
                        ...state.collections[collectionId],
                        tokenIds: [tokenId],
                        token: {
                            ...state.collections[collectionId].token,
                            mintedSupply,
                            isMarketplaceAllowed,
                        }
                    }
                }
            }));
        } catch (error) {
            console.error("Error fetching minted supply:", error);
        }
    },
    setSecondaryListings: async (collectionId: string, secondaryListings: any) => {
        try {
            set((state) => ({
                collections: {
                    ...state.collections,
                    [collectionId]: {
                        ...state.collections[collectionId],
                        secondaryListings,
                    }
                }
            }));
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    },
    fetchOwnNfts: async (tokenAddress: string, tokenId: string, userAddress: string) => {
        try {
            const token: any = getTokenStaticMetadata(tokenAddress, tokenId);
            const ownedSupply = await indexer.getUserBalance(userAddress);

            const collectionId = `${tokenAddress.toLowerCase()}_${tokenId}`;
            const userBalance = ownedSupply.filter((element: any) => 
                element.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                && ((token.type === 'ERC1155' && element.tokenId === tokenId) || token.type === 'ERC721')
            );

            const tokens = await indexer.getAllTokens();
            const foundToken = tokens.find((token: any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase() &&
                token.tokenId === tokenId
            );

            token.mintedSupply = foundToken?.totalSupply || 0;
            token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;

            set((state) => {
                const userState = state.users[userAddress] || { collections: {} };

                return {
                    users: {
                        ...state.users,
                        [userAddress]: {
                            ...userState,
                            collections: {
                                ...userState.collections,
                                [collectionId]: {
                                    ...userState.collections[collectionId],
                                    token: token,
                                    tokenIds: userBalance.map((balance: any) => balance.tokenId)
                                        .sort((a: any, b: any) => Number(a) - Number(b)),
                                    ownedSupply: (token.type === 'ERC1155' ? +userBalance[0]?.balance : userBalance.length) || 0,
                                }
                            }
                        }
                    }
                };
            });
        } catch (error) {
            console.error("Error fetching own nfts:", error);
        }
    },
}));

export default useCollectionStore;
