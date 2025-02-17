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
import useCreateDrop from "@/hooks/useCreateDrop";
import { uploadZipFileToIPFS } from "@/utils/ipfs";

type DeployProps = {
  cid: any;
};


const Deploy = ({ cid }: DeployProps) => {
  const { address, checkNetwork } = useUserContext();
  const [visibleDeployModal, setVisibleDeployModal] = useState<boolean>(false);
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [dropZipContentStatus, setDropZipContentStatus] = useState<any>("idle");

  const router = useRouter();

  const placeholderMetadata = {
    name: collectionData.placeholderMetadata?.name,
    description: collectionData.placeholderMetadata?.description,
    image: collectionData.placeholderMetadata?.image,
    tags: [
      "generative",
      "mammothArt",
    ]
  };

  const { 
    deployCollection,
    contractAddress: proxyContractAddress,
    isDeployed : isProxyDeployed,
    deployTxHash: proxyDeployTxHash,
    deployStatus: proxyDeployStatus,
    setPlaceHolderMetadataStatus,
    setRevealMetadataStatus
  } = useDeployGenerativeCollection({
    collectionName: collectionData.collectionName,
    symbol: collectionData.symbol,
    collectionSize: collectionData.size,
    royaltyRecipient: collectionData.royaltyRecipient,
    royaltyFee: collectionData.royaltyFee,
    placeholderMetadata: collectionData.placeholderMetadata,
    revealMetadata: collectionData.revealMetadata,
  });

  const { 
    createDrop,
    grantMinterStatus,
    grantMinterTxHash,
    isDropCreated,
    createDropStatus
  } = useCreateDrop({
    proxyContractAddress: proxyContractAddress as `0x${string}`,
    recipient: collectionData.primarySaleAddress,
    token: {
      tokenAddress: proxyContractAddress as `0x${string}`,
      tokenId: 0,
    },
    maxAllowed: 0,
    maxPerWallet: 0,
    maxPerToken: 0,
    maxPerBlock: 0,
    reserves: 0,
    startDate: new Date(collectionData.startDate),
    endDate: new Date(collectionData.endDate),
    price: collectionData.price,
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
    if (isProxyDeployed) {
      setCollectionData({
        ...collectionData,
        contractAddress: proxyContractAddress,
      });
      saveDataToLocalStorage({
        contractAddress: proxyContractAddress,
      });
      createDrop();
    }
  }, [isProxyDeployed]);

  useEffect(() => {
    console.log(proxyDeployStatus, setPlaceHolderMetadataStatus, grantMinterStatus, createDropStatus);
    if(dropZipContentStatus === 'error' || proxyDeployStatus === 'error' || setPlaceHolderMetadataStatus === 'error' || setRevealMetadataStatus === 'error' || grantMinterStatus === 'error' || createDropStatus === 'error') {
      setLoading(false);
    }
  }, [dropZipContentStatus, proxyDeployStatus, setPlaceHolderMetadataStatus, setRevealMetadataStatus, grantMinterStatus, createDropStatus]);

  const deployZipContentToIPFS = async () => {
    try {
      setDropZipContentStatus('pending');
      console.log(collectionData.zipFile, collectionData.size, collectionData.collectionName);
      const ipfsResult = await uploadZipFileToIPFS(
        collectionData.zipFile, 
        collectionData.size, 
        collectionData.collectionName
      );

      if (ipfsResult.metadataHash) {
        setDropZipContentStatus('success');
        setCollectionData({
          ...collectionData,
          revealMetadata: {
            _metadata: ipfsResult.metadataHash,
          },
        });
        saveDataToLocalStorage({
          revealMetadata: {
            _metadata: ipfsResult.metadataHash,
          },
        });
        return true; // Return true on success
      } else {
        setDropZipContentStatus('error');
        return false; // Return false on failure
      }
    } catch (error) {
      console.error('IPFS upload error:', error);
      setDropZipContentStatus('error');
      setLoading(false);
      return false;
    }
  }

  const handleDeployCollection = async () => {
    try {
      setLoading(true);
      const ipfsSuccess = await deployZipContentToIPFS();
      
      if (ipfsSuccess) {
        // Only proceed with deployment if IPFS upload was successful
        deployCollection();
      } else {
        console.error('IPFS upload failed, stopping deployment');
        setLoading(false);
      }
    } catch (error) {
      console.error('Deployment error:', error);
      setLoading(false);
    }
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error' | 'idle') => {
    switch (status) {
      case 'pending':
        return <Spinner className={styles.spinner} />;
      case 'success':
        return <Icon name="check" fill="#00ff00" />;
      case 'error':
        return <Icon name="close" fill="#ff0000" />;
      case 'idle':
        return <Image src="/images/icons/hourglass.svg" alt="idle" width={24} height={24}/>;
      default:
        return null;
    }

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
            {collectionData?.collectionName ? (
              <span className={styles.value}>{collectionData?.collectionName}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection name</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Collection logo image</span>
            {collectionData?.collectionImage ? (
              <span className={styles.value}>{collectionData?.collectionImage.name}</span>
            ) : (
              <span className={styles.notUploadedValue}>Add collection logo image</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <span className={styles.label}>Description</span>
            {collectionData?.collectionDescription ? (
              <span className={styles.value}>{collectionData?.collectionDescription}</span>
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
          <div className={styles.deploymentStatus}>
            <h3>Deployment Status</h3>
            <div className={styles.statusItem}>
              {getStatusIcon(dropZipContentStatus)}
              <span>Deploy zip content to IPFS</span>
            </div>
            <div className={styles.statusItem}>
              {getStatusIcon(proxyDeployStatus)}
              <span>Deploy generative art contract</span>
            </div>
            <div className={styles.statusItem}>
              {getStatusIcon(setPlaceHolderMetadataStatus)}
              <span>Set up placeholder metadata</span>
            </div>
            <div className={styles.statusItem}>
              {getStatusIcon(setRevealMetadataStatus)}
              <span>Set up reveal metadata</span>
            </div>
            <div className={styles.statusItem}>
              {getStatusIcon(createDropStatus)}
              <span>Create drop</span>
            </div>
            <div className={styles.statusItem}>
              {getStatusIcon(grantMinterStatus)}
              <span>Grant minter role for drop</span>
            </div>
          </div>
        </div>
        <div className={styles.preview}>
          <div>
            <div className={styles.previewTitle}>Collection Preview</div>
            <div className={styles.previewImage}>
              {collectionData?.collectionImage ? (
                <Image
                  src={
                    typeof collectionData?.collectionImage === "string"
                      ? collectionData?.collectionImage // Base64 string or URL
                      : URL.createObjectURL(collectionData?.collectionImage) // Convert File to URL
                  }
                  alt="preview"
                  width={400} // Set appropriate width
                  height={400} // Set appropriate height
                  layout="responsive" // Use responsive layout
                />
              ) : (
                <></>
              )}
            </div>
            <div className={styles.previewText}>
              <span className={styles.text}>
                {collectionData?.collectionName ? collectionData?.collectionName + ": " + collectionData?.collectionDescription : ""}
              </span>
            </div>
          </div>
          
          <div>
              <div className={styles.previewTitle}>Placeholder Metadata Preview</div>
              <div className={styles.previewImage}>
                {collectionData?.placeholderMetadata?.image ? (
                  <Image
                    src={
                      typeof collectionData?.placeholderMetadata?.image === "string"
                        ? collectionData?.placeholderMetadata?.image // Base64 string or URL
                        : URL.createObjectURL(collectionData?.placeholderMetadata?.image) // Convert File to URL
                    }
                    alt="preview"
                    width={400} // Set appropriate width
                    height={400} // Set appropriate height
                    layout="responsive" // Use responsive layout
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.previewText}>
                <span className={styles.text}>
                  {collectionData?.placeholderMetadata ? collectionData?.placeholderMetadata?.name + ": " + collectionData.placeholderMetadata?.description : ""}
                </span>
              </div>
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
          proxyContractAddress={proxyContractAddress}
        />

      )}
    </div>
  );
};

export default Deploy;