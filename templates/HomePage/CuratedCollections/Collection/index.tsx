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
            pathname: 'https://modularium.art/collection/[slug]',
            query: { slug: item.slug },
        }
        : {
            pathname: 'https://modularium.art/drop/[slug]',
            query: { slug: item.slug },
        };
    const artistInfor:any = artistAddresses.find((element) => element.artistAddress === item.contractCreator) || {};

    return (
        <>
            <div className={styles.collection}>
                <Link href={{ pathname: href.pathname, query: href.query}} passHref>
                <a target="_blank" rel="noopener noreferrer">
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
                </a>
                </Link>
                <div className={styles.details}>
                    <div className={styles.box}>
                        <Link href={{ pathname: href.pathname, query: href.query}} passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <div className={`${styles.subtitle} ${isAuthorHovered ? styles.subtitleHover : ''}`}>
                                    {item.metadata.name}
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
                                    pathname: 'https://modularium.art/profile/[slug]',
                                    query: { slug: artistInfor?.slug },
                                }} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <span 
                                            className={styles.author}
                                            onMouseEnter={() => setIsAuthorHovered(true)}
                                            onMouseLeave={() => setIsAuthorHovered(false)}
                                        >{artistInfor?.name || formatUserAddress(item.contractCreator)}</span>
                                    </a>
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
