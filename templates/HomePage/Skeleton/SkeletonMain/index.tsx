import styles from "./SkeletonMain.module.sass";
import Skeleton from '@mui/material/Skeleton';

type SkeletonMainProps = {};

const SkeletonMain = ({}: SkeletonMainProps) => {
    return (
        <>
            <div className={styles.collection}>
                <div className={styles.images}>
                    <div className={styles.image}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="rectangular" width="100%" height={400}/>
                    </div>
                </div>
                <div className={styles.wrap} style={{ backgroundColor: "black" }}>
                    <div className={styles.titleWrap}>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" width={200} height={62}/>
                        <div className={styles.author}>
                            <span className={styles.by}>By</span>
                            <Skeleton sx={{ bgcolor: '#141414' }} variant="text" width={100} height={48}/>
                        </div>
                        <Skeleton sx={{ bgcolor: '#141414' }} variant="text" width={100} height={48}/>
                    </div>
                    
                    <div className={styles.btns}>
                    <Skeleton sx={{ bgcolor: '#141414' }} variant="rectangular" width={200} height={62}/>
                    </div>
                </div>
            </div>
        </>
)};

export default SkeletonMain;
