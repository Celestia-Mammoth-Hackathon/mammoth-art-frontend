import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./CuratedCollections.module.sass";
import Collection from "./Collection";
import React from 'react';
import { useState, useEffect } from "react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import useCollectionStore from '@/store/index';
import SkeletonCollection from "../Skeleton/SkeletonCollection";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type CuratedCollectionsProps = {};

const CuratedCollections = ({}: CuratedCollectionsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [curatedCollections, setCuratedCollections] = useState([]);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const {
        collections,
        fetchAllCollections
    } = useCollectionStore();

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth <= 1023);
            }
        };

        checkIsMobile();

        // Add event listener to check for mobile resizing
        window.addEventListener('resize', checkIsMobile);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);
    
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
        setCuratedCollections(curatedCollections);
    }, [collections]);

    return (
    <div className={styles.collections}>
        <div className={cn("h1", styles.title)}>CURATED
        <span style={{ color: '#FF6B6B' }}>.</span>
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
                breakpoints={{
                    320: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 8,
                    },
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 12,
                    },
                    1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 16,
                    }
                }}
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
