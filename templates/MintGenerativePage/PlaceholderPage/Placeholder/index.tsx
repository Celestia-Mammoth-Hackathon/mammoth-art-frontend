import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Placeholder.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useRouter } from "next/router";
import { uploadImageToIPFS } from "@/utils/ipfs";
type PlaceholderProps = {
  cid: any;
};

const Placeholder = ({cid}: PlaceholderProps) => {
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const router = useRouter();

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
            styles.nextBtn
          )}
          onClick={handleNextStep}
        >
          NEXT STEP
          <Icon name={"arrow-right"} fill="#ffffff" />
        </div>
      </div>
      </form>
    </div>
  );
};

export default Placeholder;
