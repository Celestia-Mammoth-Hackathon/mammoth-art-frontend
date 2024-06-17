import cn from "classnames";
import styles from "./TransferModal.module.sass";
import Modal from "@/components/Modal";
import { chainExplorerURL } from "@/constants/details";
import Spinner from "@/components/Spinner";
import { useWalletContext } from "context/wallet";
import { STATUS } from "../status";

type TransferModalProps = {
    visible: boolean;
    onClose: () => void;
    isLoading: boolean;
    isError: boolean;
    onTransferNFT: () => Promise<void>;
    onToAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTransferAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    property: any;
    response: any;
    transferHash: any;
};

const TransferModal: React.FC<TransferModalProps> = ({
    visible,
    onClose,
    isLoading,
    isError,
    onTransferNFT,
    onToAddressChange,
    onTransferAmountChange,
    property,
    response,
    transferHash
}) => {
    const { checkNetwork } = useWalletContext();

    const renderContent = () => {
        if (!response) {
            return (
                <>
                    <div className={styles.label}>TRANSFER YOUR NFT</div>
                    <div className={styles.desc}>
                        You can transfer your NFTs to another Forma address.
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.qty}>
                            <div className={styles.btnLabel}>Qty (Owned: {property.owned})</div>
                            <button className={styles.qtyBtnWrap}>
                                <input
                                    className={styles.qtyInput}
                                    required={true}
                                    onChange={onTransferAmountChange}
                                    placeholder="1"
                                />
                            </button>
                        </div>
                        <div className={styles.recipient}>
                            <div className={styles.btnLabel}>Recipient</div>
                            <button className={styles.btnWrap}>
                                <input
                                    className={styles.buyNowInput}
                                    required={true}
                                    onChange={onToAddressChange}
                                    placeholder="0x123... or ENS"
                                />
                            </button>
                        </div>
                    </div>
                    <div className={styles.modalBtns}>
                        <div className={styles.modalBtn}>
                            <a
                                className={cn(
                                    "button-medium button-wide",
                                    styles.button,
                                    styles.setBtn
                                )}
                                onClick={onClose}
                            >
                                Cancel
                            </a>
                        </div>
                        <div className={styles.modalBtn}>
                            <a
                                className={cn(
                                    "button-medium button-wide",
                                    styles.button
                                )}
                                onClick={async() => {
                                    await checkNetwork();
                                    onTransferNFT();
                                }}
                            >
                                {(isLoading && !isError) ? <Spinner className={styles.spinner}/> : "Transfer"}
                            </a>
                        </div>
                    </div>
                </>
            );
        } else if (response === STATUS.SUCCESS) {
            return (
                <>
                    <div className={styles.label}>TRANSFER COMPLETE!</div>
                    <div className={styles.desc}>
                        Your NFT has been transferred. Check the transaction link below to verify details.
                    </div>
                    <a 
                        className={styles.txUrl}
                        href={`${chainExplorerURL}/tx/${transferHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {transferHash}
                    </a>
                </>
            );
        } else {
            return (
                <>
                    <div className={styles.label}>TRANSFER FAILED!</div>
                    <div className={styles.desc}>
                        Your NFT has not been transferred. Please check error message and try again!
                    </div>
                    <div>{transferHash}</div>
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

export default TransferModal;
