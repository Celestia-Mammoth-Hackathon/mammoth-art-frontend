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

const list = [
    {
        title: "Infinite",
        collection: "Evermore",
        price: "10.00 TIA",
        reserve: "2.38 TIA",
        image: "/images/main-pic-1.jpg",
    },
    {
        title: "Robot Dog",
        collection: "Evermore",
        price: "24.33 TIA",
        reserve: "5.64 TIA",
        image: "/images/main-pic-2.jpg",
        color: "#BCE6EC",
    },
    {
        title: "Pyramid",
        collection: "Evermore",
        price: "5.4 TIA",
        reserve: "1.45 TIA",
        image: "/images/auction-pic-2.jpg",
        color: "#B9A9FB",
    },
];

import SwiperCore from 'swiper'
import { Navigation, Scrollbar, Autoplay, EffectFade } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import 'swiper/css/effect-fade';
SwiperCore.use([Autoplay]);
type MainProps = {};

const Main = ({}: MainProps) => {
    const [bgColor, setBgColor] = useState(list[0].image);
    const [item, setItem] = useState<any>(list[0]);

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
        updateBackgroundColor(list[0].image); // Initial color
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
                className="horizontal-swiper"
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
                    updateBackgroundColor(list[currentSlide].image);
                    setItem(list[currentSlide])
                }}
            >
                {list.map((x, index) => (
                    <SwiperSlide key={index}>
                        <Item item={x} key={index} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={styles.wrap} style={{ backgroundColor: "black" }}>
                <div className={styles.titleWrap}>
                    <div className={cn("h1", styles.title)}>{item.title}</div>
                    <div className={cn("h1", styles.subtitle)}>By {item.collection}</div>
                </div>
                
                <div className={styles.btns}>
                    <Link href="/buy-now">
                        <a className={cn("button", styles.button)}>MINT</a>
                    </Link>
                </div>
            </div>
        </div> 
    </>

)};

export default Main;
