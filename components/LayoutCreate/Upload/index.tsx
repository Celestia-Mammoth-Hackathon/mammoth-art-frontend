import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Upload.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import sha256 from "crypto-js";

type UploadProps = {};

const Upload = ({}: UploadProps) => {
  const [zipFile, setZipFile] = useState<any>(null);
  const [isValidZip, setIsValidZip] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the selected file is a valid ZIP file
    console.log(isValidZip)
    if (zipFile && isValidZip) {
      setIsValidZip(true);
    } else {
      setIsValidZip(false);
    }
  }, [isValidZip, zipFile]);

  const handleNextStep = async () => {
    if (!zipFile) return;

    try {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent = e.target?.result;

        if (!fileContent) {
          alert("Error reading the file. Please try again.");
          return;
        }

        const hash = sha256(fileContent).toString();
        router.push(`/create/upload?fxhash=${hash}`);
      };
      fileReader.readAsArrayBuffer(zipFile);
    } catch (error) {
      console.error("Error generating hash:", error);
      alert("Failed to process the ZIP file. Please try again.");
    }
  };

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
          className={styles.field}
          value={zipFile}
          onChange={(e: any) => {
            setZipFile(e.target.files[0]);
          }}
          large
          upload
          required
          zipFile={zipFile}
          setZipFile={setZipFile}
          setIsValidZip={setIsValidZip}
          uploadZipFile={true}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={cn(
            "button-medium button-wide",
            styles.button,
            styles.listButton,
            { [styles.disabled]: !isValidZip } 
          )}
          onClick={isValidZip ? handleNextStep : undefined} 
        >
          NEXT STEP
          <Icon name={"arrow-right"} fill="#ffffff" />
        </div>
      </div>
    </div>
  );
};

export default Upload;
