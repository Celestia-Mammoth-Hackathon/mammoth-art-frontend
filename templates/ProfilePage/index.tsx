import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.sass";
import Background from "@/components/Background";
import Profile from "./Profile";
import useCollectionStore from '@/store/index';
import { TokenState } from '@/store/index';
import Skeleton from '@mui/material/Skeleton';
import SkeletonProfile from "./SkeletonProfile";
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
            {loading ? 
            (
                <>
                    <div className={styles.background}>
                        <Skeleton variant="rectangular" height="100%" width="100%" sx={{ bgcolor: '#141414' }}/>
                    </div>
                    <SkeletonProfile />
                </>
            )
            : (
                
                <>
                    <Background image={users[userAddress]?.bannerPic || "/images/artists/sloths.png"} />
                    <Profile ownedNFTs={ownedNFTs} userInfor={users[userAddress]} address={userAddress} />
                </>
            )}
        </>
    );
};

export default PrfilePage;
