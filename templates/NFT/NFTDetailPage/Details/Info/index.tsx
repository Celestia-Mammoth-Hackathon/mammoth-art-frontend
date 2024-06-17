import styles from "./Info.module.sass";
import { convertToPercentage } from "@/utils/index";
import { chainExplorerURL } from "@/constants/details";

type InfoProps = {
    collection: any
};

const Info = ({collection}: InfoProps) => {
    const parsedMintedTime  = collection ? new Date(collection.token.drop.startDate * 1000) : new Date();
    const formatMintedTime = parsedMintedTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const mintedDate =
        parsedMintedTime instanceof Date
            ? `${formatMintedTime}`
            : "Invalid Date";

    return (
        <div className={styles.info}>
            <div className={styles.row}>
                <div className={styles.title}>Contract</div>
                    <a 
                        className={styles.linkValue} 
                        href={`${chainExplorerURL}/token/${collection.token.tokenAddress}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {collection.token.tokenAddress}
                    </a>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Editions</div>
                <div className={styles.value}>{collection.token.drop.mintedSupply}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Royalty</div>
                <div className={styles.value}>{convertToPercentage(collection.token.royalty)}%</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Minted</div>
                <div className={styles.value}>{mintedDate}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>Token ID</div>
                <div className={styles.value}>{collection.token.tokenId}</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>License</div>
                <div className={styles.value}>No License</div>
            </div>
            <div className={styles.row}>
                <div className={styles.title}>IPFS</div>
                <div>
                    <a 
                        className={styles.linkValue} 
                        href={`${chainExplorerURL}/token/${collection.token.tokenAddress}/instance/${collection.token.tokenId}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Artifact
                    </a>
                </div>
                <div>
                    <a 
                        className={styles.linkValue} 
                        href={`${chainExplorerURL}/token/${collection.token.tokenAddress}/instance/${collection.token.tokenId}?tab=metadata`} 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Metadata
                    </a>
                </div>
            </div>
        </div>
    );
}


export default Info;
