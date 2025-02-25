import React, { useState, useEffect, useCallback } from 'react';
import cn from "classnames";
import styles from "./Field.module.sass";
import Dropdown from '../Dropdown';
import JSZip from "jszip";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { ethers } from 'ethers';


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
  tokenImage?:any;
  setUploadError?: any
  uploadZipFile?: boolean;
  search?: boolean;
  number?: boolean;
  select?: boolean;
  min?: any;
  max?: any;
  isSubmitted?: boolean;
  zipFile?:any;
  setZipFile?:any;
  setIsValidZip?: any;
  setUploadedFile?: any;
  type?: any;
  rightIcon?: string;
  label?: string;
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
  collectionImage, 
  tokenImage,
  number,
  select,
  min,
  max,
  search = false,
  isSubmitted,
  zipFile,
  setZipFile,
  setIsValidZip,
  setUploadedFile,
  type,
  rightIcon,
  label,
}: FieldProps) => {
  let fileName = null;
  let fileType = null;
  let fileSize = null;
  let fileDimension = null;

  const [isValid, setIsValid] = useState(true);
  const [uploadError, setUploadError] = useState<any>(null);

  if (type === "uploadZipFile") {
    fileName = "Zip File";
    fileType = "zip";
    fileSize = "2GB";
  } else if (type === "uploadCollectionImage") {
    fileName = "Collection Image";
    fileType = "gif, jpeg, png, or svg ";
    fileSize = "24MB";
    fileDimension = "400px by 400px";
  } else if (type === "uploadTokenImage") {
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
    if (type === "upload") {
      setIsValid(!!value);
    } else if (type === "number") {
      const numValue = Number(value);
      
      // Check if it's a valid number first
      if (isNaN(numValue)) {
        setIsValid(false);
        return;
      }

      // Check min if it exists
      if (min !== undefined && numValue < Number(min)) {
        setIsValid(false);
        return;
      }

      // Check max if it exists
      if (max !== undefined && numValue > Number(max)) {
        setIsValid(false);
        return;
      }

      // If we get here, the number is valid
      setIsValid(!!value);
    } else if(type === "textarea") {
      setIsValid(!!value.trim());
    } else if (type === "address") {
        setIsValid(ethers.utils.isAddress(value));
    } else {
      setIsValid(!!value);
    }
  };

  useEffect(() => {
    if(isSubmitted || type === "number" || type === "address") {
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
        {type === "textarea" ? (
          <textarea
            className={styles.textarea}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
          ></textarea>
        ) : type === "uploadZipFile" ? (
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
        ) : type === "uploadCollectionImage" ? (
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
        ) : type === "uploadTokenImage" ? (
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
        ) : type === "date" ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className={cn(styles.input, styles.date, inputClassName)}
              value={value ? dayjs(value) : null}
              onChange={(newValue: any) => {
                onChange(newValue ? newValue.format('YYYY-MM-DDTHH:mm') : '');
              }}
              minDate={min ? dayjs(min) : undefined}
              maxDate={max ? dayjs(max) : undefined}
              slotProps={{
                textField: {
                  placeholder,
                  required,
                  fullWidth: true,
                  className: styles.muiInput
                }
              }}
            />
          </LocalizationProvider>
        ) : type === "number" ? (
          <>
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
            {rightIcon ? <span className={styles.rightIcon}>{rightIcon}</span> : <></>}
          </>
          
        ) : select ? (
            <Dropdown
              value={value}
              setValue={onChange}
              options={options}
            />
          ) : type === "address" ? (
            <input 
              className={cn(styles.input, {[styles.search] : search}, inputClassName)}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
              autoFocus={autoFocus}
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
      {label && !isValid && required && <div className={styles.label}>{label}</div>}
    </div>
  );
};

export default Field;
