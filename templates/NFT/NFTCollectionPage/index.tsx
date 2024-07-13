import { useState, useEffect, ReactNode, useMemo } from "react";
import cn from "classnames";
import styles from "./NFTCollectionPage.module.sass";
import Image from '@/components/Image';
import Icon from '@/components/Icon';
import SkeletonCard from "./SkeletonCard";
import Card from "./Card";
import Pagination from '@mui/material/Pagination';
import Dropdown from "@/components/Dropdown";
import Checkbox from "@/components/Checkbox";
import indexer from "@/utils/indexer";
import useCollectionStore, { DropState } from '@/store/index';
import { useUserContext } from "context/user";
import { convertBigNumberToString } from '@/utils/index';
import { nativeCurrency } from '@/constants/details';

type NFTCollectionPageProps = {
  collection: any;
  attributes: Record<string, string>;
};

const NFTCollectionPage = ({ collection, attributes } : NFTCollectionPageProps) => {
  const { address } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useState<any[]>([]);
  const [tokenPrices, setTokenPrices] = useState<Record<string, number>>({});
  const [page, setPage] = useState<number>(1);
  const [floorPrice, setFloorPrice] = useState<ReactNode>(<>--</>);
  const [mintedSupply, setMintedSupply] = useState<number>(0);
  const [ownedSupply, setOwnedSupply] = useState<number>(0);
  const [ownedTokenIds, setOwnedTokenIds] = useState<string[]>([]);
  const {
    users,
    collections,
    fetchAllCollections,
    fetchOwnNfts
  } = useCollectionStore();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllCollections();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSupply = async () => {
      await fetchOwnNfts(collection.tokenAddress, collection.tokenId, address);
    };
    fetchSupply();
  }, [address, collection]);

  useEffect(() => {
    const collectionId = `${collection.tokenAddress.toLowerCase()}_${collection.tokenId}`;
    const c = collections[collectionId];

    if (c) {
      setMintedSupply(c.token.mintedSupply);
    } else {
      setMintedSupply(0);
    }
  }, [collections]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const listings = await indexer.getAllOrders({ tokenAddress: collection.tokenAddress, maxPages: 15 });
        const sortedListings: any = listings.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));

        const prices: Record<string, number> = {};
        for (const listing of sortedListings) {
          if (!prices[listing.tokenId]) {
            prices[listing.tokenId] = Number(convertBigNumberToString(listing.price, nativeCurrency.decimals));
          }
        }
        setTokenPrices(prices);

        const floorItem: any = sortedListings[0] || undefined;
        const floorPrice = floorItem
          ? <>
            {convertBigNumberToString(floorItem.price, nativeCurrency.decimals)} <span className={styles.currency}>{nativeCurrency.symbol}</span>
          </>
          : <>--</>;
          setFloorPrice(floorPrice);
      } finally {
      }
    };
    fetchOrders();
  }, [collection]);

  useEffect(() => {
    if (address) {
      const collectionId = `${collection.tokenAddress.toLowerCase()}_${collection.tokenId}`;
      setOwnedSupply(users[address]?.collections[collectionId]?.ownedSupply ?? 0);
      setOwnedTokenIds(users[address]?.collections[collectionId]?.tokenIds ?? []);
    } else {
      setOwnedSupply(0);
      setOwnedTokenIds([]);
    }
  }, [users, address, collection]);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);
        const tokens = await indexer.getAllCollectionTokens({ tokenAddress: collection.tokenAddress });
        for (let i = 0; i < tokens.length; i++) {
          tokens[i].metadata = collection.tokens.find((t: any) => t.id === tokens[i].tokenId);
        }

        let filteredTokens = tokens;
        if (Object.keys(attributes).length > 0) {
          filteredTokens = tokens.filter(token => {
            return Object.entries(attributes).every(([key, value]) => {
              return token.metadata.attributes.some((attr: any) => attr.trait_type.toLowerCase() === key && attr.value.toLowerCase() === value);
            });
          });
        }

        setTokens(filteredTokens);
      } finally {
        setLoading(false);
      }
    };
    fetchTokens();
  }, [collection, attributes]);

  const [filterOnSale, setFilterOnSale] = useState(false);
  const [filterOwned, setFilterOwned] = useState(false);

  const sortingOpts = ["id (asc)", "id (desc)", "rank (asc)", "rank (desc)", "price (asc)", "price (desc)"];
  const [sorting, setSorting] = useState(sortingOpts[0]);

  const sortedTokens = useMemo(() => {
    let filtered = filterOnSale ? tokens.filter(token => tokenPrices.hasOwnProperty(token.tokenId)) : tokens;

    if (filterOwned) {
      filtered = filtered.filter(token => ownedTokenIds.includes(token.tokenId));
    }

    switch (sorting) {
      case "id (asc)":
        return [...filtered].sort((a, b) => a.tokenId - b.tokenId);
      case "id (desc)":
        return [...filtered].sort((a, b) => b.tokenId - a.tokenId);
      case "rank (asc)":
        return [...filtered].sort((a, b) => a.metadata.rank ? a.metadata.rank - b.metadata.rank : a.metadata.rarity - b.metadata.rarity);
      case "rank (desc)":
        return [...filtered].sort((a, b) => b.metadata.rank ? b.metadata.rank - a.metadata.rank : b.metadata.rarity - a.metadata.rarity);
      case "price (asc)":
        return [...filtered].sort((a, b) => {
          const priceA = tokenPrices.hasOwnProperty(a.tokenId) ? tokenPrices[a.tokenId] : Infinity;
          const priceB = tokenPrices.hasOwnProperty(b.tokenId) ? tokenPrices[b.tokenId] : Infinity;
          return priceA - priceB;
        });
      case "price (desc)":
        return [...filtered].sort((a, b) => {
          const priceA = tokenPrices.hasOwnProperty(a.tokenId) ? tokenPrices[a.tokenId] : -1;
          const priceB = tokenPrices.hasOwnProperty(b.tokenId) ? tokenPrices[b.tokenId] : -1;
          return priceB - priceA;
        });
      default:
        return filtered;
    }
  }, [sorting, tokens, tokenPrices, filterOnSale, filterOwned, ownedTokenIds]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const itemsPerPage = 50;
  const pageCount = useMemo(() => Math.ceil(sortedTokens.length / itemsPerPage), [sortedTokens]);
  const pagedTokens = useMemo(() => sortedTokens.slice((page - 1) * itemsPerPage, page * itemsPerPage), [sortedTokens, page]);

  return (
    <>
      <div className={styles.spotlight}>
        <div className={styles.head}>
          <div className={styles.imageWrapper}>
            <Image
              className={styles.photo}
              src={collection.collectionImage}
              layout="fill"
              objectFit="contain"
              alt="CurrentCard"
              priority={true}
            />
          </div>
          <div className={styles.details}>
            <div className={cn("h1", styles.title)}>
              {collection.collectionName}
              {collection.music && (<Icon name="music" className={styles.musicIcon} />)}
            </div>
            <div className={styles.info}>{collection.collectionDescription}</div>
          </div>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.statName}>Items</div>
              <div className={styles.statValue}>{mintedSupply}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statName}>Owned</div>
              <div className={styles.statValue}>{ownedSupply}</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statName}>Mint Price</div>
              <div className={styles.statValue}>{collection.price} <span className={styles.currency}>{nativeCurrency.symbol}</span></div>
            </div>
            <div className={styles.stat}>
              <div className={styles.statName}>Floor</div>
              <div className={styles.statValue}>{floorPrice}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.filters}>
          <Checkbox
            className={styles.checkbox}
            label={`Owned`}
            value={filterOwned}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterOwned(e.target.checked)}
          />
          <Checkbox
            className={styles.checkbox}
            label={`For Sale`}
            value={filterOnSale}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterOnSale(e.target.checked)}
          />
          <Dropdown
            className={styles.dropdown}
            value={sorting}
            setValue={setSorting}
            options={sortingOpts}
          />
        </div>
        <div className={styles.list}>
          {loading
            ? <SkeletonCard />
            : pagedTokens.map((token: any, index: number) => (
              <Card className={styles.card} collection={collection} token={token} key={index} />
            ))
          }
        </div>
        <Pagination count={pageCount} shape="rounded" onChange={handlePageChange} showFirstButton showLastButton/>
      </div>
    </>
  );
};

export default NFTCollectionPage;
