import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./Main.module.sass";
import Image from "@/components/Image";
import { curatedArtworks } from "@/mocks/artworks";
import Icon from "@/components/Icon";
import TimeCounter from "@/components/TimeCounter";

const list = [
    {
        title: "The creator network.",
        collection: "Escape II",
        price: "10.00 ETH",
        reserve: "2.38 ETH",
        image: "/images/main-pic-1.jpg",
    },
    {
        title: "The creator network.",
        collection: "Escape I",
        price: "24.33 ETH",
        reserve: "5.64 ETH",
        image: "/images/main-pic-2.jpg",
        color: "#BCE6EC",
    },
    {
        title: "The creator network.",
        collection: "Escape III",
        price: "5.4 ETH",
        reserve: "1.45 ETH",
        image: "/images/auction-pic-2.jpg",
        color: "#B9A9FB",
    },
];

import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type MainProps = {};

const item = curatedArtworks[0]

const Main = ({}: MainProps) => (
    <div className={styles.slide}>
    <Image src={item.image} layout="fill" objectFit="cover" alt="Slide" />
    <div className={styles.row}>
        <div className={styles.details}>
            <div className={styles.head}>
                <div className={cn("h1", styles.title)}>{item.title}</div>
                
            </div>
            <div className={styles.btns}>
                <Link href="/nft">
                    <a className={cn("button-stroke-white", styles.viewButton)}>
                        <span>View Collection</span>
                        <Icon name="arrow-right"  className={styles.arrow}/>
                    </a>
                </Link>
                <Link href="/place-a-bid">
                    <a className={cn("button-white", styles.generateButton)}>
                        Generate
                    </a>
                </Link>
            </div>
        </div>
        <div className={styles.authorBox}>
            <div className={styles.author}>
                <div className={styles.avatar}>
                    <Image
                        src={item.avatar}
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
                </div>
                @{item.login}
            </div>
            <div className={styles.box}>
                <div className={styles.info}>Minting ends in</div>
                <TimeCounter
                    className={styles.timer}
                    classTimerItem={styles.timerItem}
                    classTimerValue={styles.timerValue}
                    classTimerText={styles.timerText}
                    time={item.time}
                />
            </div>
        </div>
       
    </div>
</div>
);

export default Main;
