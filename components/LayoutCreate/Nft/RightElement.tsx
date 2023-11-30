import React from "react";
import Preview from "../../../templates/Create/CreateStep1Page/Preview";

type RightElementProps = {
    collection: any;
    edition: string;
    royalty: string;
    nftName: string;
    nftDesc: string;
    nftImage: any;
};

const RightElementCollection = ({ 
    collection,
    edition,
    royalty,
    nftName,
    nftDesc,
    nftImage ,
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
    />
  );
};

export default RightElementCollection;