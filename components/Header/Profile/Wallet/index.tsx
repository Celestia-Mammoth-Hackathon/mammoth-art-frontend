import { useContext } from "react";
import styles from "./Wallet.module.sass";
import { UserContext } from "context/user";
import { nativeCurrency } from "@/constants/details";

type WalletProps = {
    onDisconnect: () => void;
    account?: any;
};

const Wallet = ({ account, onDisconnect }: WalletProps) => {
    const actions = [
        {
            title: "DEPOSIT",
            onClick: "",
        },
        {
            title: "WITHDRAW",
            onClick: "",
        },
    ];

    const { balance } = useContext(UserContext);

    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div className={styles.title}>Balance</div>
                <div className={styles.balances}>
                    
                        <div >
                            <span className={styles.balance}>
                                {balance} {nativeCurrency.symbol}
                            </span>
                        </div>
                    
                </div>
                <div className={styles.actions}>
                    {actions.map((action: any, index: number) =>
                        <button
                            className={styles.action}
                            // onClick={action.onClick}
                            key={index}
                        >
                            <span className={styles.btnTitle}>
                                {action.title}
                            </span>
                        </button>
                    )}
                </div>
            </div>
            {/* <div className={styles.details}>
                <div className={styles.title}>Balance History</div>
                {balanceHistory.map((balance: any, index: number) =>
                        <div
                            className={styles.history}
                            key={index}
                        >
                            <div className={styles.from}>
                                <div className={styles.chain}>
                                    <Image
                                        src={balance.chainIconFrom}
                                        alt="chain from"
                                        width={24}
                                        height={24}
                                    />
                                    {balance.from} 
                                </div>
                                <div className={styles.amount}>
                                <Image
                                        src={balance.amountIconFrom}
                                        alt="chain from"
                                        width={24}
                                        height={24}
                                    />
                                    {balance.amountFrom} 
                                </div>
                            </div>
                            <Image
                                src="/images/polygon.png"
                                width={24}
                                        height={24}
                                alt="chain to"
                            />
                            <div className={styles.to}>
                                <div className={styles.chain}>
                                    <Image
                                        src={balance.chainIconTo}
                                        alt="chain to"
                                        width={24}
                                        height={24}
                                    />
                                    {balance.to} 
                                </div>
                                <div className={styles.amount}>
                                <Image
                                        src={balance.amountIconTo}
                                        alt="amount to"
                                        width={24}
                                        height={24}
                                    />
                                    {balance.amountTo} 
                                </div>
                            </div>
                        </div>
                )}
            </div> */}
        </div>
    );
};

export default Wallet;
