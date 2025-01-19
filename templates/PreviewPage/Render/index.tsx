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

type RenderProps = {};

const Render = ({}: RenderProps) => {
  const [zipFile, setZipFile] = useState<any>(null);
  const [isValidZip, setIsValidZip] = useState<boolean>(false);
  const { uploadedFile, setUploadedFile } = useFileContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  
  const [trigger, setTrigger] = useState<number>(0);
  const [resolution, setResolution] = useState<number[]>([0,0]);
  const { collectionData, setCollectionData } = useCollectionContext();

  useEffect(() => {
    if (uploadedFile) {
      setZipFile(uploadedFile);
      setIsValidZip(true);
    }
  }, [uploadedFile]);

  const handleNextStep = async () => {
    setCollectionData((prevData: any) => ({
        ...prevData,
        trigger: trigger,
        resolution: resolution
    }));
  };

  const onChange = (e:any) => {
    setTrigger(e.target.value)
    }

  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          The file of your project needs to be uploaded to our servers for
          testing & capture purposes.
        </span>
      </div>
      <div className={styles.upload}>
      <input
            className={styles.buyNowInput}
            required={true}
            onChange={onChange}
            placeholder="0.00"
        />
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={cn(
            "button-medium button-wide",
            styles.button,
            { [styles.disabled]: !isValidZip } 
          )}
          onClick={isValidZip ? handleNextStep : undefined} 
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
