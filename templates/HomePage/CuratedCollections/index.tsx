import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./CuratedCollections.module.sass";
import Collection from "./Collection";
import React from 'react';
import { curatedCollections } from "@/mocks/collections";
import { Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type CuratedCollectionsProps = {};

const CuratedCollections = ({}: CuratedCollectionsProps) => {
    return (
    <div className={styles.collections}>
        <div className={cn("h1", styles.title)}>CURATED
        <span style={{ color: '#FF6B6B' }}>.</span>
        </div>
        <div className={styles.wrapper}>
            <Swiper
                navigation={true}
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
                {curatedCollections.map((collection, index) => (
                    <SwiperSlide key={index}>
                        <Collection item={collection} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
)};

export default CuratedCollections;
