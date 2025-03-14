import { useState } from "react";
import Layout from "@/components/Layout";
import AddCollectionCover from "./AddCollectionCover";
import Collection from "./Collection";

const CollectionPage = () => {
    const [image, setImage] = useState<string>("");

    return (
        <>
            <AddCollectionCover image={image} setImage={setImage} />
            <Collection />
        </>
    );
};

export default CollectionPage;
