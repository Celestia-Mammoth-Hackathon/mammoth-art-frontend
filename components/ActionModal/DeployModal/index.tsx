import cn from "classnames";
import styles from "./DeployModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";

type DeployModalProps = {
    visible: boolean;
    onClose: () => void;
    contractAddress: any;
};

const DeployModal: React.FC<DeployModalProps> = ({
    visible,
    onClose,
    contractAddress
}) => {
    const renderContent = () => {
        if (!contractAddress) {
            return (
                <>
                </>
            );
        } else if (contractAddress) {
            return (
                <>
                    <div className={styles.label}>DEPLOYED!</div>
                    <div className={styles.desc}>
                    Your contract is deployed on address: {contractAddress}
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
                    <div className={styles.label}>DEPLOYMENT FAILED!</div>
                    <div className={styles.desc}>
                        Your contract has not been deployed. Please check error message and try again!
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

export default DeployModal;
