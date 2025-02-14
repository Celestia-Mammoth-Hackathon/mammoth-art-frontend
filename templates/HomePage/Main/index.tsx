import cn from "classnames";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import { curatedArtworks } from "@/mocks/artworks";
import Icon from "@/components/Icon";
import TimeCounter from "@/components/TimeCounter";
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

SwiperCore.use([Autoplay]);
type MainProps = {
    collections: any;
};

const Main = ({collections}: MainProps) => {
    const [item, setItem] = useState<any>(collections[0]?.token);
    const [bgColor, setBgColor] = useState(collections[0]?.token?.image);
    
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
                    delay: 5000,
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
                    setItem(collections[currentSlide])
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
                        By 
                        <Link href={`/profile/${item?.token?.drop?.creator}`} passHref>
                            <a className={cn("h1", styles.subtitle)}>{formatUserAddress(item?.token?.drop?.creator)}</a>
                        </Link>
                    </div>
                    <span className={cn("h1", styles.price)}>Price: {convertBigNumberToString(item?.token?.drop?.price, nativeCurrency.decimals)} TIA</span>
                </div>
                
                <div className={styles.btns}>
                    <div className={cn("button", styles.button)}>MINT</div>
                </div>
            </div>
        </div> 
    </>
    )
};

export default Main;
