import cn from "classnames";
import styles from "./DeployModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
import { useUserContext } from "context/user";

type DeployModalProps = {
    visible: boolean;
    onClose: () => void;
    proxyContractAddress: any;   
};

const DeployModal: React.FC<DeployModalProps> = ({
    visible,
    onClose,
    proxyContractAddress,
}) => {
    const { address } = useUserContext();
    const renderContent = () => {
        if (!proxyContractAddress) {

            return (
                <>
                </>
            );
        } else if (proxyContractAddress) {
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
