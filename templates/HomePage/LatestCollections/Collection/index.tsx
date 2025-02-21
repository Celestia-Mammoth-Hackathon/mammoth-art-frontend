import cn from "classnames";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "@/components/Image";
import { formatUserAddress } from "@/utils/index";
import { transformUri } from "@/utils/ipfs";
import { convertBigNumberToString } from '@/utils/index';
import { nativeCurrency } from '@/constants/details';
import useClaimNFT from "@/hooks/useClaimNft";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import MintModal from "@/components/ActionModal/MintModal";
import Icon from "@/components/Icon";
import { getInfluencingNfts } from "@/utils/indexer";
import { useUserContext } from "context/user";
import { useCollectionContext } from "context/collection";

type CollectionProps = {
    item: any;
};

const Collection = ({ item }: CollectionProps) => {
    const [isAuthorHovered, setIsAuthorHovered] = useState(false);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [mintingResponse, setMintingResponse] = useState<any>(null);
    const [influencingNfts, setInfluencingNfts] = useState<any>([]);
    const { users } = useCollectionContext();
    const { address } = useUserContext();

    const { claimNFT, isMintingLoading, mintingStatus, mintedTokens, isMintingError } = useClaimNFT({
        item: item.token,
        address: address,
        mintAmount: 1,
        setVisibleMintMenu: () => {},
        setResponse: setMintingResponse,
    });

    useEffect(() => {
        const fetchInfluencingNfts = async () => {
            const nfts = await getInfluencingNfts(item.token.drop.tokenAddress);
            setInfluencingNfts(nfts);
        };
        if(item.token.drop) {
            fetchInfluencingNfts();
        }
    }, [item]);

    const checkUserOwnership = (nft: any) => {
        if(users) {
            return users[address]?.collections[nft.tokenAddress]?.tokenIds?.some((userNft: any) => 
                userNft.tokenAddress.toLowerCase() === nft.tokenAddress.toLowerCase() &&
                nft.tokenIds.includes(userNft.tokenId)
            );
        }
        return false;
    };

    const handleMintClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setVisibleModal(true);
    };

    const handleMint = async () => {
        await claimNFT();
    };

    return (
        <>
            <div className={styles.collection}>
                <Link href={'/collection/' + item.token.drop.tokenAddress} passHref>
                    <a target="_blank" rel="noopener noreferrer">
                        <div className={styles.image}>
                            <Image
                                className={styles.photo}
                                src={transformUri(item.token.image, false)}
                                layout="fill"
                                objectFit="contain"
                                alt="Latest Collection"
                                priority={true}
                            />
                            <div className={styles.mintOverlay}>
                                <button 
                                    className={cn(styles.mintButton, isMintingLoading && styles.loading)}
                                    onClick={handleMintClick}
                                    disabled={isMintingLoading}
                                >
                                    {isMintingLoading ? (
                                        <Spinner className={styles.spinner} />
                                    ) : (
                                        `MINT FOR ${convertBigNumberToString(item.token.drop.price, nativeCurrency.decimals)} TIA`
                                    )}
                                </button>
                            </div>
                        </div>
                    </a>
                </Link>
                <div className={styles.details}>
                    <div className={styles.box}>
                        <Link href={'/collection/' + item.token.tokenAddress} passHref>
                            <a target="_blank" rel="noopener noreferrer">
                                <div className={`${styles.subtitle} ${isAuthorHovered ? styles.subtitleHover : ''}`}>
                                    {item.token.name}
                                </div>
                            </a>
                        </Link>
                        <div className={styles.authorWrapper}>
                            {/* <div className={styles.avatar}>
                                <Image
                                    src={item.avatar}
                                    layout="fill"
                                    objectFit="cover"
                                    alt="Avatar"
                                />
                            </div> */}
                            <span className={styles.byAuthor}>By: </span>
                            <Link href={{
                                    pathname: '/profile/[slug]',
                                    query: { slug: formatUserAddress(item.token.drop.creator) },
                                }} passHref>
                                    <a target="_blank" rel="noopener noreferrer">
                                        <span 
                                            className={styles.author}
                                            onMouseEnter={() => setIsAuthorHovered(true)}
                                            onMouseLeave={() => setIsAuthorHovered(false)}
                                        >{formatUserAddress(item.token.drop.creator)}</span>
                                    </a>
                                </Link> 
                        </div>
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.box}>
                        <div>
                            <div className={styles.label}>Price</div>
                            <div className={styles.price}>{convertBigNumberToString(item.token.drop.price, nativeCurrency.decimals)} TIA</div>
                        </div>
                        <div>
                            <div className={styles.label}>Mints</div>
                            <div className={styles.text}>{item.token.mintedSupply}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <div className={styles.modalContent}>
                    <div className={styles.leftSection}>
                        <div className={styles.tokenPreview}>
                            <Image
                                src={transformUri(item.token.image, false)}
                                layout="fill"
                                objectFit="cover"
                                alt={item.token.name}
                            />
                        </div>
                        <div className={styles.tokenInfo}>
                            <div className={styles.tokenName}>{item.token.name}</div>
                            <div className={styles.tokenDescription}>{item.token.description}</div>
                            <div className={styles.tokenDetails}>
                            <div className={styles.tokenOwnerWrapper}>
                                <span className={styles.by}>By</span>
                                <Link href={`/profile/${item?.token?.drop?.creator}`} passHref>
                                    <div className={styles.tokenOwner}>{formatUserAddress(item?.token?.drop?.creator)}</div>
                                </Link>
                            </div>
                            <div>Price: {convertBigNumberToString(item?.token?.drop?.price, nativeCurrency.decimals)} TIA</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={styles.rightSection}>
                        <h4 className={styles.influencingTitle}>Influencing NFTs</h4>
                        <div className={styles.influencingNfts}>
                            {influencingNfts?.map((nft: any, index: number) => (
                                <div key={index} className={styles.nftItem}>
                                    <div className={styles.nftInfo}>
                                        <Icon 
                                            name={checkUserOwnership(nft) ? "check" : "close"} 
                                            className={cn(
                                                styles.icon,
                                    
                                            )}
                                            fill={checkUserOwnership(nft) ? "#00ff00" : "#ff0000"}
                                        />
                                        <span>{nft.metadata.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.buttonContainer}>
                    <button 
                        className={cn("button-large", styles.button, isMintingLoading && styles.mintingButton)}
                        onClick={handleMint}
                        disabled={isMintingLoading}
                    >
                        {isMintingLoading ? <Spinner className={styles.spinner}/> : "Confirm Mint"}
                    </button>
                </div>
                </div>
            </Modal>

            {mintingResponse && (
                <MintModal 
                    visible={visibleModal}
                    mintedTokens={mintedTokens}
                    isMintingLoading={isMintingLoading}
                    isMintingError={isMintingError}
                    checkNetwork={() => {}}
                    showMintAgain={false}
                    claimNFT={handleMint}
                    response={mintingResponse}
                    onClose={() => setMintingResponse(null)}
                />
            )}
        </>
    );
};

export default Collection;
