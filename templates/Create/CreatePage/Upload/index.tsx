import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Upload.module.sass";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { useRouter } from "next/router";
import { useFileContext } from "context/file";
import JSZip from "jszip";
import { uploadFolderToNFTStorage } from "@/utils/ipfs";
import Spinner from "@/components/Spinner";

type UploadProps = {};

const Upload = ({}: UploadProps) => {
  const [zipFile, setZipFile] = useState<any>(null);
  const [isValidZip, setIsValidZip] = useState<boolean>(false);
  const { uploadedFile, setUploadedFile } = useFileContext();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (uploadedFile) {
      setZipFile(uploadedFile);
      setIsValidZip(true);
    }
  }, [uploadedFile]);

  const handleNextStep = async () => {
    if (!zipFile) return;
  
    try {
      setLoading(true);
      // Step 1: Unzip the ZIP file
      const zip = await JSZip.loadAsync(zipFile);
      const formData = new FormData();
  
      for (const fileName of Object.keys(zip.files)) {
        const file = zip.files[fileName];
        if (!file.dir) {
          // Extract file content as Uint8Array and append to FormData
          const fileContent = await file.async("uint8array");
          // Create a Blob and append it to FormData
          const blob = new Blob([fileContent]);
          formData.append("file", new File([blob], `${zipFile.name}/${fileName}`));
        }
      }

      const pinataMetadata = JSON.stringify({
        name: `${zipFile.name}`,
      });
      formData.append("pinataMetadata", pinataMetadata);

      // Step 2: Upload unzipped files to /multiple API
      const cid = await uploadFolderToNFTStorage(formData)
      console.log(cid)
      // Step 3: Generate hash for original ZIP file
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const fileContent: any = e.target?.result;
  
        if (!fileContent) {
          alert("Error reading the ZIP file. Please try again.");
          return;
        }
  
        router.push(`/create?cid=${cid}`);
      };
      fileReader.readAsArrayBuffer(zipFile);
      setLoading(false);
    } catch (error) {
      console.error("Error processing ZIP file:", error);
      setLoading(false);
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
          setUploadedFile={setUploadedFile}
          uploadZipFile={true}
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

export default Upload;
