import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";
import Spinner from "@/components/Spinner";
import LowBalanceModal from "../../NFTCollectionTokenPage/Details/Modal/LowBalanceModal";
import BuyModal from "../../NFTCollectionTokenPage/Details/Modal/BuyModal";
import { handleIpfsLink, convertBigNumberToString } from "@/utils/index";
import { nativeCurrency } from '@/constants/details';
import indexer from "@/utils/indexer";
import useBuyOrder from "@/hooks/useBuyOrder";
import { useUserContext } from "context/user";

type CardProps = {
  className?: string;
  collection: any;
  token: any;
};

const Card = ({ className, collection, token }: CardProps) => {
  const { address, checkNetwork } = useUserContext();
  const [floorPrice, setFloorPrice] = useState<string>("--");
  const [floorListing, setFloorListing] = useState<any>(undefined);
  const [insufficientFunds, setInsufficientFunds] = useState<boolean>(false);
  const [visibleInsufficientFundsModal, setVisibleInsufficientFundsModal] = useState<boolean>(false);
  const [visibleBuyMenu, setVisibleBuyMenu] = useState<boolean>(false);
  const [buyLoadingId, setBuyLoadingId] = useState<string | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [claimNftTrigger, setClaimNftTrigger] = useState<boolean>(false);
  const [fetchListingTrigger, setFetchListingTrigger] = useState<boolean>(false);

  const { isBuyingLoading, isBuyingError, buyNft } = useBuyOrder({
    address,
    buyAmount: 1,
    setVisibleBuyMenu,
    setBuyLoadingId,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger,
    fetchListingTrigger,
    setFetchListingTrigger,
    setInsufficientFunds,
  });

  useEffect(() => {
    const fetchData = async () => {
      const allListings = await indexer.getAllOrders({
        tokenAddress: token.tokenAddress,
        tokenId: token.tokenId,
        maxPages: 1,
      });
      const sortedListings: any = allListings.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
      const floorItem: any = sortedListings[0] || undefined;
      const floorPrice = floorItem
        ? convertBigNumberToString(floorItem.price, nativeCurrency.decimals) + ` ${nativeCurrency.symbol}`
        : "--";
      setFloorPrice(floorPrice);
      setFloorListing(floorItem);
    };
    if (fetchListingTrigger) {
      setFloorPrice("--");
      setFloorListing(undefined);
      return;
    }
    fetchData();
  }, [token, fetchListingTrigger]);

  const onCloseModal = (setVisibleModal: any) => {
    return () => {
      setVisibleModal(false);
      setResponse(null);
    };
  };

  const onCloseInsufficientFundsModal = () => {
    setVisibleInsufficientFundsModal(false);
    setInsufficientFunds(false);
  };

  useEffect(() => {
    if (insufficientFunds) {
      setVisibleInsufficientFundsModal(true);
    };
  }, [insufficientFunds]);

  return (
    <>
      <Link href={{
        pathname: '/collection/[slug]/[tokenId]',
        query: { slug: collection.slug, tokenId: token.tokenId },
      }}>
        <a className={cn(styles.card, className)}>
          <div className={styles.preview}>
            <Image
              className={styles.photo}
              src={handleIpfsLink(token.metadata.image)}
              layout="fill"
              objectFit="contain"
              alt="Card"
            />
            <div className={styles.category}>
              {token.totalSupply}x
            </div>
            {address && floorListing && (
              <>
                <button
                  disabled={isBuyingLoading}
                  className={cn(
                    "button-medium",
                    styles.button,
                  )}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    await checkNetwork();
                    try {
                      await buyNft(floorListing.id, floorListing.price, 1);
                    } catch (error) {
                      console.error("Error buying NFT:", error);
                    }
                  }}
                >
                  {(buyLoadingId === floorListing.id && isBuyingLoading) ? (
                    <Spinner className={styles.spinner} />
                  ) : (
                    `BUY FOR ${floorPrice}`
                  )}
                </button>
              </>
            )}
          </div>
          <div className={styles.user}>
            <div className={styles.login}>{token.metadata.name}</div>
          </div>
          <div className={styles.foot}>
            {token.metadata.rank && (
              <div className={styles.box}>
                <div className={styles.textFirst}>Rank</div>
                <div className={styles.priceFirst}>
                  {token.metadata.rank}
                </div>
              </div>
            )}
            {token.metadata.rarity && (
              <div className={styles.box}>
                <div className={styles.textFirst}>Drop Chance</div>
                <div className={styles.priceFirst}>
                  {token.metadata.rarity}%
                </div>
              </div>
            )}
            <div className={styles.box}>
              <div className={styles.textSecond}>Price</div>
              <div className={styles.priceSecond}>{floorPrice}</div>
            </div>
          </div>
        </a>
      </Link>
      {address && visibleInsufficientFundsModal && (
        <LowBalanceModal visible={visibleInsufficientFundsModal} onClose={() => onCloseInsufficientFundsModal()} />
      )}
      {address && (
        <BuyModal
          visible={visibleBuyMenu}
          onClose={onCloseModal(setVisibleBuyMenu)}
          response={response}
        />
      )}
    </>
  );
};

export default Card;
