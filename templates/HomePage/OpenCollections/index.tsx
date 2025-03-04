import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./OpenCollections.module.sass";
import Collection from "./Collection";
import React, { useState, useEffect } from 'react';
import { openCollections } from "@/mocks/collections";
import { Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";

type OpenCollectionsProps = {};

const OpenCollections = ({}: OpenCollectionsProps) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth <= 1023);
            }
        };

        checkIsMobile();

        window.addEventListener('resize', checkIsMobile);
            
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    return (
    <div className={styles.collections}>
        <div className={styles.header}>
            <div className={cn("h1", styles.title)}>
                OPEN MINTS
                <span style={{ color: '#FF6B6B' }}>.</span>
            </div>
            {/* <Link href="/discover">
                <a className={cn("h1", styles.view)}>
                    VIEW ALL
                </a>
            </Link> */}
            
        </div>
        
        <div className={styles.wrapper}>
            <Swiper
                navigation={isMobile ? false : true}
                slidesPerView={3}
                slidesPerGroup={3}
                loop={false}
                spaceBetween={16}
                scrollbar={{
                    hide: true,
                }}
                modules={[Navigation, Pagination, Scrollbar]}
                className="collections-swiper"
            >
                {openCollections.map((collection, index) => (
                    <SwiperSlide key={index}>
                        <Collection item={collection} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
)};

export default OpenCollections;
