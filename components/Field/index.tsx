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
  collectionImage
}: FieldProps) => {
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
              <div className={styles.detail}>Drag and Drop to {bannerImage? "Banner" : "Collection"} Image</div>
              <div className={styles.type}>Types supported: gif, jpeg, png, or svg</div>
              <div className={styles.type}>Max file size is 100MB</div>
            </div>
          </div>
        ) : (
          <textarea
            className={cn(styles.input, inputClassName)}
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
