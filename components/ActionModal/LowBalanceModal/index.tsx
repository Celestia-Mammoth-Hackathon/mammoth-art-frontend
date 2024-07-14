import cn from "classnames";
import styles from "./LowBalanceModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";

type LowBalanceModalProps = {
    visible: boolean;
    onClose: () => void;
};

const LowBalanceModal: React.FC<LowBalanceModalProps> = ({
    visible,
    onClose,
}) => {
    return (
        <Modal
            className={styles.modal}
            visible={visible}
            onClose={onClose}
            showClose={false}
        >
            <div className={styles.row}>
                <div className={styles.label}>LOW BALANCE</div>
                <div className={styles.description}>
                    Your balance is too low. Deposit more TIA to purchase this item.
                </div>
                <Link href="https://bridge.forma.art/">
                    <a
                        className={cn(
                            "button-medium button-wide",
                            styles.button,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        DEPOSIT FUNDS
                    </a>
                </Link>
            </div>
        </Modal>
    );
};

export default LowBalanceModal;
