import { useState } from "react";
import cn from "classnames";
import styles from "./MintModal.module.sass";
import Modal from "@/components/Modal";
import Link from "next/link";
import { STATUS } from "../status";
import Image from "@/components/Image";
import { transformUri } from "@/utils/ipfs";
import Spinner from "@/components/Spinner";
import { useUserContext } from "context/user";
type MintModalProps = {
    visible: boolean;
    onClose: () => void;
    response: any;
    mintedTokens: any;
    isMintingLoading: boolean;
    isMintingError: boolean;
    checkNetwork: any;
    showMintAgain: boolean;
    claimNFT: () => void;
};

const MintModal: React.FC<MintModalProps> = ({
    visible,
    onClose,
    response,
    mintedTokens,
    isMintingLoading,
    isMintingError,
    checkNetwork,
    showMintAgain,
    claimNFT,
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
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
                    <div className={styles.label}>MINT SUCCESSFUL!</div>
                    <div className={styles.desc}>
                        {showMintAgain
                            ? `Your NFT(s) have been minted. Check your collection to view your NFT(s) or try again to mint a rare.`
                            : `Your NFT(s) have been minted. Check your collection to view your NFT(s).`
                        }
                    </div>
                    {showMintAgain && mintedTokens.length > 0 && (
                        <div className={styles.previewRow}>
                            {mintedTokens.map((token: any, index: number) => (
                                <div className={styles.previewContainer} key={index}>
                                <div className={styles.preview}>
                                    {(isMintingLoading || isLoading) && !isMintingError ? (
                                        <Image
                                            className={styles.questionPhoto}
                                            src="/images/question-mark.png"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    ) : (
                                        <Image
                                            src={transformUri(token.metadata.image)}
                                            layout="fill"
                                            objectFit="contain"
                                            alt="Token"
                                        />
                                    )}
                                    </div>
                                    {token.metadata.rarity ? (
                                        <div className={styles.chance}>
                                            <span className={styles.chanceLabel}>Chance</span>
                                            <span className={styles.chanceValue}>
                                                {(isMintingLoading || isLoading) && !isMintingError ? '--' : `${token.metadata.rarity}%`}
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    )}
                    {showMintAgain && !isMintingError && (
                        <button
                            disabled={isMintingLoading || isLoading}
                            className={cn(
                                "button-medium button-wide",
                                styles.button,
                            )}
                            onClick={async () => {
                                setIsLoading(true);
                                await new Promise<void>(resolve => setTimeout(() => {
                                    setIsLoading(false);
                                    resolve();
                                }, 1500));
                                await checkNetwork()
                                claimNFT()
                            }}
                        >
                            {
                                ((isMintingLoading || isLoading) && !isMintingError)
                                    ? <Spinner className={styles.spinner} />
                                    : "MINT AGAIN"
                            }
                        </button>
                    )}
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
