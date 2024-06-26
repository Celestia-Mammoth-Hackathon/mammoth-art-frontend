import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "@/components/Image";
import { useEffect, useState } from 'react';
import { transformUri } from "@/utils/ipfs";
import { nativeCurrency } from '@/constants/details';
import Skeleton from '@mui/material/Skeleton';
import useCollectionStore from '@/store/index';

type TokenProps = {
    className?: string;
    item: any;
    large?: boolean;
    dark?: boolean;
    owned?: boolean;
};

const Token = ({ className, item, large, dark, owned = false }: TokenProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        collections,
        fetchCollection,
    } = useCollectionStore();

    const collectionId = `${item.tokenAddress.toLowerCase()}_${item.tokenId}`;
    const parsedMintedTime  = new Date(item.drop?.startDate * 1000) || new Date();
    const formatMintedTime = parsedMintedTime.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const date =
        parsedMintedTime instanceof Date
            ? `${formatMintedTime}`
            : "Invalid Date";
            
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchCollection(item.tokenAddress, item.tokenId);
                item.mintedSupply = collections[collectionId]?.token.mintedSupply || 0;
            } catch (error) {
                console.error("Error fetching tokens:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Link href={{
            pathname: '/drop/[slug]',
            query: { slug: item.slug },
        }}>
            <a
                className={cn(
                    styles.token,
                    { [styles.large]: large, [styles.dark]: dark },
                    className
                )}
            >
                <div className={styles.preview}>
                    <Image
                        src={transformUri(item.metadata.image)}
                        layout="fill"
                        objectFit="contain"
                        alt="Token"
                    />
                    {
                        owned &&
                            <div className={styles.supply}>
                                {item.ownedSupply}x
                            </div>
                    }
                </div>
                <div className={styles.details}>
                    {
                        loading ?
                            <div>
                                <div>
                                    <Skeleton sx={{ bgcolor: '#141414' }} height={10} width="100%" className={styles.price}/>
                                </div>
                                <div className={styles.foot}>
                                    <div className={styles.box}>
                                    <div className={styles.category}>{owned ? "Mint Date" : "Total Minted"}</div>
                                        <Skeleton sx={{ bgcolor: '#141414' }} height={10} width="50%" className={styles.price}/>
                                    </div>
                                    <div className={styles.price}>
                                        <div className={styles.category}>Price</div>
                                        <Skeleton sx={{ bgcolor: '#141414' }} height={10} width="50%" className={styles.price}/>
                                    </div>
                                </div>
                            </div>
                            
                            :
                            <div>
                                <div className={styles.titleWrapper}>
                                    <span className={styles.title}>
                                        {item.metadata.name}
                                    </span>
                                </div>
                                <div className={styles.detailBox}>
                                    <div className={styles.edition}>
                                        <div className={styles.category}>{owned ? "Mint Date" : "Editions"}</div>
                                        <div className={styles.edition}>{owned ? date : item.mintedSupply || "0"}</div>
                                    </div>
                                    <Image
                                        src="/images/border.svg"
                                        width="1"
                                        height="24"
                                        alt="border"
                                    />
                                    <div className={styles.price}>
                                        <div className={styles.category}>Price</div>
                                        <div className={styles.price}>
                                            {item.price > 0 ? `${item.price} ${nativeCurrency.symbol || ''}` : 'Free'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                    }
                </div>
            </a>
        </Link>
    );
}
export default Token;
