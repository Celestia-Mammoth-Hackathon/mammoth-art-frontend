import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { formatUserAddress } from "@/utils/index";
import { handleIpfsLink } from "@/utils/index";
import { Stream } from "@cloudflare/stream-react";

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => {
    return (
        <Link href={{ pathname: '/drop/[slug]', query: { slug: item.slug }}}>
            <a className={styles.collection}>
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
                <div className={styles.details}>
                    <div className={styles.box}>
                        <div className={styles.subtitle}>{item.metadata.name}</div>
                        <div className={styles.author}>
                            {/* <div className={styles.avatar}>
                                <Image
                                    src={item.avatar}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Avatar"
                                />
                            </div> */}
                            {formatUserAddress(item.contractCreator)}
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.text}>{item.mintedSupply}x</div>
                        <div className={styles.price}>{item.price} TIA</div>
                    </div>
                </div>
            </a>
        </Link>
)};

export default Collection;
