import React, { useState, useEffect, useCallback } from 'react';
import cn from "classnames";
import styles from "./Field.module.sass";
import Dropdown from '../Dropdown';
import JSZip from "jszip";


type FieldProps = {
  className?: string;
  inputClassName?: string;
  textarea?: boolean;
  upload?: boolean;
  value: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  children?: any;
  icon?: string;
  autoFocus?: any;
  light?: boolean;
  large?: boolean;
  options?: any;
  setImage?: any;
  collectionImage?:any;
  uploadCollectionImage?: boolean;
  tokenImage?:any;
  uploadTokenImage?: boolean;
  setUploadError?: any
  uploadZipFile?: boolean;
  search?: boolean;
  number?: boolean;
  select?: boolean;
  min?: string;
  max?: string;
  isSubmitted?: boolean;
  zipFile?:any;
  setZipFile?:any;
  setIsValidZip?: any;
  setUploadedFile?: any;
  type?: any;
};

const Field = ({
  className,
  inputClassName,
  textarea,
  value,
  onChange,
  placeholder,
  required,
  icon,
  autoFocus,
  light,
  large,
  upload,
  options,
  setImage,
  uploadZipFile,
  collectionImage,
  uploadCollectionImage,  
  tokenImage,
  uploadTokenImage,
  number,
  select,
  min,
  max,
  search = false,
  isSubmitted,
  zipFile,
  setZipFile,
  setIsValidZip,
  setUploadedFile
}: FieldProps) => {
  let fileName = null;
  let fileType = null;
  let fileSize = null;
  let fileDimension = null;

  const [isValid, setIsValid] = useState(true);
  const [uploadError, setUploadError] = useState<any>(null);
  
  if (uploadZipFile) {
    fileName = "Zip File";
    fileType = "zip";
    fileSize = "2GB";
  } else if (uploadCollectionImage) {
    fileName = "Collection Image";
    fileType = "gif, jpeg, png, or svg ";
    fileSize = "24MB";
    fileDimension = "400px by 400px";
  } else if (uploadTokenImage) {
    fileName = "Token Image";
    fileType = "gif, jpeg, png, or svg ";
    fileSize = "24MB";
    fileDimension = "400px by 400px";
  }
  
  const handleZipFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/x-zip-compressed") {
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        try {
          const zip = await JSZip.loadAsync(event.target?.result as ArrayBuffer);
          // Check for the presence of required files
          const requiredFiles = ["index.html", "lib/hl-gen.js"];
          const optionalFiles = ["index.js", "sketch.js"];
          const folder = zip.folder(selectedFile?.name);

          let missingFiles: any = [];
          if (folder?.files) {
            // Check required files
            missingFiles = requiredFiles.filter((file) => {
              const foundFile = Object.keys(folder.files).some((fileName) =>
                fileName.includes(file)
              );
              return !foundFile;
            });

            // Check optional files (at least one must be present)
            const hasOptionalFile = optionalFiles.some((file) =>
              Object.keys(folder.files).some((fileName) => fileName.includes(file))
            );

            if (!hasOptionalFile) {
              missingFiles.push("Either index.js or sketch.js");
            }
          }

          if (missingFiles.length === 0) {
            console.log("Valid ZIP file containing required files");
            setZipFile(selectedFile);
            setIsValid(true);
            setIsValidZip(true);
            setUploadedFile(selectedFile);
          } else {
            setUploadError(
              `Invalid ZIP file. Missing required files: ${missingFiles.join(",")}`
            );
            setZipFile(null);
            setIsValid(false);
            setIsValidZip(false);
          }
        } catch (err) {
          setUploadError("No files found in the folder.");
          setZipFile(null);
          setIsValid(false);
          setIsValidZip(false);
        }
      };
  
      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.error("Invalid file type. Please upload a ZIP file.");
      setZipFile(null);
      setIsValid(false);
      setIsValidZip(false);
    }
  };

  const handleCollectionImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    onChange((prevData: any) => ({
      ...prevData,
      collectionImage: selectedFile,
    }));
  }

  const handleTokenImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    onChange((prevData: any) => ({
      ...prevData,
      placeholderMetadata: {
        ...prevData.placeholderMetadata,
        image: selectedFile,
      },
    }));
  } 

  const handleDrop = useCallback((event:any) => {
    event.preventDefault();

    // Access the dropped files
    const droppedFiles = event.dataTransfer.files;
    const selectedFile = droppedFiles[0];
    if (selectedFile) {
      const reader = new FileReader();
  
      reader.onload = () => {
        // Set the data URL as the image source using setImage prop
        setImage(reader.result);
      };
  
      reader.readAsDataURL(selectedFile);
    }

    setIsValid(droppedFiles.length > 0);
  }, []);
  
  const validateField = () => {
    if (upload) {
      setIsValid(!!value);
    } else if (number) {
      if (min !== undefined && max !== undefined) {
        if (value <= min || value >= max) {
          setIsValid(false);
          return;
        }
      }
      // Add validation logic for number field if needed
      setIsValid(!!value);
    } else if(textarea) {
      // For other fields, consider them valid if the trimmed value is not empty
      setIsValid(!!value.trim());
    } else {
      setIsValid(!!value);
    }
  };

  useEffect(() => {
    if(isSubmitted) {
      validateField();
    }
  }, [value, upload, number, isSubmitted, zipFile, collectionImage]);

  const preventDefaultHandler = (event:any) => {
    event.preventDefault();
  };
  return (
    <div
      className={cn(
        styles.field,
        { [styles.fieldIcon]: icon },
        { [styles.fieldTextarea]: textarea },
        { [styles.fieldLight]: light },
        { [styles.fieldLarge]: large },
        { [styles.fieldInvalid]: required && !isValid },
        className
      )}
    >
      <div className={styles.wrap}>
        {textarea ? (
          <textarea
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
          ></textarea>
        ) : uploadZipFile ? (
          <div className={styles.upload}
            onDrop={handleDrop}
            onDragOver={preventDefaultHandler}
            onDragEnter={preventDefaultHandler}
          >
            
                <label className={styles.customFileUpload}>
                    <input
                    className={styles.file}
                    type="file"
                    accept=".zip"
                    onChange={handleZipFile}
                    required
                    />
                    UPLOAD
                </label>
            
                <div className={styles.details}>
                  {zipFile && isValid ? (
                    <div className={styles.success}>
                      Uploaded File: {zipFile.name} 
                    </div>
                  ) : uploadError ? (
                    <div className={styles.error}>
                      {uploadError}
                    </div>
                  ) : (
                    <div className={styles.details}>
                      <div className={styles.detail}>Drag and Drop {fileName}</div>
                      <div className={styles.type}>Types supported: {fileType}</div>
                      <div className={styles.type}>Max file size is {fileSize}</div>
                      <div className={styles.type}>{fileDimension ? `Recommended size: ${fileDimension}` : ""}</div>
                    </div>
                  )}
                </div>
          </div>
        ) : uploadCollectionImage ? (
          <div className={styles.upload}
            onDrop={handleDrop}
            onDragOver={preventDefaultHandler}
            onDragEnter={preventDefaultHandler}
          >
            
                <label className={styles.customFileUpload}>
                    <input
                    className={styles.file}
                    type="file"
                    accept=".gif, .jpeg, .png, .svg"
                    onChange={handleCollectionImage}
                    required
                    />
                    UPLOAD
                </label>
            
                <div className={styles.details}>
                  {(collectionImage && isValid) ? (
                    <div className={styles.success}>
                      Uploaded File: {collectionImage?.name} 
                    </div>
                  ) : uploadError ? (
                    <div className={styles.error}>
                      {uploadError}
                    </div>
                  ) : (
                    <div className={styles.details}>
                      <div className={styles.detail}>Drag and Drop {fileName}</div>
                      <div className={styles.type}>Types supported: {fileType}</div>
                      <div className={styles.type}>Max file size is {fileSize}</div>
                      <div className={styles.type}>{fileDimension ? `Recommended size: ${fileDimension}` : ""}</div>
                    </div>
                  )}
                </div>
          </div>
        ) : uploadTokenImage ? (
          <div className={styles.upload}
            onDrop={handleDrop}
            onDragOver={preventDefaultHandler}
            onDragEnter={preventDefaultHandler}
          >
            
                <label className={styles.customFileUpload}>
                    <input
                    className={styles.file}
                    type="file"
                    accept=".gif, .jpeg, .png, .svg"
                    onChange={handleTokenImage}
                    required
                    />
                    UPLOAD
                </label>
            
                <div className={styles.details}>
                  {(tokenImage && isValid) ? (
                    <div className={styles.success}>
                      Uploaded File: {tokenImage?.name} 
                    </div>
                  ) : uploadError ? (
                    <div className={styles.error}>
                      {uploadError}
                    </div>
                  ) : (
                    <div className={styles.details}>
                      <div className={styles.detail}>Drag and Drop {fileName}</div>
                      <div className={styles.type}>Types supported: {fileType}</div>
                      <div className={styles.type}>Max file size is {fileSize}</div>
                      <div className={styles.type}>{fileDimension ? `Recommended size: ${fileDimension}` : ""}</div>
                    </div>
                  )}
                </div>
          </div>
        ) : number ? (
          <input 
            className={cn(styles.input, styles.number, {[styles.search] : search}, inputClassName)}
            value={value}
            type="number"
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
            min={min}
            max={max}
          />
        ) : select ? (
            <Dropdown
              value={value}
              setValue={onChange}
              options={options}
            />
          ) : (
          <input 
            className={cn(styles.input, {[styles.search] : search}, inputClassName)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
          />
        )}
      </div>
      {/* {label && !isValid && required && <div className={styles.label}>{label}</div>} */}
    </div>
  );
};

export default Field;
