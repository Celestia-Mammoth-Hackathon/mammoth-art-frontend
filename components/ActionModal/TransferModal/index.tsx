import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./TransferModal.module.sass";
import Modal from "@/components/Modal";
import { chainExplorerURL } from "@/constants/details";
import Spinner from "@/components/Spinner";
import { STATUS } from "../status";
import { resolveName } from '@/utils/provider';
import { debounce } from 'lodash';
import useTransferNFT from "@/hooks/useTransferNft";

// Define the delay time in milliseconds for debouncing
const DEBOUNCE_DELAY = 500;

type TransferModalProps = {
    tokenAddress: string;
    tokenId: string;
    tokenType: string;
    address: string;
    owned: any;
    visible: boolean;
    onClose: () => void;
    setVisibleTransferMenu: any;
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
};

const TransferModal: React.FC<TransferModalProps> = ({
    tokenAddress,
    tokenId,
    tokenType,
    address,
    owned,
    visible,
    onClose,
    setVisibleTransferMenu,
    claimNftTrigger,
    setClaimNftTrigger,
}) => {
    const { checkNetwork } = useUserContext();
    const [transferAmount, setTransferAmount] = useState<any>(0);
    const [toAddress, setToAddress] = useState<string>("");
    const [resolvedAddress, setResolvedAddress] = useState<string>("");
    const [response, setResponse] = useState<any>(null);

    useEffect(() => {
        // Define the debounced version of resolveAddress
        const debouncedResolveAddress = debounce(async () => {
            if (toAddress && !toAddress.startsWith("0x")) {
                const resolved = await resolveName(toAddress);
                setResolvedAddress(resolved);
            } else {
                setResolvedAddress(toAddress);
            }
        }, DEBOUNCE_DELAY);

        // Call the debounced function when toAddress changes
        debouncedResolveAddress();

        // Cleanup function to cancel any pending debounce call
        return () => {
            debouncedResolveAddress.cancel();
        };
    }, [toAddress]);

    const { isTransferLoading, transferNft, transferHash, isTransferError } = useTransferNFT({
        tokenAddress,
        tokenId: tokenId || "0",
        tokenType,
        address,
        toAddress: resolvedAddress,
        transferAmount: transferAmount || 0,
        setVisibleTransferMenu,
        setResponse,
        claimNftTrigger,
        setClaimNftTrigger,
    });

    const onTransferAmountChange = (e:any) => {
        setTransferAmount(e.target.value)
    }

    const onToAddressChange = (e:any) => {
        setToAddress(e.target.value)
    }

    const renderContent = () => {
        if (!response) {
            return (
                <>
                    <div className={styles.label}>TRANSFER YOUR NFT</div>
                    <div className={styles.desc}>
                        You can transfer your NFTs to another Forma address.
                    </div>
                    <div className={styles.btns}>
                        {tokenType === "ERC1155" && (
                        <div className={styles.qty}>
                            <div className={styles.btnLabel}>Qty (Owned: {owned})</div>
                            <button className={styles.qtyBtnWrap}>
                                <input
                                    className={styles.qtyInput}
                                    required={true}
                                    onChange={onTransferAmountChange}
                                    placeholder="1"
                                />
                            </button>
                        </div>
                        )}
                        <div className={cn(styles.recipient, {[styles.full]: tokenType === "ERC721"})}>
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
                                    transferNft();
                                }}
                            >
                                {(isTransferLoading && !isTransferError) ? <Spinner className={styles.spinner}/> : "Transfer"}
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
