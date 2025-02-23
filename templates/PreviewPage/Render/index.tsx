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

  const [target, setTarget] = useState<string>("Viewport");  
  const [trigger, setTrigger] = useState<number>(0);
  const [resolution, setResolution] = useState<number[]>([0,0]);
  const { collectionData, setCollectionData } = useCollectionContext();


  const handleNextStep = async () => {
    setCollectionData((prevData: any) => ({
        ...prevData,
        target: target,
        trigger: trigger,
        resolution: resolution
    }));
  };

  const onChangeFirstResolution = (e:any) => {
    setResolution([e.target.value, resolution[1]])
  }

  const onChangeSecondResolution = (e:any) => {
    setResolution([resolution[0], e.target.value])
  }

  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          The .zip file of your project needs to be uploaded to our servers for
          testing & capture purposes.
        </span>
      </div>
      <div className={styles.upload}>
      <Field
        placeholder="Enter first resolution"
        value={collectionData.collectionName}
        onChange={(e:any) => onChangeFirstResolution(e.target.value)}
        required
      />
      <Field
        placeholder="Enter second resolution"
        value={collectionData.collectionName}
        onChange={(e:any) => onChangeSecondResolution(e.target.value)}
        required
      />
        <iframe
            src={`https://ipfs.io/ipfs/${cid}/index.html`}
            width={`${resolution[0]}px`}
            height={`${resolution[1]}px`}
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            title="Token Preview"
          ></iframe>
      </div>
      <div className={styles.buttonWrapper}>
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
