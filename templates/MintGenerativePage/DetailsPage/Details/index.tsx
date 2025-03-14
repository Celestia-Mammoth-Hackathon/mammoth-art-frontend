import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Details.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useRouter } from "next/router";
import { uploadImageToIPFS } from "@/utils/ipfs";
import Spinner from "@/components/Spinner";

type DetailsProps = {
  cid: any;
};

const Details = ({cid}: DetailsProps) => {
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [canNextStep, setCanNextStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const setCollectionName = (name: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      collectionName: name,
    }));
  };

  const setDescription = (description: string) => { 
    setCollectionData((prevData: any) => ({
      ...prevData,
      collectionDescription: description,
    }));
  }

  const setContractName = (contractName: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      contractName: contractName,
    }));
  }

  const setContractSymbol = (contractSymbol: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      contractSymbol: contractSymbol,
    }));
  }

  useEffect(() => {
    setCanNextStep(collectionData.collectionName && collectionData.collectionDescription && collectionData.contractName && collectionData.contractSymbol && collectionData.collectionImage);
  }, [collectionData]);

  const handleNextStep = async () => {
    try {
      setLoading(true);
      const collectionImageCid = await uploadImageToIPFS(collectionData.collectionImage);

      setCollectionData((prevData: any) => ({
        ...prevData,
        collectionImageCid: collectionImageCid,
      }));

      const savedData:any = localStorage.getItem(cid);
      const parsedData = JSON.parse(savedData);

      // Save to localStorage
      saveDataToLocalStorage({
        collectionName: collectionData.collectionName,
        collectionDescription: collectionData.collectionDescription,
        collectionImage: collectionData.collectionImage,
        contractName: collectionData.contractName,
        contractSymbol: collectionData.contractSymbol,
        collectionImageCid: collectionImageCid,
      }, cid);
      router.push(`/mint-generative/deploy?cid=${cid}`);
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevStep = async () => {
    router.push(`/mint-generative/placeholder?cid=${cid}`);
  };

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          You will be able to edit these settings after the publication, except if stated otherwise on the corresponding fields.
        </span>
      </div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Collection Name
            </div>
            <Field
                placeholder="Enter collection name"
                value={collectionData.collectionName}
                onChange={(e:any) => setCollectionName(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Collection Description
            </div>
            <Field
                type="textarea"
                placeholder="Enter description"
                value={collectionData.collectionDescription}
                onChange={(e:any) => setDescription(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <div>Contract Name</div>
                <div className={styles.labelInfo}>You own and control all contracts created on MammothBros. The name of this contract will be publicly visible on Forma blockchain explorer.</div>
            </div>
            <Field
                placeholder="Enter contract name"
                value={collectionData.contractName}
                onChange={(e:any) => setContractName(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <span>Contract Symbol</span>
            </div>
            <Field
                placeholder="Enter contract symbol"
                value={collectionData.contractSymbol}
                onChange={(e:any) => setContractSymbol(e.target.value)}
                required
            />
        </div>
        
        <div className={styles.fileUpload}>
          <label htmlFor="logoImage" className={styles.fileUploadLabel}>
            <div className={styles.label}>Collection Logo Image</div>
            <div className={styles.labelInfo}>Choose an image to represent this series. This may or may not be the same as one of your token images and will appear on third-party platforms like OpenSea.</div>
          </label>
          <Field
                type="uploadCollectionImage"
                placeholder="Enter collection image"
                value={collectionData.collectionImage}
                onChange={setCollectionData}
                collectionImage={collectionData.collectionImage}
                required
                upload
            />
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
            styles.nextBtn,
            { [styles.nextDisabled]: !canNextStep }
          )}
          onClick={handleNextStep}
        >
          { loading ? <Spinner className={styles.spinner}/> : 
            <>
              NEXT STEP
              <Icon name={"arrow-right"} fill="#ffffff" />
            </>
          }
        </div>
      </div>
      </form>
    </div>
  );
};

export default Details;
