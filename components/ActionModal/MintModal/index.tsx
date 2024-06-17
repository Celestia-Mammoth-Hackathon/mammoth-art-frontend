import cn from "classnames";
import styles from "./MintModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
type MintModalProps = {
    visible: boolean;
    onClose: () => void;
    response: any;
};

const MintModal: React.FC<MintModalProps> = ({
    visible,
    onClose,
    response
}) => {
    const renderContent = () => {
        if (!response) {
            return (
                <>
                </>
            );
        } else if (response === STATUS.SUCCESS) {
            return (
                <>
                    <div className={styles.label}>MINT SUCCESSFUL!</div>
                    <div className={styles.desc}>
                        Your NFT has been minted. Check your collection to view your NFTs.
                    </div>
                    <Link href="/my-collection">

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
                    <div className={styles.label}>MINT FAILED!</div>
                    <div className={styles.desc}>
                        Your NFT has not been minted. Please check error message and try again!
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

export default MintModal;
