import styles from "./Collections.module.sass";
import Token from "@/components/Token";

type CollectionsProps = {
    items: any;
    theme: any;
};

const Collections = ({ items, theme }: CollectionsProps) => {
    return (
        <div className={styles.tokens}>
            {
                items.length ? (
                    items.map((token: any, index: number) => (
                        <Token
                            className={styles.token}
                            item={token}
                            key={index}
                            large={false}
                            dark={theme}
                        />
                    ))
                ) : (
                    <div className={styles.wrap}>
                        <div className={styles.box}>{"You don't have any collections"}</div>
                    </div>
                )
            }
        </div>
    );
};

export default Collections;
