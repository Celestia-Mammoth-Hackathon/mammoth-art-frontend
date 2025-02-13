import { useState } from "react";
import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { formatUserAddress } from "@/utils/index";
import { transformUri } from "@/utils/ipfs";
import { convertBigNumberToString } from '@/utils/index';
import { nativeCurrency } from '@/constants/details';

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => {
    const [isAuthorHovered, setIsAuthorHovered] = useState(false);

    return (
        <>
            <div className={styles.collection}>
                <Link href={'/collection/' + item.token.drop.tokenAddress} passHref>
                <a target="_blank" rel="noopener noreferrer">
                    <div className={styles.image}>
                        <Image
                            className={styles.photo}
                            src={transformUri(item.token.image, false)}
                            layout="fill"
                            objectFit="contain"
                            alt="Latest Collection"
                            priority={true}
                        />
                    </div>
                </a>
                </Link>
                <div className={styles.details}>
                    <div className={styles.box}>
                        <Link href={'/collection/' + item.token.tokenAddress} passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <div className={`${styles.subtitle} ${isAuthorHovered ? styles.subtitleHover : ''}`}>
                                    {item.token.name}
                                </div>
                            </a>
                        </Link>
                        <div className={styles.authorWrapper}>
                            {/* <div className={styles.avatar}>
                                <Image
                                    src={item.avatar}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Avatar"
                                />
                            </div> */}
                            <span className={styles.byAuthor}>By: </span>
                            <Link href={{
                                    pathname: '/profile/[slug]',
                                    query: { slug: formatUserAddress(item.token.drop.creator) },
                                }} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <span 
                                            className={styles.author}
                                            onMouseEnter={() => setIsAuthorHovered(true)}
                                            onMouseLeave={() => setIsAuthorHovered(false)}
                                        >{formatUserAddress(item.token.drop.creator)}</span>
                                    </a>
                                </Link> 
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.box}>
                        <div>
                            <div className={styles.label}>Price</div>
                            <div className={styles.price}>{convertBigNumberToString(item.token.drop.price, nativeCurrency.decimals)} TIA</div>
                        </div>
                        <div>
                            <div className={styles.label}>Mints</div>
                            <div className={styles.text}>{item.token.mintedSupply}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
)};

export default Collection;
