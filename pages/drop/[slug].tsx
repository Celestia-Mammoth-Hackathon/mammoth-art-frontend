import type { NextPage } from "next";
import NFTDetailPage from "@/templates/NFT/NFTDetailPage";
import { useRouter } from 'next/router'
import { nfts } from "@/constants/nfts";
import Error404Page from "@/templates/Error404Page";

type MintNFTProps = {
  address?: string;
  balance?: any
};


const NFTDetail: NextPage = ({ address, balance }: MintNFTProps) => {
  const router = useRouter();
  const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;
  const tab = router.query.tab || "mint";

  // prevent "404" from flashing
  if (!slug) {
    return <></>
  }

  const collectionToRedirect = nfts.find(nft => nft.slug === slug?.toLowerCase());
  if (!collectionToRedirect) {
    return <Error404Page />
  }

  const tokenAddress = collectionToRedirect.tokenAddress;
  const tokenId = collectionToRedirect.tokenId;

  return (
      <>
        <NFTDetailPage tokenAddress={tokenAddress} tokenId={tokenId} tab={tab}/>;
      </>
  );
};

export default NFTDetail;
