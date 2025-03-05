import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Details from "./Details";
import { useState, useEffect } from "react";
import Collections from "@/components/Collections";

type ProfileProps = {
    ownedNFTs: any;
    userInfor: any;
    address: string;
};

const Profile = ({ ownedNFTs, userInfor, address }: ProfileProps) => {
    const [tab, setTab] = useState("owned");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth <= 1023);
            }
        };

        checkIsMobile();

        // Add event listener to check for mobile resizing
        window.addEventListener('resize', checkIsMobile);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const tabsTokens = [{
        title: "Owned",
        value: "owned",
        counter: Object.keys(userInfor?.tokens || []).length,
    }, {
        title: "Collections",
        value: "collections",
        counter: Object.keys(userInfor?.collections || {}).length,
    }];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.avatar}>
                    {
                        (userInfor?.profilePic) ?
                            <Image
                            src={userInfor?.profilePic}
                            layout="fill"
                            objectFit="contain"
                            alt="Avatar"
                        /> : <Image
                            src="/images/artists/sloths.png"
                            layout="fill"
                            objectFit="contain"
                            alt="Avatar"
                    />
                    }
                </div>
                <Details userInfor={userInfor} address={address}/>
            </div>
            <div className={styles.col}>
                <List
                    tabs={tabsTokens}
                    tabsValue={tab}
                    setTabsValue={setTab}
                    light={false}
                    wrapperStyle={isMobile ? {} : { paddingLeft: "0", paddingTop: "0" }}
                >
                    {tab === "owned" && <Tokens items={Object.values(userInfor?.tokens || [])} theme={false} owned={true}/>}
                    {tab === "collections" && <Collections items={Object.values(userInfor?.collections || [])} theme={false} />}
                </List>
            </div>
        </div>
    );
};

export default Profile;
