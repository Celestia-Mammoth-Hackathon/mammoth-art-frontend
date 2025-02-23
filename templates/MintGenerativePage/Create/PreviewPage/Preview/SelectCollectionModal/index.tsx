import cn from "classnames";
import styles from "./SelectCollectionModal.module.sass";
import Modal from "@/components/Modal";
import Image from "@/components/Image";
import { handleIpfsLink } from "@/utils/index";
import Icon from "@/components/Icon";
import { useState, useEffect } from "react";
import CollectionAttribute from "./CollectionAttribute";
import { useCollectionContext } from "context/collection";
import HabitatTokens from "@/constants/tokens/habitats.json";
import MammothTokens from "@/constants/tokens/mammoths.json";

type SelectCollectionModalProps = {
    visible: boolean;
    onClose: () => void;
    curatedCollections: any;
};

const SelectCollectionModal: React.FC<SelectCollectionModalProps> = ({
    visible,
    onClose,
    curatedCollections,
}) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [validCollections, setValidCollections] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
    
    const handleRowClick = (index: number) => {
        setSelectedRows((prevSelected) =>
          prevSelected.includes(index)
            ? prevSelected.filter((i) => i !== index)
            : [...prevSelected, index]
        );
    };

    useEffect(() => {
        setValidCollections(selectedRows.length > 0);
    }, [selectedRows]);

    useEffect(() => {
        if (step === 2) {
            const updatedFormaCollection = curatedCollections.reduce(
                (acc: any, collection: any, index: number) => {
                    if (collectionData?.formaCollection && 
                        collection?.token?.collectionName && 
                        collectionData.formaCollection[collection.token.collectionName]) 
                    {
                        acc[collection.token.collectionName] = collectionData.formaCollection[collection.token.collectionName];
                        return acc;
                    }
                    if (selectedRows.includes(index)) {
                        const token = collection?.token;
                        acc[token.collectionName] = !token?.attributes ? {} : null;
                    }
                    return acc;
                },
                {}
            );
            setCollectionData((prevData: any) => ({
                ...prevData,
                formaCollection: updatedFormaCollection,
            }));
            // Save to localStorage
            saveDataToLocalStorage({
                formaCollection: updatedFormaCollection
            });
        }
    }, [step, selectedRows, curatedCollections]);

    const handleSelectedCollections = () => {
        onClose();
    }

    const handleNextStep = () => {
        if (step === 1) {
            setStep(2); 
        }
    };

    const renderStep1Content = () => (
        <>
            <div className={styles.label}>Select a collection</div>
            <div className={styles.desc}>
                {curatedCollections.map((collection: any, index: number) => (
                    <div
                        className={cn(styles.col, {
                            [styles.selected]: selectedRows.includes(index),
                        })}
                        key={index}
                        onClick={() => handleRowClick(index)}
                        style={{
                            opacity: selectedRows.includes(index) ? 0.5 : 1,
                            position: "relative",
                            cursor: "pointer",
                        }}
                    >
                        <div className={styles.row}>
                            <div className={styles.preview}>
                                <Image
                                    src={collection?.token.collectionImage || handleIpfsLink(
                                        collection?.token.metadata.image
                                    )}
                                    width="180px"
                                    height="180px"
                                    alt="NFT"
                                />
                            </div>
                        </div>
                        <div className={styles.name}>
                            <span className={styles.collectionName}>
                                {collection?.token?.collectionName}
                            </span>
                        </div>
                        <div
                            className={cn(styles.check, {
                                [styles.visible]: selectedRows.includes(index),
                            })}
                        >
                            <Icon name={"check"} size="40" fill="#ff6b6b" />
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.buttonWrapper}>
                <div
                    className={cn(
                        "button-medium button-wide",
                        styles.button,
                        { [styles.disabled]: !validCollections }
                    )}
                    onClick={validCollections ? handleNextStep : undefined}
                >
                    <div className={styles.next}>
                        NEXT STEP
                        <Icon name={"arrow-right"} fill="#ffffff" />
                    </div>
                </div>
            </div>
        </>
    );

    const renderStep2Content = () => {
        return (
            <>
            <div className={styles.label}>Review Your Selection</div>
            <div className={styles.step2Desc}>
                {selectedRows.map((index) => {
                    const token = curatedCollections[index]?.token;

                    // Skip rendering if attributes are not defined
                    if (!token?.attributes) return null;

                    return (
                        <div className={styles.collection} key={index}>
                            <div className={styles.step2Col}>
                                <div className={styles.innerRow}>
                                    <div className={styles.preview}>
                                        <Image
                                            src={
                                                token.collectionImage ||
                                                handleIpfsLink(token.metadata.image)
                                            }
                                            width="300px"
                                            height="300px"
                                            alt="NFT"
                                        />
                                    </div>
                                </div>
                                <div className={styles.name}>
                                    <span className={styles.collectionName}>
                                        {token?.collectionName}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.step2Col}>
                                <div className={styles.name}>
                                    <span className={styles.collectionName}>
                                        <CollectionAttribute collection={token} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={styles.buttonWrapper}>
                <div
                    className={cn(
                        "button-medium button-wide",
                        styles.button,
                        styles.prevBtn,
                    )}
                    onClick={() => setStep(1)} 
                >
                    <Icon name={"arrow-left"} fill="#ffffff" />
                    <div className={styles.next}>
                        PREV STEP
                    </div>
                </div>
                <div
                    className={cn(
                        "button-medium button-wide",
                        styles.button
                    )}
                    onClick={handleSelectedCollections} 
                >
                    <div className={styles.next}>
                        FINISH
                        <Icon name={"check"} fill="#ffffff" />
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <Modal
            className={styles.modal}
            closeClassName={styles.close}
            visible={visible}
            onClose={onClose}
        >
            <div className={styles.modalRow}>
                {step === 1 ? renderStep1Content() : renderStep2Content()}
            </div>
        </Modal>
    );
};

export default SelectCollectionModal;
