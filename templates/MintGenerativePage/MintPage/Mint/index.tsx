import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Mint.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";

type MintProps = {};

const Mint = ({}: MintProps) => {
  const { collectionData } = useCollectionContext();
  
  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
        Take a final look to check if the project is properly configured. This preview is generated based on the settings which will be minted.
        </span>
      </div>
      <div className={styles.previewGroup}>
        <div className={styles.form}>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Contract name
              </span>
              {collectionData.contractName ? 
                <span className={styles.value}>
                  {collectionData.contractName}
                </span> : <span className={styles.notUploadedValue}>
                    Add contract name
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Collection name
              </span>
              {collectionData.collectionName ? 
                <span className={styles.value}>
                  {collectionData.collectionName}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection name
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Collection logo image
              </span>
              {collectionData.image ? 
                <span className={styles.value}>
                  {collectionData.image.name}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection logo image
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Description
              </span>
              {collectionData.description ? 
                <span className={styles.value}>
                  {collectionData.description}
                </span> : <span className={styles.notUploadedValue}>
                    Add description
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Collection size
              </span>
              {collectionData.size ? 
                <span className={styles.value}>
                  {collectionData.size}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection size
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Price
              </span>
              {collectionData.price ? 
                <span className={styles.value}>
                  {collectionData.price}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection price
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Mint start date
              </span>
              {collectionData.startDate ? 
                <span className={styles.value}>
                  {collectionData.startDate}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection mint start date
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Mint end date
              </span>
              {collectionData.endDate ? 
                <span className={styles.value}>
                  {collectionData.endDate}
                </span> : <span className={styles.notUploadedValue}>
                    Add collection mint end date
                </span>
              }
          </div>
          <div className={styles.formGroup}>
              <span className={styles.label}>
                  Primary sale address
              </span>
              {collectionData.primarySaleAddress ? 
                <span className={styles.value}>
                  {collectionData.primarySaleAddress}
                </span> : <span className={styles.notUploadedValue}>
                    Add primary sale address
                </span>
              }
          </div>
        </div>
        <div className={styles.preview}>
            <div>
              Preview
            </div>
            <div className={styles.previewImage}>
              {collectionData.image ? <img src={collectionData.image} alt="preview" /> : <></>}
            </div>
            <div className={styles.previewText}>
              <span className={styles.text}>
                {collectionData.name ? collectionData.name : ""}
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
        //   onClick={handlePrevStep}
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
        //   onClick={handleNextStep}
        >
          NEXT STEP
          <Icon name={"arrow-right"} fill="#ffffff" />
        </div>
      </div>
    </div>
  );
};

export default Mint;
