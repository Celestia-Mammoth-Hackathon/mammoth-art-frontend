import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Distribution.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Spinner from "@/components/Spinner";
type DistributionProps = {
  cid: any;
};

const Distribution = ({cid}: DistributionProps) => {
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [ canNextStep, setCanNextStep] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
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
  useEffect(() => {
    if(collectionData.size && collectionData.price && collectionData.startDate && collectionData.endDate && collectionData.primarySaleAddress && collectionData.royalty && collectionData.royaltyAddress) {
      setCanNextStep(true);
    }
  }, [collectionData]);

  const handleNextStep = async () => {
    try {
      setLoading(true);
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
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    } finally {
      setLoading(false);
    }
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
                type="number"
                placeholder="Enter number of editions"
                value={collectionData.size}
                label="Royalty value is not valid"
                min={1}
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
                type="number"
                placeholder="Enter price (TIA)"
                value={collectionData.price}
                onChange={(e:any) => setCollectionPrice(e.target.value)}
                required
                min={0}
                label="Price value is not valid"
                rightIcon="TIA"
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <div>Opening Time</div>
                <div className={styles.labelInfo}>In your local timezone.</div>
            </div>
            <Field
                type="date"
                placeholder="Enter opening time"
                value={collectionData.startDate}
                onChange={setCollectionStartDate}
                min={dayjs().format('YYYY-MM-DDTHH:mm')}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                <div>Closing Time</div>
                <div className={styles.labelInfo}>In your local timezone.</div>
            </div>
            <Field
                type="date"
                placeholder="Enter closing time"
                value={collectionData.endDate}
                onChange={setCollectionEndDate}
                min={dayjs().format('YYYY-MM-DDTHH:mm')}
                required
            />
        </div>
        <div className={styles.formGroup}>
            <div className={styles.label}>
                Primary Sale Address
                <div className={styles.labelInfo}>The address receving primary sale (Celestial IDs support coming soon)</div>
            </div>
            <Field
                type="address"
                placeholder="Enter primary sale address (e.g. mammoth.id, 0x75B128c7AE715Ffe273433DbfF63097FDC10804d)"
                value={collectionData.primarySaleAddress}
                onChange={(e:any) => setPrimarySaleAddress(e.target.value)}
                required
                label="Invalid address (e.g. 0x75B128c7AE715Ffe273433DbfF63097FDC10804d)"
            />
        </div>
        <div className={styles.royaltyGroup}>
          <div className={styles.royaltyWrapper}>
            <div className={styles.label}>
                Royalty Amount
                <div className={styles.labelInfo}>Min:0, Max:20</div>
            </div>
            <Field
                type="number"
                placeholder="Enter royalty amount (%)"
                value={collectionData.royalty}
                onChange={(e:any) => setRoyalty(e.target.value)}
                required
                rightIcon="%"
                label="Royalty value is not valid"
                min={0}
                max={20}
            />
          </div>
          <div className={styles.royaltyAddressWrapper}>
            <div className={styles.label}>
              Royalty payout address
              <div className={styles.labelInfo}>The address receving royalty (Celestials IDs supprt coming soon)</div>
            </div>
            <Field
                type="address"
                placeholder="e.g. codecrafting.id, 0x75B128c7AE715Ffe273433DbfF63097FDC10804d"
                value={collectionData.royaltyAddress}
                onChange={(e:any) => setRoyaltyAddress(e.target.value)}
                required
                label="Invalid address (e.g. 0x75B128c7AE715Ffe273433DbfF63097FDC10804d)"
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

export default Distribution;
