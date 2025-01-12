import { useState } from "react";
import cn from "classnames";
import styles from "./Input.module.sass";
import CheckboxMini from "@/components/CheckboxMini";
import Icon from "@/components/Icon";

type InputProps = {
  traitType: string;
  traitValues: Record<string, number>;
  selectedValues: string[];
  selectAttribute: (traitType: string, traitValue: string, selected: boolean) => void;
};

const Input = ({ traitType, traitValues, selectedValues, selectAttribute }: InputProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className={cn(styles.attributeGroup, { [styles.expanded]: expanded, [styles.active]: selectedValues.length > 0 })}>
      <div
        className={styles.attributeGroupName}
        onClick={() => setExpanded(!expanded)}
      >
        {traitType}
        <div className={styles.arrow}>
            <Icon name="arrow-down-filled" size="24" />
          </div>
      </div>
      <div className={styles.attributeValues}>
        {Object.entries(traitValues).map(([traitValue, count]) => (
          <CheckboxMini
            key={traitValue}
            className={styles.checkbox}
            label={`${traitValue} (${count})`}
            value={selectedValues.includes(traitValue.toLowerCase()) || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectAttribute(traitType, traitValue, e.target.checked)}
          />
        ))}
      </div>
    </div>
  );
};

export default Input;
