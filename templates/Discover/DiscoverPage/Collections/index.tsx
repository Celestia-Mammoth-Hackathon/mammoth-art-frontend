import { useState } from "react";
import cn from "classnames";
import styles from "./Collections.module.sass";
import Tabs from "@/components/Tabs";
import Collection from "./Collection";
import Form from "@/components/Form";
import { activityCollections } from "@/mocks/collections";

type CollectionsProps = {
    scrollToRef: any;
};

const Collections = ({ scrollToRef }: CollectionsProps) => {
    const [sorting, setSorting] = useState<string>("1-days");
    const [email, setEmail] = useState<string>("");
    const tabs = [
        {
            title: "All",
            value: "all",
        },
        {
            title: "1 days",
            value: "1-days",
        },
        {
            title: "7 days",
            value: "7-days",
        },
        {
            title: "30 days",
            value: "30-days",
        },
    ];

    return (
        <div className={styles.collections} ref={scrollToRef}>
            <div className={styles.head}>
                <div className={cn("h1", styles.title)}>
                    Discover
                    <span className={styles.dot}>.</span>
                </div>
                <Tabs
                    className={styles.tabs}
                    items={tabs}
                    value={sorting}
                    setValue={setSorting}
                />
            </div>
            <div className={styles.formWrapper}>
                    <Form
                        className={styles.form}
                        inputClassName={styles.formInput}
                        placeholder="Search by Collection Name"
                        value={email}
                        setValue={setEmail}
                        onSubmit={() => console.log("Submit")}
                        search={true}
                    />
                </div>
            <div className={styles.list}>
                {activityCollections.map((collection, index) => (
                    <Collection
                        className={styles.collection}
                        item={collection}
                        key={index}
                    />
                ))}
            </div>
            <div className={styles.btns}>
                    <button
                        className={cn(
                            {
                                "button-stroke button-medium": true,
                            },
                            styles.button
                        )}
                    >
                        load more
                    </button>
                </div>
        </div>
    );
};

export default Collections;
