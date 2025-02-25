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

  const { 
    deployCollection,
    contractAddress: proxyContractAddress,
    isProxyDeployed : isProxyDeployed,
    isSetUpPlaceHolderMetadataSuccess: isSetUpPlaceHolderMetadataSuccess,
    isSetUpRevealMetadataSuccess: isSetUpRevealMetadataSuccess,
    isSetUpInfluencingNFTsSuccess: isSetUpInfluencingNFTsSuccess,
    isSetUpContractMetadataSuccess: isSetUpContractMetadataSuccess,
    deployTxHash: proxyDeployTxHash,
    isSetUpAllSuccess: isSetUpAllSuccess,
    deployStatus: proxyDeployStatus,
    setPlaceHolderMetadataStatus,
    setRevealMetadataStatus,
    setInfluencingNFTsStatus,
    setContractMetadataStatus,
    setPlaceHolderMetadata,
    setRevealMetadata,
    setInfluencingNFTs,
    setContractMetadata
  } = useDeployGenerativeCollection({
    collectionName: collectionData.contractName,
    collectionDescription: collectionData.collectionDescription,
    collectionImageCid: collectionData.collectionImageCid,
    symbol: collectionData.contractSymbol,
    collectionSize: collectionData.size,
    royaltyRecipient: collectionData.royaltyAddress,
    royaltyFee: collectionData.royalty,
    placeholderMetadata: collectionData.placeholderMetadata,
    revealMetadata: collectionData.revealMetadata,
    influencingNFTs: collectionData?.influencingNFTs?.length > 0 ? collectionData.influencingNFTs : [],
  });

  const { 
    createDrop,
    grantMinterStatus,
    dropTransactionHash,
    isDropCreated,
    createDropStatus,
    isGrantMinterSuccess
  } = useCreateDrop({
    proxyContractAddress: collectionData.contractAddress as `0x${string}`,
    recipient: collectionData.primarySaleAddress,
    token: {
      tokenAddress: collectionData.contractAddress as `0x${string}`,
      tokenId: 0,
    },
    maxAllowed: collectionData.size,
    maxPerWallet: 0,
    maxPerToken: 0,
    maxPerBlock: 0,
    reserves: 0,
    startDate: new Date(collectionData.startDate),
    endDate: new Date(collectionData.endDate),
    price: collectionData.price,
  });

  const statusItems = [
    // Check if zip content is already deployed
    {
      status: collectionData?.revealMetadata?._metadata 
        ? 'success'
        : dropZipContentStatus,
      label: "Deploy zip content to IPFS",
      required: true
    },
    // Check if contract is already deployed
    {
      status: collectionData?.contractAddress 
        ? 'success'
        : proxyDeployStatus,
      label: "Deploy generative art contract",
      required: true
    },
    // Check if contract metadata is already set up
    {
      status: collectionData?.contractMetadataStatus
        ? 'success'
        : setContractMetadataStatus,
      label: "Set up contract metadata",
      required: true
    },
    // Show placeholder metadata if exists
    {
      status: collectionData?.placeholderMetadataStatus
        ? 'success'
        : setPlaceHolderMetadataStatus,
      label: "Set up placeholder metadata",
      required: true,
      show: Boolean(collectionData?.placeholderMetadata?.name && 
                    collectionData?.placeholderMetadata?.description && 
                    collectionData?.placeholderMetadata?.image)
    },
    // Show reveal metadata if exists
    {
      status: collectionData?.revealMetadataStatus
        ? 'success'
        : setRevealMetadataStatus,
      label: "Set up reveal metadata",
      required: true,
      // show: Boolean(collectionData?.revealMetadata?._metadata)
    },
    // Show influencing NFTs only if they exist
    {
      status: collectionData?.influencingNFTsStatus
        ? 'success'
        : setInfluencingNFTsStatus,
      label: "Set up influencing NFTs",
      required: false,
      show: Boolean(collectionData?.influencingNFTs?.length)
    },
    // Check if drop is already created
    {
      status: collectionData?.dropTransactionHash 
        ? 'success'
        : createDropStatus,
      label: "Create drop",
      required: true
    },
    // Always show minter role grant
    {
      status: collectionData?.grantMinterStatus
        ? 'success'
        : grantMinterStatus,
      label: "Grant minter role for drop",
      required: true
    }
  ];

  const formItems = [
    {
      label: "Contract name",
      value: collectionData.contractName,
      placeholder: "Add contract name"
    },
    {
      label: "Collection name",
      value: collectionData?.collectionName,
      placeholder: "Add collection name"
    },
    {
      label: "Collection logo image",
      value: collectionData?.collectionImage?.name,
      placeholder: "Add collection logo image"
    },
    {
      label: "Description",
      value: collectionData?.collectionDescription,
      placeholder: "Add description"
    },
    {
      label: "Collection size",
      value: collectionData.size,
      placeholder: "Add collection size"
    },
    {
      label: "Price",
      value: collectionData.price,
      placeholder: "Add collection price"
    },
    {
      label: "Mint start date",
      value: collectionData.startDate,
      placeholder: "Add collection mint start date"
    },
    {
      label: "Mint end date",
      value: collectionData.endDate,
      placeholder: "Add collection mint end date"
    },
    {
      label: "Primary sale address",
      value: collectionData.primarySaleAddress,
      placeholder: "Add primary sale address"
    }
  ];

  const onCloseModal = (setVisibleModal: any) => {
    return () => {
      setVisibleModal(false);
    };
  };

  const handlePrevStep = () => {
    router.push(`/mint-generative/details?cid=${cid}`);
  };

  useEffect(() => {
    if (isSetUpAllSuccess) {
      console.log("Creating drop")
      createDrop();
    }
  }, [isSetUpAllSuccess]);


  useEffect(() => {
    if(dropZipContentStatus === 'error' || setInfluencingNFTsStatus === 'error' || proxyDeployStatus === 'error' || setContractMetadataStatus === 'error' || setPlaceHolderMetadataStatus === 'error' || setRevealMetadataStatus === 'error' || grantMinterStatus === 'error' || createDropStatus === 'error') {
      setLoading(false);
    }

    if(collectionData?.contractAddress && collectionData?.dropTransactionHash && grantMinterStatus === 'success') {
      setLoading(false);
      console.log("Setting visible deploy modal")
      setVisibleDeployModal(true);
    }
  }, [dropZipContentStatus, proxyDeployStatus, setContractMetadataStatus, setPlaceHolderMetadataStatus, setInfluencingNFTsStatus, setRevealMetadataStatus, grantMinterStatus, createDropStatus]);
  
  const deployZipContentToIPFS = async () => {
    try {
      setDropZipContentStatus('pending');

      const ipfsResult : any = await uploadZipFileToIPFS(
        collectionData.zipFile, 
        collectionData.size, 
        collectionData.collectionName
      );

      if (ipfsResult.metadataHash) {
        setDropZipContentStatus('success');
        setCollectionData({
          ...collectionData,
          revealMetadata: {
            _metadata: 'ipfs://' + ipfsResult.metadataHash,
          },
        });
        saveDataToLocalStorage({
          revealMetadata: {
            _metadata: 'ipfs://' + ipfsResult.metadataHash,
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

      // Step 1: Deploy zip content to IPFS if not already deployed
      if (!collectionData?.revealMetadata?._metadata) {
        const ipfsSuccess = await deployZipContentToIPFS();
        if (!ipfsSuccess) {
          console.error('IPFS upload failed, stopping deployment');
          setLoading(false);
          return;
        }
      }

      // Step 2: Deploy contract if not already deployed
      if (!collectionData?.contractAddress) {
        await deployCollection();
      } 

      else if (collectionData?.contractAddress) {

        // Step 3: Set up contract metadata if not already set up
        if (!collectionData?.contractMetadataStatus) {
          setContractMetadata(collectionData?.contractAddress);
        }

        // Step 4: Set up placeholder metadata if not already set up
        if (!collectionData?.placeholderMetadataStatus) {
          console.log("Setting up placeholder metadata")
          setPlaceHolderMetadata(collectionData?.contractAddress);
        }

        // Step 5: Set up reveal metadata if not already set up
        if (!collectionData?.revealMetadataStatus) {
          setRevealMetadata(collectionData?.contractAddress);
        }

        // Step 6: Set up influencing NFTs if not already set up
        if (collectionData?.influencingNFTs?.length > 0) {
          if (!collectionData?.influencingNFTsStatus) {
            setInfluencingNFTs(collectionData?.contractAddress);
          }
        }

        // Step 7: Create drop if contract is deployed but drop isn't
        if (!collectionData?.dropTransactionHash) {
          createDrop();
        }
      }
      // All steps completed
      else {
        console.log('All deployment steps are already completed');
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
          {formItems.map((item, index) => (
            <div key={index} className={styles.formGroup}>
              <span className={styles.label}>{item.label}</span>
              {item.value ? (
                <span className={styles.value}>{item.value}</span>
              ) : (
                <span className={styles.notUploadedValue}>{item.placeholder}</span>
              )}
            </div>
          ))}
          
          <div className={styles.deploymentStatus}>
            <h3>Deployment Status</h3>
            {statusItems
              .filter(item => item.required || item.show)
              .map((item, index) => (
                <div key={index} className={styles.statusItem}>
                  {getStatusIcon(item.status)}
                  <span>{item.label}</span>
                </div>
              ))}
          </div>
        </div>
        <div className={styles.preview}>
          <div>
            <div className={styles.previewTitle}>Collection Preview</div>
            <div className={styles.previewImage}>
              {collectionData?.placeholderMetadata?.image ? (
                <Image
                  src={
                    typeof collectionData?.placeholderMetadata?.image === "string"
                      ? collectionData?.placeholderMetadata?.image
                      : collectionData?.placeholderMetadata?.image instanceof File
                        ? URL.createObjectURL(collectionData?.placeholderMetadata?.image)
                        : ""
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
                        ? collectionData?.placeholderMetadata?.image
                        : collectionData?.placeholderMetadata?.image instanceof File
                          ? URL.createObjectURL(collectionData?.placeholderMetadata?.image)
                          : "/images/placeholder.png"
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