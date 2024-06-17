import cn from "classnames";
import styles from "./CancelModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
type CancelModalProps = {
    visible: boolean;
    onClose: () => void;
    response: any;
};

const CancelModal: React.FC<CancelModalProps> = ({
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
                    <div className={styles.label}>CANCEL SUCCESSFUL!</div>
                    <div className={styles.desc}>
                        Your order has been canceled. Check my listing tab to view your list.
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.label}>CANCEL FAILED!</div>
                    <div className={styles.desc}>
                        Your NFT has not been canceled. Please check error message and try again!
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

export default CancelModal;
