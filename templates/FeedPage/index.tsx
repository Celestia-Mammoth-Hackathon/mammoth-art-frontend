import Layout from "@/components/Layout";
import Main from "./Main";
import Stories from "./Stories";
import CollectionCreators from "./CollectionCreators";
import Catalog from "@/components/Catalog";
import Newsletter from "@/components/Newsletter";

import { tabsTime, nfts, statuses } from "@/mocks/nfts";

const FeedPage = () => {
    return (
        <>
            <Main />
            <Stories />
            <CollectionCreators />
            <Catalog
                title="Collect now"
                tabsTime={tabsTime}
                filters={statuses}
                items={nfts}
                dark
            />
            <Newsletter />
        </>
    );
};

export default FeedPage;
