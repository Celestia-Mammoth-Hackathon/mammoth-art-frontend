import { useState } from "react";
import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Details from "./Details";
import Skeleton from '@mui/material/Skeleton';
import SkeletonNFT from "@/components/SkeletonNFT";
type ProfileProps = {
    mintedNFTs: any;
    ownedNFTs: any;
    artistInfor: any;
    loading: boolean;
};

const Profile = ({ mintedNFTs, ownedNFTs, artistInfor, loading = false }: ProfileProps) => {
    const [sorting, setSorting] = useState<string>("created");
    const tabsTokens = [
        {
            title: "Created",
            value: "created",
            counter: mintedNFTs.length,
        },
        {
            title: "Owned",
            value: "owned",
            counter: ownedNFTs.length,
        },
        {
            title: "Collections",
            value: "collection",
            counter: mintedNFTs.length,
        }
    ];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.avatar}>
                    {
                        loading 
                        ?   <Skeleton variant="circular" height="100%" width="100%" sx={{ bgcolor: '#141414' }}/>
                        :   <Image
                                src={artistInfor?.profilePic}
                                layout="fill"
                                objectFit="contain"
                                alt="Avatar"
                            />
                    }
                </div>
                <Details artistInfor={artistInfor} loading={loading}/>
            </div>
            <div className={styles.col}>
                <List
                    tabs={tabsTokens}
                    tabsValue={sorting}
                    setTabsValue={setSorting}
                    light={false}
                    wrapperStyle={{ paddingLeft: "0", paddingTop: "0" }}
                >
                    {sorting === "created" && (
                        <Tokens items={mintedNFTs} theme={false} created={true}/>
                    )}

                    {sorting === "owned" && (
                        <Tokens items={ownedNFTs} theme={false} owned={true}/>
                    )}

                    {sorting === "collection" && (
                        <Tokens items={mintedNFTs} theme={false} collection={true}/>
                    )}   
                </List>
            </div>
        </div>
    );
};

export default Profile;
