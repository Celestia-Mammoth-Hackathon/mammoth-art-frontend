import { useState } from "react";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import Icon from "@/components/Icon";
import Tabs from "@/components/Tabs";
import Filters from "@/components/Filters";
import Sorting from "./Sorting";
import Card from "./Card";
import Form from "@/components/Form";
type TabsType = {
    title: string;
    value: string;
    counter?: string;
};

type CatalogProps = {
    title: string;
    tabsSorting?: TabsType[];
    tabsTime: TabsType[];
    dark?: boolean;
    filters: any;
    items: any;
    scrollToRef?: any;
};

const Catalog = ({
    title,
    tabsSorting,
    tabsTime,
    filters,
    items,
    dark,
    scrollToRef,
}: CatalogProps) => {
    const [sorting, setSorting] = useState<string>("all");
    const [time, setTime] = useState<string>("1-days");
    const [theme, setTheme] = useState<any>(false);
    const [filter, setFilter] = useState<any>(false);
    const [email, setEmail] = useState<string>("");
    return (
        <div className={cn(styles.catalog, { [styles.dark]: dark || theme })}>
            
            <div className={styles.wrapper} ref={scrollToRef}>
                <div className={styles.top}>
                    <div className={cn("h1", styles.title)}>{title}</div>
                    <span className={styles.dot}>.</span>
                    <Tabs
                        className={styles.tabs}
                        items={tabsTime}
                        value={time}
                        setValue={setTime}
                        dark={dark || theme}
                    />
                </div>
                <div className={styles.formWrapper}>
                    <Form
                        className={styles.form}
                        inputClassName={styles.formInput}
                        placeholder="Search by Title or Artists"
                        value={email}
                        setValue={setEmail}
                        onSubmit={() => console.log("Submit")}
                        dark={dark}
                        search={true}
                    />
                </div>
                
                <div className={styles.list}>
                    {items.map((card: any, index: number) => (
                        <Card
                            className={styles.card}
                            item={card}
                            dark={dark || theme}
                            key={index}
                        />
                    ))}
                </div>
                <div className={styles.btns}>
                    <button
                        className={cn(
                            {
                                "button-stroke button-medium": !dark || !theme,
                                "button-stroke-white button-medium":
                                    dark || theme,
                            },
                            styles.button
                        )}
                    >
                        load more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
