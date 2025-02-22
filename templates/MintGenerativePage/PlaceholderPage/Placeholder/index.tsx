import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Placeholder.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useRouter } from "next/router";
import { uploadImageToIPFS } from "@/utils/ipfs";
import { collectionsCreators } from "@/mocks/collections";
import Spinner from "@/components/Spinner";
type PlaceholderProps = {
  cid: any;
};

const Placeholder = ({cid}: PlaceholderProps) => {
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [ canNextStep, setCanNextStep] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if(collectionData.placeholderMetadata?.name && collectionData.placeholderMetadata?.description && collectionData.placeholderMetadata?.image) {
      setCanNextStep(true);
    }
    
  }, [collectionData.placeholderMetadata]);

  const setPlaceholderName = (name: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      placeholderMetadata: {
        ...prevData.placeholderMetadata,
        name: name,
      },
    }));
  };

  const setPlaceholderDescription = (description: string) => { 
    setCollectionData((prevData: any) => ({
      ...prevData,
      placeholderMetadata: {
        ...prevData.placeholderMetadata,
        description: description,
      },
    }));
  }

  const handleNextStep = async () => {
    try {
      setLoading(true);
      const imageCid = await uploadImageToIPFS(collectionData.placeholderMetadata.image);

      setCollectionData((prevData: any) => ({
        ...prevData,
        placeholderMetadata: {
          ...prevData.placeholderMetadata,
          imageCid: imageCid,
        },
      }));
      // Save to localStorage
      saveDataToLocalStorage({
        placeholderMetadata: collectionData.placeholderMetadata
      });
      router.push(`/mint-generative/details?cid=${cid}`);
    } catch (error) {
      console.error("Error uploading image to IPFS:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevStep = async () => {
    router.push(`/mint-generative/distribution?cid=${cid}`);
  };

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Please fill in the following fields to create your placeholder metadata. This metadata will be used for tokens before revealed.
        </span>
      </div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Token Name
            </div>
            <Field
                placeholder="Enter token name"
                value={collectionData.placeholderMetadata?.name}
                onChange={(e:any) => setPlaceholderName(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Token Description
            </div>
            <Field
                placeholder="Enter token description"
                value={collectionData.placeholderMetadata?.description}
                onChange={(e:any) => setPlaceholderDescription(e.target.value)}
                required
                textarea
            />
        </div>
        
        <div className={styles.fileUpload}>
          <label htmlFor="logoImage" className={styles.fileUploadLabel}>
            <div className={styles.label}>Token Image</div>
            <div className={styles.labelInfo}>Choose an image to represent the token. Image will be used as placeholder for tokens before revealed.</div>
          </label>
          <Field
                placeholder="Enter token image"
                value={collectionData.placeholderMetadata?.image}
                onChange={setCollectionData}
                tokenImage={collectionData.placeholderMetadata?.image}
                uploadTokenImage={true}
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

export default Placeholder;
