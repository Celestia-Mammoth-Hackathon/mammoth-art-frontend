import styles from "./SkeletonCollection.module.sass";
import Skeleton from '@mui/material/Skeleton';

type SkeletonCollectionProps = {};

const SkeletonCollection = ({}: SkeletonCollectionProps) => {
    return (
        <>
            <a className={styles.collection}>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="rectangular" width="100%" height={400}/>
                    </div>
                </div>
                <div className={styles.details}>
                    <div className={styles.box}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" height={20} width="50%" className={styles.subtitle}/>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" height={10} width="50%" className={styles.author}/>
                    </div>
                    <div className={styles.box}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" height={10} width="50%" className={styles.text}/>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" height={10} width="50%" className={styles.price}/>
                    </div>
                </div>
            </a>
        </>
)};

export default SkeletonCollection;
