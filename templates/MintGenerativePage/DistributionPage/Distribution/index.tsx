import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Distribution.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useRouter } from "next/router";
import dayjs from "dayjs";
type DistributionProps = {
  cid: any;
};

const Distribution = ({cid}: DistributionProps) => {
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const router = useRouter();

  const setCollectionSize = (size: string) => { 
    setCollectionData((prevData: any) => ({
      ...prevData,
      size: size,
    }));
  }

  const setCollectionPrice = (price: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      price: price,
    }));
  }

  const setCollectionStartDate = (startDate: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      startDate: startDate,
    }));
  }

  const setCollectionEndDate = (endDate: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      endDate: endDate,
    }));
  }
  const setPrimarySaleAddress = (primarySaleAddress: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      primarySaleAddress: primarySaleAddress,
    }));
  }
  const setRoyalty = (royalty: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      royalty: royalty,
    }));
  }
  const setRoyaltyAddress = (royaltyAddress: string) => {
    setCollectionData((prevData: any) => ({
      ...prevData,
      royaltyAddress: royaltyAddress,
    }));
  }
  const handleNextStep = async () => {
    // Save to localStorage
    saveDataToLocalStorage({
      size: collectionData.size,
      price: collectionData.price,
      startDate: collectionData.startDate,
      endDate: collectionData.endDate,
      primarySaleAddress: collectionData.primarySaleAddress,
      royalty: collectionData.royalty,
      royaltyAddress: collectionData.royaltyAddress,
    });
    router.push(`/mint-generative/placeholder?cid=${cid}`);
  };

  const handlePrevStep = async () => {
    router.push(`/mint-generative/preview?cid=${cid}`);
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
                Editions
                <div className={styles.labelInfo}>How many unique iterations will your artwork generate ?</div>
            </div>
            <input 
              className={cn(styles.input, {[styles.disabled]: true})}
              placeholder="Fixed Amount"
              disabled
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Number of Editions
                <div className={styles.labelInfo}>Note: You can only decrease this number once the project is live.</div>
            </div>
            <Field
                placeholder="Enter number of editions"
                value={collectionData.size}
                onChange={(e:any) => setCollectionSize(e.target.value)}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Pricing Method
                <div className={styles.labelInfo}>You will be able to update the pricing method after publication.</div>
            </div>
            <input 
              className={cn(styles.input, {[styles.disabled]: true})}
              placeholder="Fixed Price"
              disabled
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Price
            </div>
            <Field
                placeholder="Enter price (TIA)"
                value={collectionData.price}
                onChange={(e:any) => setCollectionPrice(e.target.value)}
                required
                rightIcon="TIA"
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <div>Opening Time</div>
                <div className={styles.labelInfo}>In your local timezone.</div>
            </div>
            <Field
                placeholder="Enter opening time"
                value={collectionData.startDate}
                onChange={setCollectionStartDate}
                min={dayjs().format('YYYY-MM-DDTHH:mm')}
                required
                date
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <div>Closing Time</div>
                <div className={styles.labelInfo}>In your local timezone.</div>
            </div>
            <Field
                placeholder="Enter closing time"
                value={collectionData.endDate}
                onChange={setCollectionEndDate}
                min={dayjs().format('YYYY-MM-DDTHH:mm')}
                required
                date
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Primary Sale Address
            </div>
            <Field
                placeholder="Enter primary sale address (e.g. mammoth.id, 0x0000000000000000000000000000000000000000)"
                value={collectionData.primarySaleAddress}
                onChange={(e:any) => setPrimarySaleAddress(e.target.value)}
                required
            />
        </div>
        <div className={styles.royaltyGroup}>
          <div className={styles.royaltyWrapper}>
            <div className={styles.label}>
                Royalty Amount
            </div>
            <Field
                placeholder="Enter royalty amount (%)"
                value={collectionData.royalty}
                onChange={(e:any) => setRoyalty(e.target.value)}
                required
                rightIcon="%"
            />
          </div>
          <div className={styles.royaltyAddressWrapper}>
            <div className={styles.label}>
              Royalty payout address/ Celestials ID
            </div>
            <Field
                placeholder="e.g. codecrafting.id, 0x0000000000000000000000000000000000000000"
                value={collectionData.royaltyAddress}
                onChange={(e:any) => setRoyaltyAddress(e.target.value)}
                required
            />
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

export default Distribution;
