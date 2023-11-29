import React, { useCallback } from 'react';
import cn from "classnames";
import styles from "./Field.module.sass";
import Icon from "@/components/Icon";

type FieldProps = {
  className?: string;
  inputClassName?: string;
  textarea?: boolean;
  upload?: boolean;
  type?: string;
  value: string;
  onChange: any;
  placeholder?: string;
  required?: boolean;
  children?: any;
  icon?: string;
  autoFocus?: any;
  light?: boolean;
  large?: boolean;
  label?: string;
  setImage?: any;
  collectionImage?:boolean;
  bannerImage?:boolean;
  nftImage?:boolean;
  search?: boolean;
  number?: boolean;
  select?: boolean;
  min?: string;
  max?: string;
};

const Field = ({
  className,
  inputClassName,
  textarea,
  type,
  value,
  onChange,
  placeholder,
  required,
  icon,
  autoFocus,
  light,
  large,
  label,
  upload,
  setImage,
  bannerImage,
  collectionImage,
  nftImage,
  number,
  select,
  min,
  max,
  search = false
}: FieldProps) => {
  let fileName = null;
  let fileType = null;
  let fileSize = null;
  let fileDimension = null;

  if (bannerImage) {
    fileName = "Banner Image";
    fileType = "gif, jpeg, png, or svg ";
    fileSize = "24MB";
    fileDimension = "1600px by 400px";
  } else if (collectionImage) {
    fileName = "Collection Image";
    fileType = "gif, jpeg, png, or svg ";
    fileSize = "24MB";
    fileDimension = "400px by 400px";
  } else if (nftImage) {
    fileName = "to Upload NFT File";
    fileType = "gif, jpeg, png, svg, mp4, webm, glb, mp3, wav, flac, pdf, zip (interactive)";
    fileSize = "100MB";
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = () => {
          // Set the data URL as the image source using setImage prop
          setImage(reader.result);
        };
    
        reader.readAsDataURL(selectedFile);
      }
  };

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
  }, []);

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
        ) : upload ? (
          <div className={styles.upload}
            onDrop={handleDrop}
            onDragOver={preventDefaultHandler}
            onDragEnter={preventDefaultHandler}
          >
            
                <label className={styles.customFileUpload}>
                    <input
                    className={styles.file}
                    type="file"
                    onChange={handleFileChange}
                    />
                    UPLOAD
                </label>
            
            <div className={styles.details}>
              <div className={styles.detail}>Drag and Drop {fileName}</div>
              <div className={styles.type}>Types supported: {fileType}</div>
              <div className={styles.type}>Max file size is {fileSize}</div>
              <div className={styles.type}>{fileDimension ? `Recommended size: ${fileDimension}` : ""}</div>
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
            <select
              className={cn(styles.input, styles.select, inputClassName)}
              value={value}
              onChange={onChange}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
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
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};

export default Field;
