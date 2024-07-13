import type { NextPage } from "next";
import { useRouter } from 'next/router'
import { nfts } from "@/constants/nfts";
import Error404Page from "@/templates/Error404Page";
import NFTCollectionPage from "@/templates/NFT/NFTCollectionPage";

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;

  let attributeQuery = router.query.attribute || "";
  if (!Array.isArray(attributeQuery)) {
    attributeQuery = [ attributeQuery ];
  }

  const attributes: Record<string, string> = attributeQuery.reduce((acc, query) => {
    const [key, value] = query.split("=");
    if (key && value) {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);

  // prevent "404" from flashing
  if (!slug) {
    return <></>
  }

  const collection = nfts.find(nft => nft.showCollection === true && nft.slug === slug?.toLowerCase());
  if (!collection) {
    return <Error404Page />
  }

  return <NFTCollectionPage collection={collection} attributes={attributes} />;
};

export default CollectionPage;
