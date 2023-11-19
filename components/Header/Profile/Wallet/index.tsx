import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Icon from "@/components/Icon";

type WalletProps = {
    onDisconnect: () => void;
    account?: any;
};

const Wallet = ({ account, onDisconnect }: WalletProps) => {
    const actions = [
        {
            title: "Manage wallet",
            icon: "settings-alt",
            url: "/settings#wallet",
        },
        {
            title: "Disconnect",
            icon: "close-square",
            onClick: onDisconnect,
        },
    ];

    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div className={styles.title}>Connected wallet</div>
                <div className={styles.actions}>
                    {actions.map((action: any, index: number) =>
                        action.onClick ? (
                            <button
                                className={styles.action}
                                onClick={action.onClick}
                                key={index}
                            >
                                <Icon name={action.icon} />
                                {action.title}
                            </button>
                        ) : (
                            <Link href={action.url} key={index}>
                                <a className={styles.action}>
                                    <Icon name={action.icon} />
                                    {action.title}
                                </a>
                            </Link>
                        )
                    )}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.code}>{account.displayName}</div>
                <div className={cn("h3", styles.line)}>
                    <div className={styles.crypto}>{account.displayBalance
                      ? ` ${account.displayBalance}`
                      : ''}</div>
                    <div className={styles.price}>$5,448</div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
