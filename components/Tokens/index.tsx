import styles from "./Tokens.module.sass";
import Token from "@/components/Token";

type TokensProps = {
    items: any;
    theme: any;
    owned?: boolean;
    created?: boolean;
    collection?: boolean;
};

const Tokens = ({ items, theme, owned = false, created = false, collection = false }: TokensProps) => {
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
                            owned={owned}
                        />
                    ))
                ) : (
                    <div className={styles.wrap}>
                        <div className={styles.box}>{owned ? "You don't own any items" : created ?  "No items created" : "No Collections"}</div>
                    </div>
                )
            }
        </div>
    );
};

export default Tokens;
