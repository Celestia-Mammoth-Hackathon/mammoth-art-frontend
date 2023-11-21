import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Image from "@/components/Image";

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
    const balances = [
        "96 TIA",
        "1.12 wETH",
        "1,920 wUSDC"
    ];
    const balanceHistory = [
        {
            from: "Celestia",
            chainIconFrom: "/images/transfer/tia-logo.jpg",
            amountFrom: "51 TIA",
            amountIconFrom: "/images/transfer/tia-logo.jpg",
            to: "Ethereum",
            chainIconTo: "/images/transfer/eth-logo.jpg",
            amountTo: "0.51 ETH",
            amountIconTo: "/images/transfer/eth-logo.jpg",
            date: "1700469103964"
        },
        // {
        //     from: "Celestia",
        //     chainIconFrom: "/images/transfer/tia-logo.jpg",
        //     amountFrom: "51 TIA",
        //     amountIconFrom: "/images/transfer/tia-logo.jpg",
        //     to: "Ethereum",
        //     chainIconTo: "/images/transfer/eth-logo.jpg",
        //     amountTo: "0.51 ETH",
        //     amountIconTo: "/images/transfer/eth-logo.jpg",
        //     date: "1700469103964"
        // },
    ]
    return (
        <div className={styles.wallet}>
            <div className={styles.head}>
                <div className={styles.title}>Balances</div>
                <div className={styles.balances}>
                    {balances.map((balance: any, index: number) =>
                        <div key={index}>
                            <span className={styles.balance}>
                                {balance}
                            </span>
                        </div>
                    )}
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
