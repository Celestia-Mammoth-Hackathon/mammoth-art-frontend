import type { NextPage } from "next";
import NFTCollectionTokenPage from "@/templates/NFT/NFTCollectionTokenPage";
import { useRouter } from 'next/router'
import { nfts } from "@/constants/nfts";
import Error404Page from "@/templates/Error404Page";
import ComingSoonPage from "@/templates/ComingSoonPage";

const CollectionTokenPage: NextPage = () => {
  const router = useRouter();
  const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;
  const tokenId = Array.isArray(router.query.tokenId) ? router.query.tokenId[0] : router.query.tokenId;
  const tab = Array.isArray(router.query.tab) ? router.query.tab[0] : (router.query.tab || "listings");

  // prevent "404" from flashing
  if (!slug || !tokenId) {
    return <></>
  }

  const collection = nfts.find(nft => nft.slug === slug?.toLowerCase());
  if (!collection) {
    // return <Error404Page />
    return <ComingSoonPage />
  }

  return (
      <>
        <NFTCollectionTokenPage collection={collection} tokenId={tokenId} tab={tab} />;
      </>
  );
};

export default CollectionTokenPage;
