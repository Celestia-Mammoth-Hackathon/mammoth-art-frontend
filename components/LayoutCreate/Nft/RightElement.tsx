import React from "react";
import Preview from "../../../templates/Create/CreateStep1Page/Preview";

type RightElementProps = {
    collection: any;
    edition: string;
    royalty: string;
    nftName: string;
    nftDesc: string;
    nftImage: any;
    setIsNftSubmitted: any;
};

const RightElementCollection = ({ 
    collection,
    edition,
    royalty,
    nftName,
    nftDesc,
    nftImage,
    setIsNftSubmitted,
}: RightElementProps) => {
  return (
    <Preview 
        collection={collection}
        edition={edition}
        royalty={royalty}
        name={nftName}
        description={nftDesc}
        bannerImage={nftImage}
        nft={true}
        setIsSubmitted={setIsNftSubmitted}
    />
  );
};

export default RightElementCollection;