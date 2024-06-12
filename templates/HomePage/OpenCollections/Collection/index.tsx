import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { formatUserAddress } from "@/utils/index";
type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => (
    <Link href={item.url}>
        <a className={styles.collection}>
            <div className={styles.images}>
                <div className={styles.image}>
                    <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                        alt="Collection item"
                    />
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.box}>
                    <div className={styles.subtitle}>{item.title}</div>
                    <div className={styles.author}>
                        {/* <div className={styles.avatar}>
                            <Image
                                src={item.avatar}
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div> */}
                        {formatUserAddress(item.login)}
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.text}>{item.edition}x</div>
                    <div className={styles.price}>{item.price}</div>
                </div>
            </div>
        </a>
    </Link>
);

export default Collection;
