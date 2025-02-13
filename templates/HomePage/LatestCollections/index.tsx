import { Swiper, SwiperSlide } from "swiper/react";
import cn from "classnames";
import styles from "./LatestCollections.module.sass";
import Collection from "./Collection";
import React from 'react';
import { useState, useEffect } from "react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import Link from "next/link";
import useCollectionStore from '@/store/index';

type LatestCollectionsProps = {};

const LatestCollections = ({}: LatestCollectionsProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [latestCollections, setLatestCollections] = useState([]);

    const {
        generativeCollections,
        fetchAllGenerativeCollections
    } = useCollectionStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchAllGenerativeCollections();
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const latestCollections:any = Object.values(generativeCollections);
        setLatestCollections(latestCollections);
    }, [generativeCollections]);
    console.log(latestCollections)
    return (
    <div className={styles.collections}>
        <div className={styles.header}>
            <div className={cn("h1", styles.title)}>
                LATEST MINTS
                <span style={{ color: '#FF6B6B' }}>.</span>
            </div>
            <Link href="/discover">
                <a className={cn("h1", styles.view)}>
                    VIEW ALL
                </a>
            </Link>
            
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
                {latestCollections.map((collection, index) => (
                    <SwiperSlide key={index}>
                        <Collection item={collection} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </div>
)};

export default LatestCollections;
