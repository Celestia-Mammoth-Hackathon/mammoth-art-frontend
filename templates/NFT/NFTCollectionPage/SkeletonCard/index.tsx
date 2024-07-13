import cn from "classnames";
import styles from "./SkeletonCard.module.sass";
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';

type SkeletonCardProps = {
    className?: string;
};

const SkeletonCard = ({}: SkeletonCardProps) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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

    return (
        <div className={cn(styles.card, styles.skeletonLoading)}>
          <Skeleton sx={{ bgcolor: '#141414'}}  width="100%" className={styles.skeletonImage}
            style={{ minHeight: isMobile ? "0" : "300px", marginBottom: 24 }} variant="rectangular"/>
          <div className={styles.user}>
              <div className={styles.userBox}>
                  <Skeleton variant="rounded" sx={{ bgcolor: '#141414' }} height={10} width="30%" className={styles.login}/>
                  <Skeleton 
                    sx={{ bgcolor: '#141414', marginTop: isMobile ? "16px" : "0", marginBottom: isMobile ? "16px" : "0" }} 
                    height={10} 
                    width={isMobile ? "50%" : "30%"} 
                    className={styles.price}
                />
              </div>
          </div>
          <div className={styles.foot}>
            <div className={styles.box}>
              <Skeleton variant="rounded" sx={{ bgcolor: '#141414' }} height={10} width="30%" className={styles.text}/>
              <Skeleton sx={{ bgcolor: '#141414' }} height={10} width="50%" className={styles.price}/>
            </div>
            <div className={styles.box}>
              <Skeleton variant="rounded" sx={{ bgcolor: '#141414' }} height={10} width="30%" className={styles.text}/>
              <Skeleton sx={{ bgcolor: '#141414' }} height={10} width="50%" className={styles.price}/>
            </div>
          </div>
        </div>
    )
}

export default SkeletonCard;
