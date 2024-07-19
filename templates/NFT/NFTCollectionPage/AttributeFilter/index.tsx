import { useState } from "react";
import cn from "classnames";
import styles from "./AttributeFilter.module.sass";
import CheckboxMini from "@/components/CheckboxMini";
import Icon from "@/components/Icon";

type AttributeFilterProps = {
  traitType: string;
  traitValues: Record<string, number>;
  selectedValues: string[];
  selectAttribute: (traitType: string, traitValue: string, selected: boolean) => void;
};

const AttributeFilter = ({ traitType, traitValues, selectedValues, selectAttribute }: AttributeFilterProps) => {
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


    // return (
    //     <div className={cn(styles.item, { [styles.active]: visible })}>
    //         <div
    //             className={cn("h4", styles.head)}
    //             onClick={() => setVisible(!visible)}
    //         >
    //             {item.title}
    //             <div className={styles.plus}></div>
    //         </div>
    //         <div className={styles.body}>
    //             {item.links.map((link: any, index: number) => (
    //                 <Link href={link.url} key={index}>
    //                     <a className={styles.link}>
    //                         <Icon name="arrow-right" />
    //                         <div className={styles.circle}></div>
    //                         {link.title}
    //                     </a>
    //                 </Link>
    //             ))}
    //         </div>
    //     </div>
    // );
};

export default AttributeFilter;
