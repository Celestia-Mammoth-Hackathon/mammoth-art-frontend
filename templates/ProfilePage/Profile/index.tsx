import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import List from "@/components/List";
import Tokens from "@/components/Tokens";
import Details from "./Details";

type ProfileProps = {
    nfts: any;
    artistInfor: any;
    address: string;
};

const Profile = ({ nfts, artistInfor, address }: ProfileProps) => {
    const tabsTokens = [{
        title: "Created",
        value: "created",
        counter: nfts.length,
    }];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.avatar}>
                    {
                        (artistInfor?.profilePic) &&
                            <Image
                            src={artistInfor?.profilePic}
                            layout="fill"
                            objectFit="contain"
                            alt="Avatar"
                        />
                    }
                </div>
                <Details artistInfor={artistInfor} />
            </div>
            <div className={styles.col}>
                <List
                    tabs={tabsTokens}
                    tabsValue="created"
                    setTabsValue={() => {}}
                    light={false}
                    wrapperStyle={{ paddingLeft: "0", paddingTop: "0" }}
                >
                    <Tokens items={nfts} theme={false} />
                </List>
            </div>
        </div>
    );
};

export default Profile;
