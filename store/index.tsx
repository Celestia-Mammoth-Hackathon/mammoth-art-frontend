import create from 'zustand';
import indexer from "@/utils/indexer";
import { getTokenStaticMetadata, getDropState } from "@/utils/nft"
import { externalDrops } from '@/constants/externalDrops';

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

export type TokenFormatDimensions = {
    value: string;
    unit: string;
};

export type TokenFormatHash = {
    value: string;
    algo: string;
};

export type TokenFormat = {
    uri: string;
    mime_type: string;
    file_size: string;
    dimensions: TokenFormatDimensions;
    hash: TokenFormatHash;
}

export type TokenMetadata = {
    id: string;
    name: string;
    description: string;
    image: string;
    animation_url?: string;
    tags?: string[];
    rarity?: string;
    rank?: number;
    attributes?: Attribute[];
    formats?: TokenFormat[];
    cloudflareCdnId?: string;
};

export type TokenState = {
    contractCreator?: string;
    collectionName?: string;
    metadata?: TokenMetadata;
    "drop"?: {
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
    "type"?: string,
    "tokenAddress": string,
    "tokenId": string,
    "contractType"?: string,
    tokenType?: string,
    "royalty"?: number,
    "price"?: number,
    "mintedSupply"?: number,
    totalSupply?: number,
    isMarketplaceAllowed: boolean;
    isMerkleDrop?: boolean;
    cloudflareCdnId?: string;
    merkleDrops: [];
    extraDescription?: string;
    defaultMintAmount?: number;
    tokens?: TokenMetadata[];
    tokenMetadata?: TokenMetadata;
};

type CollectionState = {
    token: TokenState;
    dropState: DropState;
    secondaryListings?: any[];
    tokenIds: string[];
    ownedSupply?: number;
};

type UserState = {
    collections: Record<string, CollectionState>;
    tokens: [TokenState];
    bannerPic: string;
    profilePic: string;
};

interface State {
    generativeCollections: Record<string, any>;
    collections: Record<string, CollectionState>;
    users: Record<string, UserState>;
    fetchAllCollections: () => Promise<any>;
    fetchAllGenerativeCollections: () => Promise<any>;
    fetchUserBalance: (userAddress: string) => Promise<void>;
    fetchCollection: (tokenAddress: string, tokenId: string) => Promise<void>;
    fetchMintedSupply: (tokenAddress: string, tokenId: string) => Promise<void>;
    setSecondaryListings: (collectionId: string, secondaryListings: any[]) => Promise<void>;
    fetchOwnNfts: (tokenAddress: string, tokenId: string, userAddress: string) => Promise<void>;
};

const useCollectionStore = create<State>((set , get) => ({
    generativeCollections: {},
    collections: {},
    users: {},
    fetchAllCollections: async () => {
        let isSubscribed = true;
        try {
            const [drops, allMerkleDrops, tokens] = await Promise.all([
                indexer.getAllDrops(),
                indexer.getMerkleDrops(),
                indexer.getAllTokens(),
            ]);

            if (!isSubscribed) return () => {};

            const indexedExternalDrops = externalDrops.filter(drop => drop.indexed).map(d => d.drop);
            const setCollections = new Set();
            const mapTokens = new Map();
    
            for (const item of [...drops, ...allMerkleDrops, ...indexedExternalDrops]) {
                const token: any = await getTokenStaticMetadata(item.tokenAddress, item.tokenId);
                if (!token) continue;
                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
                if (mapTokens.has(collectionId)) continue;
                mapTokens.set(collectionId, token);
            }
    
            const newCollections: any = {};
    
            for (const item of [...drops, ...indexedExternalDrops]) {
                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
                if (!mapTokens.has(collectionId)) continue;
                const token = mapTokens.get(collectionId);
    
                const foundToken = tokens.find((t: any) =>
                    t.tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase() && t.tokenId === item.tokenId);
    
                token.drop = item;
                token.mintedSupply = Number(token.drop.minted || 0);
                token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;
    
                const dropState = getDropState(item, token);
    
                const merkleDrops = allMerkleDrops.filter((d: any) =>
                    token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId
                );
    
                token.merkleDrops = merkleDrops.filter((d: any) => getDropState(d, token) === DropState.InProgress);
                token.mintedSupply += merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);
                token.isMerkleDrop = false;
    
                newCollections[collectionId] = { token, dropState, tokenIds: [item.tokenId] };
    
                if (dropState === DropState.InProgress) {
                    setCollections.add(collectionId);
                }
            }
    
            for (const item of allMerkleDrops) {
                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
                if (!mapTokens.has(collectionId)) continue;
                if (setCollections.has(collectionId)) continue;
    
                const token = mapTokens.get(collectionId);
    
                const foundToken = tokens.find((t: any) =>
                    t.tokenAddress.toLowerCase() === item.tokenAddress.toLowerCase() && t.tokenId === item.tokenId
                );
    
                token.drop = item;
                token.mintedSupply = 0;
    
                const tokenDrops = drops.filter((d: any) =>
                    token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId
                );
    
                token.mintedSupply += tokenDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);
                token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;
                const dropState = getDropState(item, token);
    
                const merkleDrops = allMerkleDrops.filter((d: any) =>
                    token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId
                );
    
                token.merkleDrops = merkleDrops.filter((d: any) => getDropState(d, token) === DropState.InProgress);
                token.mintedSupply += merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);
                token.isMerkleDrop = true;
    
                newCollections[collectionId] = { token, dropState, tokenIds: [item.tokenId] };
    
                if (dropState === DropState.InProgress) {
                    setCollections.add(collectionId);
                }
            }
    
            // Update state in one batch
            set((state) => ({ 
                collections: { ...state.collections, ...newCollections } 
            }));

            // Return cleanup function
            return () => { isSubscribed = false; };
        } catch (error) {
            console.error("Error fetching collections:", error);
            return () => { isSubscribed = false; };
        }
    },
    fetchAllGenerativeCollections: async () => {
        try {
            const [ drops, allMerkleDrops ] = await Promise.all([
                indexer.getAllGenerativeDrops(),
                indexer.getGenerativeMerkleDrops(),
            ]);

            const setCollections = new Set();
            const mapTokens = new Map();
            
            for (const item of [...drops, ...allMerkleDrops]) {    
                const token: any = await indexer.getContractMetadata(item.tokenAddress);
                if (!token) {
                    continue;
                }

                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
                if (mapTokens.has(collectionId)) {
                    continue;
                }

                mapTokens.set(collectionId, token);
            }

            for (const item of [...drops]) {
                const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
       
                if (!mapTokens.has(collectionId)) {
                    continue;
                }
                const token = mapTokens.get(collectionId);

                token.drop = item;
                token.mintedSupply = Number(token.drop.minted || 0);

                const dropState = getDropState(item, token);

                const merkleDrops = allMerkleDrops
                    .filter((d: any) => token.drop.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId);
                token.merkleDrops = merkleDrops.filter((d: any) => getDropState(d, token) === DropState.InProgress);
                token.mintedSupply += merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);
                token.isMerkleDrop = false;

                set((state) => ({
                    generativeCollections: {
                        ...state.generativeCollections,
                        [collectionId]: {
                            token,
                            dropState,
                            tokenIds: [item.tokenId],
                        },
                    },
                }));

                if (dropState === DropState.InProgress) {
                    setCollections.add(collectionId);
                }
            }
            return get().generativeCollections;
        } catch (error) {
            console.error("Error fetching geneative collections:", error);
        }
    },
    fetchCollection: async (tokenAddress: string, tokenId: string) => {
        try {
            const token:any = await getTokenStaticMetadata(tokenAddress, tokenId);

            const [ drops, allMerkleDrops, tokens ] = await Promise.all([
                indexer.getAllDrops(),
                indexer.getMerkleDrops(),
                indexer.getAllTokens(),
            ]);

            const indexedExternalDrops = externalDrops.filter(drop => drop.indexed === true).map(d => d.drop);

            const foundToken = tokens.find((token:any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                    && token.tokenId === tokenId);

            const merkleDrops = allMerkleDrops
                .filter((d: any) => token.tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && token.tokenId === d.tokenId);

            token.drop = drops.find((token:any) => 
                token.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                    && token.tokenId === tokenId);
            if (!token.drop) {
                token.drop = indexedExternalDrops.find((d:any) =>
                    d.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                        && d.tokenId === tokenId);
            }
            token.mintedSupply = Number(token.drop?.minted || 0);
            token.isMarketplaceAllowed = foundToken?.isMarketplaceAllowed || false;

            token.merkleDrops = merkleDrops.filter((d: any) => getDropState(d, token) === DropState.InProgress);

            token.isMerkleDrop = false;
            if (!token.drop || getDropState(token.drop, token) !== DropState.InProgress) {
                if (token.merkleDrops.length > 0) {
                    token.drop = token.merkleDrops[0];
                    token.isMerkleDrop = true;
                } else if (merkleDrops.length > 0) {
                    token.drop = merkleDrops[merkleDrops.length - 1];
                    token.isMerkleDrop = true;
                }
            }

            const collectionId = `${token.tokenAddress.toLowerCase()}_${token.tokenId}`;
            const dropState = getDropState(token.drop, token);

            token.mintedSupply += merkleDrops.reduce((sum: number, drop: any) => sum + Number(drop.minted), 0);

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
                .filter((d: any) => tokenAddress.toLowerCase() === d.tokenAddress.toLowerCase() && tokenId === d.tokenId);
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
    setSecondaryListings: async (collectionId: string, secondaryListings: any[]) => {
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
            const token: any = await getTokenStaticMetadata(tokenAddress, tokenId);
            const ownedSupply = await indexer.getUserBalance({ userAddress });

            const collectionId = `${tokenAddress.toLowerCase()}_${tokenId}`;
            const userBalance = ownedSupply.filter((element: any) =>
                element.tokenAddress.toLowerCase() === tokenAddress.toLowerCase()
                && ((token.type === 'ERC1155' && (element.tokenId === tokenId || (token.tokens && token.tokens.length > 0))) || token.type === 'ERC721')
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
                                    ownedSupply: userBalance.reduce((sum: number, balance: any) => sum + +balance.balance, 0) || 0,
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
    fetchUserBalance: async (userAddress: string) => {
        try {
            const ownedSupply = await indexer.getUserBalance({ userAddress });
            let ownedCollection = await indexer.getDropsByUser(userAddress);
            ownedCollection = await Promise.all(
                ownedCollection.map(async (item:any) => {
                    try {
                        const contractMetadata = await indexer.getContractMetadata(item.tokenAddress);

                        return {
                            ...item,
                            tokenMetadata: contractMetadata || null
                        };
                    } catch (error) {
                        console.error(`Error fetching metadata for token ${item.tokenId} at ${item.tokenAddress}:`, error);
                        return { ...item, metadata: null }; // Preserve structure even on failure
                    }
                })
            );            

            set((state) => {
                const userState = state.users[userAddress] || { tokens: [{}], collections: {}, bannerPic: '', profilePic: '' }; // Initialize with single empty token
            
                return {
                    users: {
                        ...state.users,
                        [userAddress]: {
                            ...userState,
                            tokens: ownedSupply,  // Ensure tokens is assigned correctly
                            collections: ownedCollection
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
