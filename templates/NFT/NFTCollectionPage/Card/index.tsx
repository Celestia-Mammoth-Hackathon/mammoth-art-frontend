import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "@/components/Image";
import { handleIpfsLink, convertBigNumberToString } from "@/utils/index";
import { nativeCurrency } from '@/constants/details';
import indexer from "@/utils/indexer";

type CardProps = {
  className?: string;
  collection: any;
  token: any;
};

const Card = ({ className, collection, token }: CardProps) => {
  const [floorPrice, setFloorPrice] = useState<string>("--");

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
    };
    fetchData();
  }, [token]);

  return (
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
  );
};

export default Card;
