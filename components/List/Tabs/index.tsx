import cn from "classnames";
import styles from "./Tabs.module.sass";

type TabType = {
    title: string;
    value: string;
    counter?: string;
    onClick?: () => void;
};

type TabsProps = {
    className?: string;
    items: TabType[];
    value: number | string;
    setValue: any;
    dark?: boolean;
    discover?: boolean;
    nft?: boolean;
    create?: boolean;
};

const Tabs = ({ className, items, value, setValue, dark, discover = false, nft = false, create = false }: TabsProps) => {
    const handleClick = (value: string, onClick: any) => {
        setValue(value);
        onClick && onClick();
    };

    return (
        <div className={cn(styles.box, { [styles.dark]: dark }, { [styles.discover]: discover }, { [styles.nft]: nft }, { [styles.create]: create }, className)}>
            <div className={styles.tab}>
                {items.map((item, index) => (
                    <button
                        className={cn(styles.button, {
                            [styles.active]: value === item.value,
                        })}
                        onClick={() => handleClick(item.value, item.onClick)}
                        key={index}
                    >
                        <span className={styles.title}>{item.title}</span>
                        <div className={styles.counter}>
                            {item.counter}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
