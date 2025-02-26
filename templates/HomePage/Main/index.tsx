import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./Main.module.sass";
import Spinner from "@/components/Spinner";
import Item from "./Item";
import { formatUserAddress, convertBigNumberToString } from "@/utils/index";
import SwiperCore from 'swiper'
import { Navigation, Scrollbar, Autoplay, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade';
import { nativeCurrency } from "@/constants/details";
import { transformUri } from "@/utils/ipfs";
import useClaimNFT from "@/hooks/useClaimNft";
import Modal from "@/components/Modal";
import MintModal from "@/components/ActionModal/MintModal";
import Image from "next/image";
import { getInfluencingNfts } from "@/utils/indexer";
import Icon from "@/components/Icon";
import { useCollectionContext } from "context/collection";
import { useUserContext } from "context/user";
SwiperCore.use([Autoplay]);
type MainProps = {
    collections: any;
};

const Main = ({collections}: MainProps) => {
    const [item, setItem] = useState<any>(collections[0]?.token);
    const [bgColor, setBgColor] = useState(collections[0]?.token?.image);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [mintingResponse, setMintingResponse] = useState<any>(null);
    const [influencingNfts, setInfluencingNfts] = useState<any>([]);
    const [mintClicked, setMintClicked] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);

    const { users } = useCollectionContext();
    const { address } = useUserContext();

    const { claimNFT, mintingStatus, isMintingLoading, isMintingError, mintingError, mintedTokens } = useClaimNFT({
        item: item?.token,
        address: address,
        mintAmount: 1,
        setVisibleMintMenu: () => {},
        setResponse: setMintingResponse,
    });

    const updateBackgroundColor = (imageSrc: string) => {
        const colorThief = new (require("colorthief")).default();
        const img = document.createElement("img") as HTMLImageElement;
        img.src = imageSrc;
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          const color = colorThief.getColor(img);
          setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
      };

    useEffect(() => {
        updateBackgroundColor(transformUri(collections[0]?.token?.image, false)); // Initial color
    }, []);

    useEffect(() => {
        const fetchInfluencingNfts = async () => {
            const nfts = await getInfluencingNfts(item?.token?.drop?.tokenAddress);
            setInfluencingNfts(nfts);
        };
        if(item?.token?.drop) {
            fetchInfluencingNfts();
        }
    }, [item]);

    const handleMintClick = (item: any) => {
        setMintClicked(true);
        setVisibleModal(true);
        setItem(item);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
        setMintClicked(false);
    };

    const handleMint = async () => {
        await claimNFT();
    };

    const checkUserOwnership = (nft: any) => {
        if(users) {
            return users[address]?.tokens.some((token: any) => {
                if(token.tokenAddress === nft.tokenAddress) {
                    const tokenIdString = String(token.tokenId);
                    return nft.tokenIds.includes(tokenIdString);
                }
                return false;
            });
        }
        return false;
    };

    return (
    <>
        <div className={styles.wrapper}
            style={{
                background: `radial-gradient(circle, ${bgColor} 0%, ${bgColor} 30%, #000 100%)`,
            }}
        >
            <Swiper
                navigation={true}
                loop={true}
                modules={[Navigation, Scrollbar, Autoplay, EffectFade]}
                effect="fade" 
                fadeEffect={{ crossFade: true }}
                className={cn("horizontal-swiper", styles.featuredSwiper)}
                direction="horizontal"
                scrollbar={{
                    hide: true,
                }}
                autoplay={{
                    delay: isMintingLoading ? 15000 : 5000,
                    disableOnInteraction: true,
                }}
                speed={1500}
                breakpoints={{
                    320: {
                        direction: "horizontal",
                    },
                    1024: {
                        direction: "horizontal",
                    },
                }}
                onSlideChange={(swiper) => {
                    const currentSlide = swiper.realIndex;
                    updateBackgroundColor(transformUri(collections[currentSlide].token.image, false));
                    if (!mintClicked) {
                        setItem(collections[currentSlide])
                    }
                }}
            >
                {collections.map((x: any, index: any) => (
                    <SwiperSlide key={index}>
                        <Item item={x} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.wrap} style={{ backgroundColor: "black" }}>
                <div className={styles.titleWrap}>
                    <Link href={`/collection/${item?.token?.drop?.tokenAddress}`} passHref>
                        <a className={cn("h1", styles.title)}>{item?.token?.name}</a>
                    </Link>
                    <div className={styles.author}>
                        <span className={styles.by}>By</span>
                        <Link href={`/profile/${item?.token?.drop?.creator}`} passHref>
                            <a className={cn("h1", styles.subtitle)}>{formatUserAddress(item?.token?.drop?.creator)}</a>
                        </Link>
                    </div>
                    <span className={cn("h1", styles.price)}>Price: {convertBigNumberToString(item?.token?.drop?.price, nativeCurrency.decimals)} TIA</span>
                </div>
                
                <div className={styles.btns}>
                    {isMintingLoading ? (
                        <div className={cn("button", styles.button)}>
                            <Spinner className={styles.spinner}/>
                        </div>
                    ) : (
                        <button 
                            className={cn("button", styles.button, !address && styles.disabled)} 
                            onClick={() => handleMintClick(item)}
                            disabled={!address}
                        >
                            MINT FOR {convertBigNumberToString(item?.token?.drop?.price, nativeCurrency.decimals)} TIA
                        </button>
                    )}
                </div>
            </div>
        </div> 

        <Modal
            visible={visibleModal}
            onClose={() => handleCloseModal()}
        >
            <div className={styles.modalContent}>
                <div className={styles.leftSection}>
                    <div className={styles.tokenPreview}>
                        <Image
                            src={transformUri(item?.token?.image, false)}
                            layout="fill"
                            objectFit="cover"
                            alt={item?.token?.name}
                        />
                    </div>
                    <div className={styles.tokenInfo}>
                        <Link href={`/collection/${item?.token?.drop?.tokenAddress}`} passHref>
                            <div className={styles.tokenName}>{item?.token?.name}</div>
                        </Link>
                        <div className={styles.tokenDescription}>{item?.token?.description}</div>
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
                    <h4 className={styles.influencingTitle}>You own following Influencing NFTs</h4>
                    <div className={styles.influencingNfts}>
                        {influencingNfts?.map((nft: any, index: number) => (
                            <div key={index} className={styles.nftItem}>
                                <div className={styles.nftInfo}>
                                    <Icon 
                                        name={checkUserOwnership(nft) ? "check" : "close"} 
                                        className={cn(
                                            styles.icon,
                                            checkUserOwnership(nft) ? styles.checkIcon : styles.xIcon
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
    )
};

export default Main;
