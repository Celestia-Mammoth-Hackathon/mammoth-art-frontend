import { useState, useEffect } from "react";
import Background from "@/components/Background";
import Profile from "./Profile";
import useCollectionStore from '@/store/index';
import { TokenState } from '@/store/index';
type PrfilePageProps = {
    userAddress: any;
};

const PrfilePage = ({ userAddress }: PrfilePageProps) => {
    const {
        collections,
        users,
        fetchUserBalance,
    } = useCollectionStore();

    const [ownedNFTs, setOwnedNFTs] = useState<TokenState[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchUserBalance(userAddress);

                if (users[userAddress]?.tokens) {
                    setOwnedNFTs(users[userAddress]?.tokens);
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
    }, [userAddress]);

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
