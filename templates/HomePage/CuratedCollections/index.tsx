import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./CuratedCollections.module.sass";
import Collection from "./Collection";
import React from 'react';
import { useState, useEffect } from "react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import useCollectionStore from '@/store/index';
import SkeletonCollection from "../SkeletonCollection";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type CuratedCollectionsProps = {};

const CuratedCollections = ({}: CuratedCollectionsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [curatedCollections, setCuratedCollections] = useState([]);

    const {
        collections,
        fetchAllCollections
    } = useCollectionStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchAllCollections();
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const curatedCollections:any = Object.values(collections);
        console.log(curatedCollections);
        setCuratedCollections(curatedCollections);
    }, [collections]);

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
                {
                    loading 
                    ?   Array.from({ length: 3 }).map((_, index) => (
                            <SwiperSlide key={index}>
                                <SkeletonCollection/>
                            </SwiperSlide>
                        )) 
                    :   curatedCollections.map((collection:any, index:number) => (
                            <SwiperSlide key={index}>
                                <Collection item={collection.token} />
                            </SwiperSlide>
                        ))
                }
            </Swiper>
        </div>
    </div>
)};

export default CuratedCollections;
