import cn from "classnames";
import styles from "./BuyModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
import { useUserContext } from "context/user";

type BuyModalProps = {
    visible: boolean;
    onClose: () => void;
    response: any;
};

const BuyModal: React.FC<BuyModalProps> = ({
    visible,
    onClose,
    response
}) => {
    const { address } = useUserContext();
    const renderContent = () => {
        if (!response) {
            return (
                <>

                </>
            );
        } else if (response === STATUS.SUCCESS) {
            return (
                <>
                    <div className={styles.label}>PURCHASED!</div>
                    <div className={styles.desc}>
                    Successfully purchased! You can check your collection to view your NFTs.
                    </div>
                    <Link href={`/profile/${address}`}>

                                <a
                                    className={cn(
                                        "button-medium button-wide",
                                        styles.button,
                                        styles.setBtn
                                    )}
                                >
                                    VIEW MY COLLECTION
                                </a>
                        
                    </Link>
                    
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.label}>BUY FAILED!</div>
                    <div className={styles.desc}>
                        Your NFT has not been bought. Please check error message and try again!
                    </div>
                    {/* <div>{response.receipt.transactionHash}</div> */}
                </>
            );
        }
    };

    return (
        <Modal
            className={styles.modal}
            closeClassName={styles.close}
            visible={visible}
            onClose={onClose}
        >
            <div className={styles.modalRow}>
                {renderContent()}
            </div>
        </Modal>
    );
};

export default BuyModal;
