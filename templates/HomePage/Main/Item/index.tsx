import styles from "./Item.module.sass";
import Image from "@/components/Image";
import { transformUri } from "@/utils/ipfs";

type ItemProps = {
    item: any;
};

const Item = ({ item }: ItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.preview}>
                <Image
                    className={styles.image}
                    src={transformUri(item?.token?.image, false)}
                    layout="fill"
                    objectFit="cover"
                    alt="Item"
                    width={400}
                    height={400}
                />
            </div>
        </div>
    );
};

export default Item;
