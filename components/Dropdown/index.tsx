import React, { useState } from "react";
import cn from "classnames";
import OutsideClickHandler from "react-outside-click-handler";
import styles from "./Dropdown.module.sass";
import Icon from "@/components/Icon";

type DropdownProps = {
    className?: any;
    value: string;
    setValue: (value: string) => void;
    options: any;
};

const Dropdown = ({ className, value, setValue, options }:DropdownProps ) => {
  const [visible, setVisible] = useState(false);

  const handleClick = (newValue:any) => {
    setValue(newValue)
    setVisible(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
      <div
        className={cn(styles.dropdown, className, { [styles.active]: visible })}
      >
        <div className={styles.head} onClick={() => setVisible(!visible)}>
          <div className={styles.selection}>{value}</div>
          <div className={styles.arrow}>
            <Icon name="arrow-down" size="10" />
          </div>
        </div>
        <div className={styles.body}>
          {options.map((opt:any, index:number) => (
            <div
              className={cn(styles.option, {
                [styles.selectioned]: opt.value === value,
              })}
              onClick={() => handleClick(opt.value)}
              key={index}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;