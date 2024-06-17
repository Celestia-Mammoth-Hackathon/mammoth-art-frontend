import cn from "classnames";
import styles from "./ListModal.module.sass";
import Modal from "@/components/Modal";
import { useState, useContext } from "react";
import Spinner from "@/components/Spinner";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Image from "@/components/Image";
import { useWalletContext } from "context/wallet";
import { UserContext } from "context/user";
import useListNFT from "@/hooks/useListNft";
import { STATUS } from "../status";
import { nativeCurrency } from "@/constants/details";
import { isValidAmount, isValidPrice } from "@/utils/index";

type ListModalProps = {
    item: any;
    visible: boolean;
    onClose: () => void;
    tokenAddress: any;
    property: any;
    setResponse: any;
    tokenId: any;
    response: any;
    fetchListingTrigger: boolean;
    setFetchListingTrigger: any;
    listings: any;
    claimNftTrigger?: any;
    setClaimNftTrigger?: any;
};

const ListModal: React.FC<ListModalProps> = ({
    item,
    visible,
    onClose,
    tokenAddress,
    property,
    setResponse,
    tokenId,
    response,
    fetchListingTrigger,
    setFetchListingTrigger,
    listings,
    claimNftTrigger,
    setClaimNftTrigger,
}) => {
    const { address } = useContext(UserContext);
    const { checkNetwork } = useWalletContext();
    const [chain, setChain] = useState<string>("");
    const [listAmount, setListAmount] = useState<string>("");
    const [listPrice, setListPrice] = useState<string>("");

    // State variables to track if user has changed the inputs
    const [amountChanged, setAmountChanged] = useState<boolean>(false);
    const [priceChanged, setPriceChanged] = useState<boolean>(false);

    const handleChange = (event: SelectChangeEvent) => {
        setChain(event.target.value);
    };

    const onListAmountChange = (event: SelectChangeEvent) => {
        setListAmount(event.target.value);
        setAmountChanged(true);
    }

    const onListPriceChange = (event: SelectChangeEvent) => {
        setListPrice(event.target.value);
        setPriceChanged(true);
    }

    const { isApprovingLoading, isListingLoading, listNft, writeListing, isListingError } = useListNFT({
        item,
        tokenAddress,
        address,
        listAmount,
        listPrice,
        setResponse,
        claimNftTrigger,
        setClaimNftTrigger,
        fetchListingTrigger,
        setFetchListingTrigger,
    });

    const showClose = (isApprovingLoading || isListingLoading) ? false : true;

    const renderContent = () => {
        if(isApprovingLoading) {
            return (
                <div className={styles.waiting}>
                    <div className={styles.loadingLabel}>Waiting for token approval...</div>
                    <div className={styles.desc}>
                        <Spinner className={styles.spinner}/>
                    </div>
                </div>
            );
        } else if (isListingLoading) {
            return (
                <div className={styles.waiting}>
                    <div className={styles.loadingLabel}>Waiting for listing...</div>
                    <div className={styles.desc}>
                        <Spinner className={styles.spinner}/>
                    </div>
                </div>
            );
        } else if (!response) {
            return (
                <div className={styles.modalRow}>
                <div className={styles.label}>LIST YOUR NFT</div>
                <div className={styles.desc}>List your NFT on the secondary marketplace.</div>
                <div className={styles.btnsGroup}>
                    <div className={styles.btns}>
                        <div className={styles.listQty}>
                            <div className={styles.btnLabel}>Qty (Avail: {property.availableSupply})</div>
                            <button className={styles.listQtyBtnWrap}>
                                <input
                                    className={styles.qtyInput}
                                    required={true}
                                    onChange={onListAmountChange}
                                    placeholder="1"
                                />
                            </button>                     
                        </div>
                        <span className={styles.errorText}>{amountChanged && !isValidAmount(listAmount) ? "Invalid Amount" : ""}</span>
                    </div>
                    <div className={styles.btns}>
                        <div className={styles.listSelect}>
                            <div className={styles.btnLabel}>List Price</div>
                            <button className={styles.listPriceQtyBtnWrap}>
                                <input
                                    className={styles.priceInput}
                                    required={true}
                                    onChange={onListPriceChange}
                                    placeholder="0.0"
                                />
                                    <div className={styles.currency}>
                                        <Image
                                            src="/images/celestia.svg"
                                            width="24"
                                            height="24"
                                            alt="logo"
                                        />
                                        <span className={styles.currencyToken}>{nativeCurrency.symbol}</span>
                                    </div>
                            </button>
                        </div>
                        <span className={styles.errorText}>{priceChanged && !isValidPrice(listPrice) ? "Invalid Price" : ""}</span>
                    </div>
                </div>
                <div className={styles.modalBtns}>
                    <div className={styles.modalBtn}>
                        <button
                            className={cn(
                                "button-medium button-wide",
                                styles.button,
                                styles.setBtn
                            )}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className={styles.modalBtn}>
                        <button
                            disabled={!writeListing || isListingError || !isValidAmount(listAmount) || !isValidPrice(listPrice)}
                            className={cn(
                                "button-medium button-wide",
                                styles.button,
                                { [styles.error]: !writeListing || isListingError || !isValidAmount(listAmount) || !isValidPrice(listPrice) }
                            )}
                            onClick={async () => {
                                await checkNetwork();
                                listNft();
                            }}
                        >
                            { (!writeListing && !isListingError) ? <Spinner className={styles.spinner}/> : "List"}
                        </button>
                    </div>
                </div>
            </div>
            );
        } else if (response === STATUS.SUCCESS) {
            return (
                <div className={styles.modalRow}>
                    <div className={styles.label}>LIST SUCCESSFUL!</div>
                    <div className={styles.desc}>
                        Your NFT has been listed. Check my listing tab to view your list.
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.modalRow}>
                    <div className={styles.label}>LIST FAILED!</div>
                    <div className={styles.desc}>
                        Your NFT has not been listed. Please check error message and try again!
                    </div>
                    <div>{response.transactionHash}</div>
                </div>
            );
        }
    };


    return (
        <Modal
            className={styles.modal}
            closeClassName={styles.close}
            visible={visible}
            onClose={onClose}
            showClose={showClose}
        >
            {renderContent()}
        </Modal>
    );
};

export default ListModal;