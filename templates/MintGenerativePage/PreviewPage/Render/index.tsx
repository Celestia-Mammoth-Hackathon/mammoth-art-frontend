import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Render.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useFileContext } from "context/file";
import JSZip from "jszip";
import { uploadFolderToNFTStorage } from "@/utils/ipfs";
import Spinner from "@/components/Spinner";
import { useCollectionContext } from "context/collection";

type RenderProps = {
  cid: string;
};

const Render = ({cid}: RenderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [canNextStep, setCanNextStep] = useState(false);

  const MIN_RESOLUTION = 256
  const MAX_RESOLUTION = 2048

  useEffect(() => {
    // Force re-render when cid changes
    if (cid) {
      setLoading(true);
      // Add a small delay to ensure the iframe src updates
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [cid]);

  const handlePrevStep = async () => {
    router.push(`/mint-generative/create?cid=${cid}`);
  };

  const handleNextStep = async () => {
    saveDataToLocalStorage({
      target: collectionData.target,
      trigger: collectionData.trigger,
      resolution: collectionData.resolution
    }, cid);

    router.push(`/mint-generative/distribution?cid=${cid}`);
  };

  useEffect(() => {
    setCanNextStep(collectionData.target && collectionData.resolution && collectionData.trigger);
  }, [collectionData]);

  const onChangeFirstResolution = (e: any) => {
    const value = e.target.value;
    setCollectionData((prevData: any) => ({
      ...prevData,
      resolution: [value, prevData.resolution[1]]
    }));
  };

  const onChangeSecondResolution = (e: any) => {
    const value = e.target.value;
    setCollectionData((prevData: any) => ({
      ...prevData,
      resolution: [prevData.resolution[0], value]
    }));
  };
  
  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Next, ensure that preview images are being generated correctly. Token preview images are static images used on platforms like OpenSea to represent a token when the full token live view can&apos;t be shown. You can choose both when to capture a preview image and what to capture. The image will be used as the preview image.
        </span>
      </div>
      <div className={styles.section}>
        <span className={styles.label}>Trigger</span>
        <br/>
        <span className={styles.sublabel}>When will the capture module trigger?</span>
        <div className={styles.inputs}>
          <input 
            className={cn(styles.input, {[styles.disabled]: true})}
            placeholder="Capture preview image after a time delay"
            disabled
          />
          <div className={styles.delayInput}>
            <Field
              type="number"
              value={collectionData.trigger}
              onChange={(e:any) => {
                const value = e.target.value;
                setCollectionData((prevData: any) => ({
                ...prevData,
                trigger: value
              }))}}
              min={1}
              max={100}
              label="Trigger value is not valid"
              required
              className={styles.numberInput}
              inputClassName={styles.inputWithSuffix}
              rightIcon="seconds"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>Target</span>
        <br/>
        <span className={styles.sublabel}>What will be the target of the capture module ?</span>
        <div className={styles.inputs}>
        <input 
            className={cn(styles.input, {[styles.disabled]: true})}
            placeholder="Viewport capture"
            disabled
          />
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>Capture resolution</span>
        <br/>
        <span className={styles.sublabel}>A browser with this resolution will be spawn to take a full screen capture. min: 256; max: 2048</span>
        <div className={styles.inputs}>
          <Field
            type="number"
            placeholder="Enter first resolution"
            value={collectionData.resolution ? collectionData?.resolution[0] : "0"}
            onChange={(e:any) => onChangeFirstResolution(e)}
            required
            label={`Resolution value is not valid (should be greater than or equal to ${MIN_RESOLUTION})`}
            min={MIN_RESOLUTION}
            max={MAX_RESOLUTION}
            rightIcon="W"
          />
          <span>*</span>
          <Field
            type="number"
            placeholder="Enter second resolution"
            value={collectionData.resolution ? collectionData?.resolution[1] : "0"}
            label={`Resolution value is not valid (should be less than or equal to ${MAX_RESOLUTION})`}
            onChange={(e:any) => onChangeSecondResolution(e)}
            required
            min={MIN_RESOLUTION}
            max={MAX_RESOLUTION}
            rightIcon="H"
          />
        </div>
        {loading ? (
          <Spinner className={styles.spinner}/>
        ) : (
          <iframe
            className={styles.iframe}
            src={`https://ipfs.io/ipfs/${cid}/index.html`}
            width={`${collectionData.resolution ? collectionData?.resolution[0] : "256"}px`}
            height={`${collectionData.resolution ? collectionData?.resolution[1] : "256"}px`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            title="Token Preview"
          />
        )}
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
          {
            loading 
              ? <Spinner className={styles.spinner}/> 
              : <div className={styles.next}> 
                  NEXT STEP
                  <Icon name={"arrow-right"} fill="#ffffff" />
                </div>
          }
          
        </div>
      </div>
    </div>
  );
};

export default Render;
