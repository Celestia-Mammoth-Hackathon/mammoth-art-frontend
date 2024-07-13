import { useContext, useState } from "react";
import styles from "./Wallet.module.sass";
import { UserContext } from "context/user";
import { nativeCurrency } from "@/constants/details";
import { formatUserAddress } from "@/utils/index";
import Icon from "@/components/Icon";

type WalletProps = {
    account?: any;
};

const Wallet = ({ account }: WalletProps) => {
    const actions = [
        {
            title: "DISCONNECT WALLET",
            onClick: "",
        },
    ];
    const [isCopied, setIsCopied] = useState(false);
    const copyToClipboard = async (text:any) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 500); // Reset isCopied after 1.5 seconds
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const { address, balance } = useContext(UserContext);

    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div>
                    <div className={styles.title}>My Balance</div>
                    <div className={styles.balances}>
                        <div>
                            <span className={styles.balance}>
                                {balance} <span className={styles.currency}>{nativeCurrency.symbol}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.addressWrapper}>
                    <div className={styles.title}>My Address</div>
                    <div className={`${styles.address} ${isCopied ? styles.copiedBg : ''}`}>
                        <div>
                            <span className={styles.balance}>
                                {formatUserAddress(address, 14)}
                            </span>
                        </div>
                        <button
                                className={styles.copy}
                                onClick={() => copyToClipboard(address)}
                        >
                            <Icon name="copy" fill="white"/>
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.actions}>
                    {/* {actions.map((action: any, index: number) =>
                        <button
                            className={styles.action}
                            // onClick={action.onClick}
                            key={index}
                        >
                            <span className={styles.btnTitle}>
                                {action.title}
                            </span>
                        </button>
                    )} */}
                </div>
        </div>
    );
};

export default Wallet;
