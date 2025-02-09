import { useState, useEffect } from "react";
import Background from "@/components/Background";
import Profile from "./Profile";
import useCollectionStore from '@/store/index';

type PrfilePageProps = {
    userAddress: any;
};

const PrfilePage = ({ userAddress }: PrfilePageProps) => {
    const {
        collections,
        users,
        fetchUserBalance,
    } = useCollectionStore();

    const [ownedNFTs, setOwnedNFTs] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (Object.keys(collections).length < 1) {
                    await fetchUserBalance(userAddress);
                }
                console.log(users);   
                if (Object.keys(collections).length > 0 && users[userAddress]?.collections) {
                    let allMintedNFTs: any = [];
                    Object.values(users[userAddress].collections).forEach(collection => {
                        const collectionId = `${collection.token.tokenAddress.toLowerCase()}_${collection.token.tokenId}`
                        if (collections[collectionId]) {
                            allMintedNFTs.push(collections[collectionId].token);
                        }
                    });
                    setOwnedNFTs(allMintedNFTs);
                }
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userAddress) {
            fetchData();
        } else {
            setLoading(false);
        }
    }, [userAddress, collections]);

    return (
        <>
            {!loading && (
                <>
                    <Background image={users[userAddress]?.bannerPic || "/images/artists/sloths.png"} />
                    <Profile ownedNFTs={ownedNFTs} userInfor={users[userAddress]} address={userAddress} />
                </>
            )}
        </>
    );
};

export default PrfilePage;
