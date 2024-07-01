import { useState, useEffect } from "react";
import Background from "@/components/Background";
import Profile from "./Profile";
import useCollectionStore from '@/store/index';

type PrfilePageProps = {
    artist: any;
};

const PrfilePage = ({ artist }: PrfilePageProps) => {
    const {
        collections,
        users,
        fetchAllCollections,
        fetchAllOwnNfts
    } = useCollectionStore();

    const [mintedNFTs, setMintedNFTs] = useState([]);
    const [ownedNFTs, setOwnedNFTs] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const address = artist.artistAddress || artist.address;
    
    useEffect(() => {
        const fetchMintedNFTs = async () => {
            try {
                setLoading(true);
                if (Object.keys(collections).length < 1) {
                    await fetchAllCollections();
                }

                if (Object.keys(collections).length > 0) {
                    let allMintedNFTs: any = [];
                    for (const collection of artist.collections) {
                        const collectionId = `${collection.tokenAddress.toLowerCase()}_${collection.tokenId}`
                        if (collections[collectionId]) {
                            allMintedNFTs.push(collections[collectionId].token);
                        }
                    }
                    setMintedNFTs(allMintedNFTs);
                }
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        if (artist && artist.collections.length > 0) {
            fetchMintedNFTs();
        }
    }, [artist, collections]);

    useEffect(() => {
        const fetchOwnedNFTs = async () => {
            try {
                setLoading(true);
                if (Object.keys(collections).length < 1) {
                    await fetchAllCollections();
                }

                if (Object.keys(users).length < 1) {
                    await fetchAllOwnNfts(address);
                }

                const allOwnedNFTs: any = [];

                if (users[address] && users[address].collections) {
                    const collections = users[address].collections;

                    for (const collectionId in collections) {
                        if (collections.hasOwnProperty(collectionId)) {
                            const collection = collections[collectionId];
                            if (collection.token) {
                                allOwnedNFTs.push(collection.token);
                            }
                        }
                    }
                }
                setOwnedNFTs(allOwnedNFTs)
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOwnedNFTs()
    }, [artist, users]);

    return (
        <>
            <Background image={artist.bannerPic} loading={loading}/>
            <Profile mintedNFTs={mintedNFTs} ownedNFTs={ownedNFTs} artistInfor={artist} loading={loading}/>
        </>
    );
};

export default PrfilePage;
