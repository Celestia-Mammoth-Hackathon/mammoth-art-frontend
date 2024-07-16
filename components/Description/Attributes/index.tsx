import cn from "classnames";
import styles from "./Attributes.module.sass";
import { Attribute } from "@/store/index";

type AttributesProps = {
    className?: string;
    attributes: Attribute[];
};

const Attributes = ({ className, attributes }: AttributesProps) => (
    <div className={cn(styles.attributes, className)}>
        <div className={styles.list}>
            {attributes.map((attribute: Attribute, index: number) => (
                <div className={styles.item} key={index}>
                    <div className={styles.label}>{attribute.trait_type}</div>
                    <div className={styles.details}>{attribute.value}</div>
                </div>
            ))}
        </div>
    </div>
);

export default Attributes;
