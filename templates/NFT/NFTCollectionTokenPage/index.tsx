import { useState, useEffect, useMemo } from "react";
import styles from "./NFTCollectionTokenPage.module.sass";
import Description from "@/components/Description";
import Caption from "@/components/Description/Caption";
import Link from "next/link";
import { chainExplorerURL } from "../../../constants/details";
import { handleIpfsLink, convertToPercentage } from "@/utils/index";
import { artistAddresses } from "@/constants/details";
import indexer from "@/utils/indexer";
import { useUserContext } from "context/user";
import Tabs from "./Details/Tabs";
import Icon from "@/components/Icon";
import useCollectionStore from '@/store/index';

type NFTCollectionTokenPageProps = {
  collection: any;
  tokenId: string;
  tab: string;
};

const NFTCollectionTokenPage = ({ collection, tokenId, tab }: NFTCollectionTokenPageProps) => {
  const { address } = useUserContext();

  const {
    users,
    fetchOwnNfts
} = useCollectionStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [tokenLoading, setTokenLoading] = useState<boolean>(false);
  const [token, setToken] = useState<any>(undefined);
  const [ownedSupply, setOwnedSupply] = useState<number>(0);
  const [userToken, setUserToken] = useState<any>(null);
  const [userTokenLoading, setUserTokenLoading] = useState(false);
  const [listings, setListings] = useState({
    all: [],
    mine: [],
    cheapest: {},
    loading: true,
  });

  const [ownedTrigger, setOwnedTrigger] = useState(false);
  const [fetchListingTrigger, setFetchListingTrigger] = useState(false);
  
  useEffect(() => {
    if (!userTokenLoading && !tokenLoading && !listings.loading) {
      setUserToken(users[address]?.collections[collection.collectionId])
      setLoading(false);
    }
  }, [userTokenLoading, tokenLoading, listings.loading]);

  useEffect(() => {
    const fetchOwned = async () => {
      if (address) {
        const owned = await indexer.getUserTokenBalance({ userAddress: address, tokenAddress: collection.tokenAddress, tokenId });
        setOwnedSupply(Number(owned));
      } else {
        setOwnedSupply(0);
      }
    };
    fetchOwned();
  }, [address, collection, tokenId, ownedTrigger]);
  
  useEffect(() => {
    const fetchSupply = async () => {
        if(address) {
            try {
                await fetchOwnNfts(collection.tokenAddress, tokenId, address);
            } catch(error) {
                console.log(error);
            }
        }
    };
    fetchSupply();
  }, [address, collection, tokenId, ownedTrigger]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        setTokenLoading(true);
        const token = await indexer.getCollectionToken({ tokenAddress: collection.tokenAddress, tokenId });
        token.metadata = collection.tokens.find((t: any) => t.id === tokenId);
        setToken(token);
      } finally {
        setTokenLoading(false);
      }
    };
    fetchToken();
  }, [collection, tokenId]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        let myListing: any = [];
        let filteredAllListing: any = [];
        let cheapeastListedNft = {};

        if (token) {
          const allListings = await indexer.getAllOrders({
            tokenAddress: token.tokenAddress,
            tokenId: token.tokenId,
          });

          if (allListings) {
            // Sort the listings from cheapest to most expensive
            allListings.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
            myListing = allListings.filter((listing: any) => listing.makerId.toLowerCase() === address.toLowerCase());
            filteredAllListing = allListings.filter((listing: any) => listing.makerId.toLowerCase() !== address.toLowerCase());
            cheapeastListedNft = filteredAllListing.length > 0 ? filteredAllListing[0] : {};
          }
        }

        setListings({
          all: filteredAllListing,
          mine: myListing,
          cheapest: cheapeastListedNft,
          loading: false,
        });
      } catch (error) {
        console.log("Error fetching listings:", error);
        setListings({
          all: [],
          mine: [],
          cheapest: {},
          loading: false,
        });
      }
    };
    fetchListings();
  }, [address, token, fetchListingTrigger]);

  const availableSupply = useMemo(() => {
    const listingSupply = listings.mine.length ? listings.mine.reduce((sum, listing:any) => sum + (parseInt(listing.qty) - parseInt(listing.filled ?? 0)), 0) : 0;
    return ownedSupply - listingSupply;
  }, [listings, ownedSupply])

  const description = useMemo(
    () => token?.metadata.description || "",
    [ token ]
  );

  const links = useMemo(() => [
    {
      title: "View on Explorer",
      icon: "country",
      url: `${chainExplorerURL}/token/${collection.tokenAddress}/instance/${tokenId}`,
    },
    {
      title: "View Metadata",
      icon: "link",
      url: `${chainExplorerURL}/token/${collection.tokenAddress}/instance/${tokenId}?tab=metadata`,
    },
    {
      title: "View on IPFS",
      icon: "link",
      url: token && handleIpfsLink(token.metadata.animation_url || token.metadata.image, false),
    },
  ], [collection, tokenId, token]);

  const artistInfo = useMemo(() =>
    artistAddresses.find((el) => el.artistAddress === collection.contractCreator), [collection]);

  const statistics = useMemo(() => [
    {
      title: artistInfo?.name,
      login: artistInfo?.slug,
    },
  ], [artistInfo]);

  const date = useMemo(() => {
    const formatMintedTime = collection.startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return collection.startDate instanceof Date
      ? `${formatMintedTime}`
      : "Invalid Date";
  }, [collection]);

  const property = useMemo(() => ({
    claimedSupply: token?.totalSupply,
    tokenId: tokenId,
    minted: date,
    royalties: convertToPercentage(collection.royalty),
    owned: ownedSupply,
    license: "No License",
    price: collection.price,
    defaultMintAmount: collection.defaultMintAmount || 1,
  }), [collection, token, ownedSupply, date]);

  let attributes = token?.metadata.attributes ? [ ...token?.metadata.attributes ] : [];
  if (token?.metadata.rank) {
    attributes.unshift({ trait_type: "Rank", value: token?.metadata.rank.toString() });
  }

  return (
    <>
      <Description
          collection={collection}
          token={token}
          contractCreator={collection.contractCreator}
          userToken={userToken}
          loading={loading}
      >
        <div className={styles.viewCollection}>
        <Link href={{
            pathname: '/collection/[slug]/',
            query: { slug: collection.slug },
        }}>
          <a>
            <Icon name="arrow-left" className={styles.viewCollectionIcon} />
            VIEW COLLECTION
          </a>
        </Link>
        </div>
        <Caption title={token?.metadata.name} login={artistInfo?.slug} user={artistInfo?.name} />
        <Tabs
          tab={tab}
          collection={collection}
          token={token}
          address={address}
          listings={listings}
          setListings={setListings}
          fetchListingTrigger={fetchListingTrigger}
          setFetchListingTrigger={setFetchListingTrigger}
          ownedSupply={ownedSupply}
          availableSupply={availableSupply}
          ownedTrigger={ownedTrigger}
          setOwnedTrigger={setOwnedTrigger}
          loading={loading}
        />
      </Description>
    </>
  );
};

export default NFTCollectionTokenPage;
