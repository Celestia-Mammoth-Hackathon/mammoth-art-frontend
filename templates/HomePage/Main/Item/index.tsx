import Link from "next/link";
import cn from "classnames";
import styles from "./Item.module.sass";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Details from "../Details";

type MainProps = {
    item: any;
};

const Main = ({ item }: MainProps) => (
    <div className={styles.item}>
        <div className={styles.preview}>
            <Image
                className={styles.image}
                src={item.image}
                layout="fill"
                objectFit="cover"
                alt="Main"
                width={400}
                height={400}
            />
        </div>
    </div>
);

export default Main;
