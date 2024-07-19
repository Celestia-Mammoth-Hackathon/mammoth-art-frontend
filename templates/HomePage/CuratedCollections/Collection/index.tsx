import { useState } from "react";
import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { formatUserAddress } from "@/utils/index";
import { handleIpfsLink } from "@/utils/index";
import { Stream } from "@cloudflare/stream-react";
import { artistAddresses } from '@/constants/details';

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => {
    const [isAuthorHovered, setIsAuthorHovered] = useState(false);

    const href = item.showCollection
        ? {
            pathname: '/collection/[slug]',
            query: { slug: item.slug },
        }
        : {
            pathname: '/drop/[slug]',
            query: { slug: item.slug },
        };
    const artistInfor:any = artistAddresses.find((element) => element.artistAddress === item.contractCreator) || {};

    return (
        <>
            <div className={styles.collection}>
                <Link href={{ pathname: href.pathname, query: href.query}}>
                    <div className={styles.images}>
                        <div className={styles.image}>
                            <Image
                                className={styles.photo}
                                src={handleIpfsLink(item.metadata.image)}
                                layout="fill"
                                objectFit="contain"
                                alt="Curated Collection"
                                priority={true}
                            />
                        </div>
                    </div>
                </Link>
                <div className={styles.details}>
                    <div className={styles.box}>
                        <Link href={{ pathname: href.pathname, query: href.query}}>
                            <div className={`${styles.subtitle} ${isAuthorHovered ? styles.subtitleHover : ''}`}>
                                {item.metadata.name}
                            </div>
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
                                    query: { slug: artistInfor?.slug },
                                }}>
                                    <span 
                                        className={styles.author}
                                        onMouseEnter={() => setIsAuthorHovered(true)}
                                        onMouseLeave={() => setIsAuthorHovered(false)}
                                    >{artistInfor?.name || formatUserAddress(item.contractCreator)}</span>
                                </Link> 
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.box}>
                        <div>
                            <div className={styles.label}>Price</div>
                            <div className={styles.price}>{item.price} TIA</div>
                        </div>
                        <div>
                            <div className={styles.label}>Mints</div>
                            <div className={styles.text}>{item.mintedSupply}</div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </>
        
)};

export default Collection;
