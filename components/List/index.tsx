import cn from "classnames";
import styles from "./List.module.sass";
import Tabs from "./Tabs";

type ListProps = {
    tabs: any;
    tabsValue: any;
    setTabsValue: any;
    children: React.ReactNode;
    light?: boolean;
    discover?: boolean;
    nft?: boolean;
};

const List = ({
    tabs,
    tabsValue,
    setTabsValue,
    children,
    light,
    discover=false,
    nft=false,
    
}: ListProps) => {
    return (
        <div className={cn(styles.list, { [styles.light]: light }, { [styles.discover]: discover })}>
            <Tabs
                items={tabs}
                value={tabsValue}
                setValue={setTabsValue}
                dark={light}
                discover={discover}
                nft={nft}
            />
            <div className={cn(styles.wrapper, { [styles.nft]: nft })}>
                {children}
            </div>
        </div>
    );
};

export default List;
