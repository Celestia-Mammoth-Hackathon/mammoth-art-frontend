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
        fetchAllCollections,
    } = useCollectionStore();

    const [mintedNFTs, setMintedNFTs] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
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
            fetchData();
        } else {
            setLoading(false);
        }
    }, [artist, collections]);

    return (
        <>
            {!loading && (
                <>
                    <Background image={artist.bannerPic} />
                    <Profile nfts={mintedNFTs} artistInfor={artist} address={artist.artistAddress} />
                </>
            )}
        </>
    );
};

export default PrfilePage;
