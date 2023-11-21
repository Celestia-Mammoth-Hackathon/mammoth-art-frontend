import React from "react";
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
}: FieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile)
    if (selectedFile) {
        const reader = new FileReader();
    
        reader.onload = () => {
          // Set the data URL as the image source using setImage prop
          setImage(reader.result);
        };
    
        reader.readAsDataURL(selectedFile);
      }
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
          <div className={styles.upload}>
            
                <label className={styles.customFileUpload}>
                    <input
                    className={styles.file}
                    type="file"
                    onChange={handleFileChange}
                    />
                    UPLOAD
                </label>
            
            <div className={styles.details}>
              <div className={styles.detail}>Drag and Drop to Collection Image</div>
              <div className={styles.type}>Types supported: gif, jpeg, png, or svg</div>
              <div className={styles.type}>Max file size is 100MB</div>
            </div>
          </div>
        ) : (
          <input
            className={cn(styles.input, inputClassName)}
            type={type || "text"}
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
