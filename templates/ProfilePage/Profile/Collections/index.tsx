import styles from "./Collections.module.sass";
import Users from "@/components/Users";
import Collection from "../../../../templates/Discover/DiscoverPage/Collections/Collection";
import Actions from "@/components/Actions";
import Spinner from "@/components/Spinner";

import { activityCollections } from "@/mocks/collections";

type CollectionsProps = {
    items: any;
    users: any;
    theme: any;
    setTheme: any;
};

const Collections = ({ items, users, theme, setTheme }: CollectionsProps) => {
    return (
        <>
            {/* <div className={styles.head}>
                <Users title="Collected by" items={users} dark={theme} border />
                <Actions theme={theme} setTheme={setTheme} dark={theme} />
            </div> */}
            <div className={styles.collections}>
                {/* {items.map((token: any, index: number) => (
                    <Collection
                        className={styles.collection}
                        item={token}
                        key={index}
                        dark={theme}
                    />
                ))} */}

                {activityCollections.map((collection, index) => (
                    <Collection
                        className={styles.collection}
                        item={collection}
                        key={index}
                    />
                ))}
            </div>
            <Spinner dark={theme} />
        </>
    );
};

export default Collections;
