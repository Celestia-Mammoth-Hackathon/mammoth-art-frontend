import cn from "classnames";
import styles from "./DeployModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
import { useUserContext } from "context/user";

type DeployModalProps = {
    visible: boolean;
    onClose: () => void;
};

const DeployModal: React.FC<DeployModalProps> = ({
    visible,
    onClose,
}) => {
    const { address } = useUserContext();
    const renderContent = () => {
        return (
            <>
                <div className={styles.label}>DEPLOYED!</div>
                <div className={styles.desc}>
                    Your collection is deployed successfully!
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

export default DeployModal;
