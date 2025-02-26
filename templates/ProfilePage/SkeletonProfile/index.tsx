import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from "./SkeletonProfile.module.sass";

const SkeletonProfile = () => {
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        {/* Avatar skeleton */}
        <Skeleton 
          variant="circular"
          width={224}
          height={224}
          className={styles.avatar}
          sx={{ bgcolor: '#141414' }}
        />
        
        {/* Details skeleton */}
        <div className={styles.details}>
          <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: '#141414' }} />
          <Skeleton variant="text" width="40%" height={24} sx={{ bgcolor: '#141414' }} />
          <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: '#141414' }} />
          <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: '#141414' }} />
          
          <div className={styles.stats}>
            {[...Array(3)].map((_, index) => (
              <Skeleton 
                key={index}
                variant="rectangular"
                width="30%"
                height={48}
                sx={{ bgcolor: '#141414', borderRadius: 2 }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.col}>
        {/* Tabs skeleton */}
        <div className={styles.tabs}>
          <Skeleton 
            variant="rectangular" 
            width="50%" 
            height={40} 
            sx={{ bgcolor: '#141414', borderRadius: 2 }} 
          />
          <Skeleton 
            variant="rectangular" 
            width="50%" 
            height={40} 
            sx={{ bgcolor: '#141414', borderRadius: 2 }} 
          />
        </div>

        {/* Grid skeleton */}
        <div className={styles.grid}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={styles.gridItem}>
              <Skeleton 
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ 
                  bgcolor: '#141414',
                  borderRadius: '16px 16px 0 0'
                }}
              />
              <div className={styles.itemContent}>
                <Skeleton variant="text" width="70%" height={24} sx={{ bgcolor: '#141414' }} />
                <Skeleton variant="text" width="90%" height={16} sx={{ bgcolor: '#141414' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonProfile;
