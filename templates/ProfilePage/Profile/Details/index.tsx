import { useState } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Icon from "@/components/Icon";
import Contacts from "../Contacts";
import { formatUserAddress } from "@/utils/index";
import { chainExplorerURL } from "@/constants/details";
type DetailsProps = {
    userInfor: any;
    address: string;
};

const Details = ({ userInfor, address }: DetailsProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const artistLink = `${chainExplorerURL}/address/${address}?tab=txs`;
    const copyToClipboard = async (text:any) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 500); // Reset isCopied after 1.5 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className={styles.details}>
            <div className={styles.head}>
                <div className={styles.flex}>
                    <div className={styles.box}>
                        <div className={cn("h2", styles.user)}>{userInfor?.name}</div>
                        <div className={styles.line}>
                        <div className={`${styles.code} ${isCopied ? styles.copiedBg : ''}`}>
                            <a className={styles.address} 
                                href={artistLink}
                                target="_blank"
                                rel="noopener noreferrer" >
                                {formatUserAddress(address)}
                            </a>

                            <button
                                className={styles.copy}
                                onClick={() => copyToClipboard(address)}
                            >
                                <Icon name="copy" />
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <Contacts links={userInfor?.links ?? []} bio={userInfor?.bio ?? ""}/>
        </div>
    );
};

export default Details;
