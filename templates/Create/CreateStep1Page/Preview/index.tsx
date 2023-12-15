import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";

type PreviewProps = {
    name: string;
    description: string;
    collectionImage?: any;
    bannerImage?: any;
    edition?: string;
    royalty?: string;
    collection?: string;
    nft?: boolean;
    setIsSubmitted?: any;
};

const Preview = ({
    name,
    description, 
    collectionImage, 
    bannerImage, 
    edition,
    royalty,
    collection,
    setIsSubmitted,
    nft }: PreviewProps) => {
        return (
        <>
        <div className={styles.title}>{nft ? "NFT Creation Preview" : "Collection Preview"}</div>
        <div className={styles.preview}>
            {bannerImage && <Image src={bannerImage} alt={name} layout="fill" objectFit="cover" className={styles.image} />}
            {
                !nft && (
                <div className={styles.category}>
                    {collectionImage && <Image src={collectionImage} alt={name} layout="fill" objectFit="cover" className={styles.image} />}
                </div>
                )
            }
            
        </div>
        {
            nft ? <div className={styles.head}>
                    <div className={cn("h4", styles.subtitle)}>Collection</div>
                    <div className={cn("h4", styles.detail)}>{collection}</div>
                    <div className={cn("h4", styles.subtitle)}>Name</div>
                    <div className={cn("h4", styles.detail)}>{name}</div>
                    <div className={cn("h4", styles.subtitle)}>Description</div>
                    <div className={cn("h4", styles.detail)}>{description} </div>
                    <div className={cn("h4", styles.subtitle)}>Edition(s)</div>
                    <div className={cn("h4", styles.detail)}>{edition} </div>
                    <div className={cn("h4", styles.subtitle)}>Royalty</div>
                    <div className={cn("h4", styles.detail)}>{royalty} </div>
                    <div
                        className={cn("button-white", styles.button)}
                        onClick={() => setIsSubmitted(true)}
                    >
                        <span className={styles.text}>CREATE NFT</span>
                    </div>
                </div>
            :   <div className={styles.head}>
                    <div className={cn("h4", styles.subtitle)}>Collection Name</div>
                    <div className={cn("h4", styles.name)}>{name}</div>
                    <div className={cn("h4", styles.subtitle)}>Description</div>
                    <div className={cn("h4", styles.description)}>{description} </div>
                    <div
                        className={cn("button-white", styles.button)}
                        onClick={() => {
                            setIsSubmitted(true)
                        }}
                    >
                        <span className={styles.text}>CREATE COLLECTION</span>
                    </div>
                </div>
        }
        </>
    )
    };

export default Preview;
