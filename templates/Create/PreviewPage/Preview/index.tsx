import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Preview.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useFileContext } from "context/file";
import sha256 from "crypto-js/sha256";
import JSZip from "jszip";

type PreviewProps = {
  cid: any;
};

const Preview = ({ cid }: PreviewProps) => {
  const [randomKey, setRandomKey] = useState<number>(Date.now()); // Unique key to force iframe reload
  const router = useRouter();

  const handleRandomizeAll = () => {
    // Update the key to force iframe reload
    setRandomKey(Date.now());
  };

  const handleNextStep = async () => {
    router.push(`/preview`);
  };

  const handlePrevStep = async () => {
    router.push(`/create`);
  };

  return (
    <div className={styles.uploadWrapper}>
      <div className={styles.info}>
        <Icon name={"info"} fill="#ffffff" />
        <span className={styles.infoText}>
          Now, double-check your Generative Token to see if it behaves properly.
          On the next step, you will configure how previews will be generated
          each time your token is collected.
          <br />
          <b>
            Use this step to find a hash you want to use for the thumbnail of
            the project on the platform.
          </b>
        </span>
      </div>
      <div className={styles.preview}>
        <div className={styles.tokenPreview}>
          <div className={styles.previewText}>
            <span className={styles.text}>Token Preview</span>
            <button className={styles.randomAll} onClick={handleRandomizeAll}>
              <Icon name={"shuffle"} fill="#ffffff" />
              <span>Randomize All</span>
            </button>
          </div>
          <iframe
            src={`https://ipfs.io/ipfs/${cid}/index.html?random=${randomKey}`} 
            width="664"
            height="662"
            style={{
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
            title="Token Preview"
          ></iframe>
        </div>
        <div className={styles.inputs}>
          <div className={styles.randomAll}>
            <Icon name={"shuffle"} fill="#ffffff" />
            <span>Randomize All</span>
          </div>
          <div>
            <div>
              <span>Collection Inputs</span>
              <span>Randomize</span>
              <div className={styles.attributes}>
                {/* Placeholder for dynamic attributes */}
              </div>
            </div>
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
    </div>
  );
};

export default Preview;
