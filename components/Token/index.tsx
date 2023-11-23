import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "@/components/Image";
import Users from "@/components/Users";

type TokenProps = {
    className?: string;
    item: any;
    large?: boolean;
    dark?: boolean;
    owned?: boolean;
};

const Token = ({ className, item, large, dark, owned }: TokenProps) => (
    <Link href={item.url}>
        <a
            className={cn(
                styles.token,
                { [styles.large]: large, [styles.dark]: dark },
                className
            )}
        >
            <div className={styles.preview}>
                <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt="Token"
                />
            </div>
            <div className={styles.details}>
                { owned ? 
                    <div className={styles.user}>
                        <div className={styles.image}>
                            <Image
                                src={item.users[0]}
                                layout="fill"
                                objectFit="cover"
                                alt="Photo category"
                            />
                        </div>
                        @randomdash
                    </div>
                    : 
                    <div className={styles.title}>{item.title}</div>
                }
                <div className={styles.detailBox}>
                    <div className={styles.edition}>
                        <div className={styles.category}>Editions</div>
                        <div className={styles.edition}>{item.edition}</div>
                        
                    </div>
                    <Image
                        src="/images/border.svg"
                        width="1"
                        height="24"
                        alt="border"
                    />
                    <div className={styles.price}>
                        <div className={styles.category}>Price</div>
                        <div className={styles.price}>{item.price}</div>
                    </div>
                </div>
                
            </div>
        </a>
    </Link>
);

export default Token;
