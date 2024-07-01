import styles from "./SkeletonNFT.module.sass";
import Skeleton from '@mui/material/Skeleton';

type SkeletonNFTProps = {};

const SkeletonNFT = ({}: SkeletonNFTProps) => {
    return (
        <>
            <a className={styles.token}>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="rectangular" width="100%" height={236}/>
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

export default SkeletonNFT;
