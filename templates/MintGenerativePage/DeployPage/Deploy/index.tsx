import React from "react";
import cn from "classnames";
import styles from "./Deploy.module.sass";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import Image from "next/image"; // Import the Image component from Next.js
import { useRouter } from "next/router";
import useDeployGenerativeCollection from "@/hooks/useDeployGenerativeCollection";
import { useUserContext } from "context/user";
import DeployModal from "@/components/ActionModal/DeployModal";
import { useState, useEffect } from "react";
import Spinner from "@/components/Spinner";

type DeployProps = {
  cid: any;
};


const Deploy = ({ cid }: DeployProps) => {
  const { address, checkNetwork } = useUserContext();
  const [visibleDeployModal, setVisibleDeployModal] = useState<boolean>(false);
  const { collectionData, setCollectionData } = useCollectionContext();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const placeholderMetadata = {
    name: collectionData.collectionName,
    description: collectionData.description,
    image: collectionData.image,
    tags: [
      "generative",
      "mammothArt",
    ]
  };

  const { 
    deployCollection,
    contractAddress,
    isDeployed,
    deployTxHash, 
  } = useDeployGenerativeCollection({
    collectionName: collectionData.collectionName,
    symbol: collectionData.symbol,
    collectionSize: collectionData.size,
    royaltyRecipient: collectionData.royaltyRecipient,
    royaltyFee: collectionData.royaltyFee,
    placeholderMetadata: placeholderMetadata,
  });

  const onCloseModal = (setVisibleModal: any) => {
    return () => {
      setVisibleModal(false);
    };
  };

  const handlePrevStep = () => {
    router.push(`/mint-generative/details?cid=${cid}`);
  };
  useEffect(() => {
    if (isDeployed) {
      setVisibleDeployModal(true);
      setCollectionData({
        ...collectionData,
        contractAddress: contractAddress,
      });
    }
  }, [isDeployed]);

  const handleDeployCollection = () => {
    setLoading(true);
    deployCollection();
    setLoading(false);
  };



  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Take a final look to check if the project is properly configured. This
          preview is generated based on the settings which will be minted.
        </span>
      </div>
      <div className={styles.previewGroup}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <span className={styles.label}>Contract name</span>
            {collectionData.contractName ? (
              <span className={styles.value}>{collectionData.contractName}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add contract name</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Collection name</span>
            {collectionData.collectionName ? (
              <span className={styles.value}>{collectionData.collectionName}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection name</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Collection logo image</span>
            {collectionData.image ? (
              <span className={styles.value}>{collectionData.image.name}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection logo image</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Description</span>
            {collectionData.description ? (
              <span className={styles.value}>{collectionData.description}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add description</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Collection size</span>
            {collectionData.size ? (
              <span className={styles.value}>{collectionData.size}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection size</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Price</span>
            {collectionData.price ? (
              <span className={styles.value}>{collectionData.price}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection price</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Mint start date</span>
            {collectionData.startDate ? (
              <span className={styles.value}>{collectionData.startDate}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection mint start date</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Mint end date</span>
            {collectionData.endDate ? (
              <span className={styles.value}>{collectionData.endDate}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection mint end date</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Primary sale address</span>
            {collectionData.primarySaleAddress ? (
              <span className={styles.value}>{collectionData.primarySaleAddress}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add primary sale address</span>
            )}
          </div>
        </div>
        <div className={styles.preview}>
          <div>Preview</div>
          <div className={styles.previewImage}>
            {collectionData.image ? (
              <Image
                src={
                  typeof collectionData.image === "string"
                    ? collectionData.image // Base64 string or URL
                    : URL.createObjectURL(collectionData.image) // Convert File to URL
                }
                alt="preview"
                width={300} // Set appropriate width
                height={300} // Set appropriate height
                layout="responsive" // Use responsive layout
              />
            ) : (
              <></>
            )}
          </div>
          <div className={styles.previewText}>
            <span className={styles.text}>
              {collectionData.collectionName ? collectionData.collectionName : ""}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <div
          className={cn(
            "button-medium button-wide",
            styles.button,
            styles.prevBtn,
            { [styles.prevDisabled]: false }
          )}
          onClick={handlePrevStep}
        >
          <Icon name={"arrow-left"} fill="#ffffff" />
          PREV STEP
        </div>
        <div
          className={cn(
            "button-medium button-wide",
            styles.button,
            styles.nextBtn
          )}
          onClick={handleDeployCollection}
        >
          {
            loading 
              ? <Spinner className={styles.spinner}/> 
              : <div className={styles.next}> 
                  DEPLOY COLLECTION
                  <Image
                      src="/rocket-svgrepo-com.svg"
                      width={24}
                      height={24}
                      alt="Deploy Collection"
                  />
                </div>
          }
        </div>
      </div>
      {address && (
        <DeployModal
          visible={visibleDeployModal}
          onClose={onCloseModal(setVisibleDeployModal)}
          contractAddress={contractAddress}
        />

      )}
    </div>
  );
};

export default Deploy;