import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "@/components/Image";

type PreviewProps = {
    name: string;
    description: string;
    image?: any;
};

const Preview = ({name, description, image}: PreviewProps) => (
    <>
        <div className={styles.title}>Collection Preview</div>
        <div className={styles.preview}>
            {image && <Image src={image} alt={name} layout="fill" objectFit="cover" className={styles.image} />}
            <div className={styles.category}></div>
        </div>
        <div className={styles.head}>
            <div className={cn("h4", styles.subtitle)}>Collection Name</div>
            <div className={cn("h4", styles.name)}>{name}</div>
            <div className={cn("h4", styles.subtitle)}>Collection Description</div>
            <div className={cn("h4", styles.description)}>{description} </div>
            <button
                className={cn("button-white", styles.button)}
            >
                <span className={styles.text}>CREATE COLLECTION</span>
            </button>
        </div>
    </>
);

export default Preview;
