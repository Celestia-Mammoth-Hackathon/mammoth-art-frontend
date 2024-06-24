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
    create?: boolean;
    nftDetail?: boolean;
    wrapperStyle?: React.CSSProperties;
};

const List = ({
    tabs,
    tabsValue,
    setTabsValue,
    children,
    light,
    discover=false,
    nft=false,
    create=false,
    nftDetail=false,
    wrapperStyle,
}: ListProps) => {
    return (
        <div className={cn(styles.list, { [styles.light]: light }, { [styles.discover]: discover }, { [styles.nft]: nft }, { [styles.create]: create })}>
            <Tabs
                items={tabs}
                value={tabsValue}
                setValue={setTabsValue}
                dark={light}
                discover={discover}
                nft={nft}
                create={create}
            />
            <div className={nftDetail ? styles.nftWrapper : styles.wrapper} style={wrapperStyle}>
                {children}
            </div>
        </div>
    );
};

export default List;
