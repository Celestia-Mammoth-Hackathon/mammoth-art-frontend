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
  const [target, setTarget] = useState<string>("Viewport");  
  const [trigger, setTrigger] = useState<number>(3);
  const [resolution, setResolution] = useState<string[]>(["256", "256"]);
  const { collectionData, setCollectionData, saveDataToLocalStorage } = useCollectionContext();
  const [canNextStep, setCanNextStep] = useState(false);

  useEffect(() => {
    // Force re-render when cid changes
    if (cid) {
      setLoading(true);
      // Add a small delay to ensure the iframe src updates
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
    console.log(cid);
  }, [cid]);

  const handlePrevStep = async () => {
    router.push(`/mint-generative/create?cid=${cid}`);
  };

  const handleNextStep = async () => {
    setCollectionData((prevData: any) => ({
        ...prevData,
        target: target,
        trigger: trigger,
        resolution: resolution
    }));

    saveDataToLocalStorage({
      target: target,
      trigger: trigger,
      resolution: resolution
    }, cid);

    router.push(`/mint-generative/distribution?cid=${cid}`);
  };

  useEffect(() => {
    setCanNextStep(collectionData.target && collectionData.resolution && collectionData.trigger);
  }, [collectionData]);

  const onChangeFirstResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "256";
    setResolution([value, resolution[1]]);
  };

  const onChangeSecondResolution = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "256";
    setResolution([resolution[0], value]);
    console.log(resolution);
  };
  
  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Next, ensure that preview images are being generated correctly. Token preview images are static images used on platforms like OpenSea to represent a token when the full token live view can&apos;t be shown. You can choose both when to capture a preview image and what to capture. Test different token previews by clicking test another token. The image on the right will be used as the preview image.
        </span>
      </div>
      <div className={styles.section}>
        <span className={styles.label}>Trigger</span>
        <br/>
        <span className={styles.sublabel}>When will the capture module trigger?</span>
        <div className={styles.inputs}>
          <Field
            value="Capture preview image after a time delay"
            className={styles.fixedField}
            onChange={() => {}}
          />
          <div className={styles.delayInput}>
            <Field
              type="number"
              value={trigger.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrigger(parseInt(e.target.value) || 0)}
              min="1"
              required
              className={styles.numberInput}
              inputClassName={styles.inputWithSuffix}
              suffix="seconds"
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>Target</span>
        <br/>
        <span className={styles.sublabel}>What will be the target of the capture module ?</span>
        <div className={styles.inputs}>
          <Field
            value="Viewport capture"
            className={styles.fixedField}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.label}>Capture resolution</span>
        <br/>
        <span className={styles.sublabel}>A browser with this resolution will be spawn to take a full screen capture. min: 256; max: 2048</span>
        <div className={styles.inputs}>
          <Field
            placeholder="Enter first resolution"
            value={resolution[0]}
            onChange={(e:any) => onChangeFirstResolution(e)}
            required
          />
          <span>*</span>
          <Field
            placeholder="Enter second resolution"
            value={resolution[1]}
            onChange={(e:any) => onChangeSecondResolution(e)}
            required
          />
        </div>
        {loading ? (
          <Spinner className={styles.spinner}/>
        ) : (
          <iframe
            className={styles.iframe}
            src={`https://ipfs.io/ipfs/${cid}/index.html`}
            width={`${resolution[0]}px || 256px`}
            height={`${resolution[1]}px || 256px`}
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
