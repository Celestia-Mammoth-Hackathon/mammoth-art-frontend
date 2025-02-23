import styles from "./SkeletonCollections.module.sass";
import Skeleton from '@mui/material/Skeleton';
import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Pagination } from "swiper";
import SkeletonCollection from "../SkeletonCollection";

import "swiper/css/navigation";
import "swiper/css/scrollbar";

type SkeletonCollectionsProps = {
    sectionName: string;
};

const SkeletonCollections = ({ sectionName }: SkeletonCollectionsProps) => {
    return (
        <div className={styles.collections}>
            <div className={cn("h1", styles.title)}>{sectionName}
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
                        Array.from({ length: 3 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <SkeletonCollection/>
                                </SwiperSlide>
                        )) 
                    }
                </Swiper>
            </div>
        </div>
)};

export default SkeletonCollections;
