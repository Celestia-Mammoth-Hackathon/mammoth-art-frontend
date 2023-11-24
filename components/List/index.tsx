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
};

const List = ({
    tabs,
    tabsValue,
    setTabsValue,
    children,
    light,
    discover=false
}: ListProps) => {
    return (
        <div className={cn(styles.list, { [styles.light]: light }, { [styles.discover]: discover })}>
            <Tabs
                items={tabs}
                value={tabsValue}
                setValue={setTabsValue}
                dark={light}
                discover={discover}
            />
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};

export default List;
