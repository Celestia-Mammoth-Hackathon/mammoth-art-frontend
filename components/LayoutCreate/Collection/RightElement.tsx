import React from "react";
import Preview from "../../../templates/Create/CreateStep1Page/Preview";

type RightElementProps = {
    name: string;
    description: string;
    bannerImage: any;
    collectionImage: any;
};

const RightElementCollection = ({ name, description, collectionImage, bannerImage }: RightElementProps) => {
  return (
    <Preview
      name={name}
      description={description}
      collectionImage={collectionImage}
      bannerImage={bannerImage}
    />
  );
};

export default RightElementCollection;