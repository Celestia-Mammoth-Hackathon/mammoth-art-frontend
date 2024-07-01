import styles from "./SkeletonDescription.module.sass";
import Skeleton from '@mui/material/Skeleton';

type SkeletonDescriptionProps = {
    children: React.ReactNode;
};

const SkeletonDescription = ({children}: SkeletonDescriptionProps) => {
    return (
        <>
            <div className={styles.col}>
                <div className={styles.row}>
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.preview}/>
                    <div className={styles.action}>
                        <div className={styles.line}>
                            <div className={styles.infor}>
                                <div className={styles.own}>
                                    <div className={styles.title}>Owned: 
                                        <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width={10} className={styles.value}/>
                                    </div>
                                    <div className={styles.btn}>
                                        <Skeleton variant="rectangular" sx={{ bgcolor: '#141414' }} height={48} width={85} className={styles.button}/>
                                    </div>
                                </div>
                                <div className={styles.list}>
                                    <div className={styles.title}>Listed:
                                        <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width={10} className={styles.value}/>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.btns}>
                                <button className={styles.btn}>
                                    <Skeleton variant="rectangular" sx={{ bgcolor: '#141414' }} height={48} width={85} className={styles.button}/>
                                </button>
                                <div className={styles.btn}>
                                    <Skeleton variant="rectangular" sx={{ bgcolor: '#141414' }} height={48} width={85} className={styles.button}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.box}>
                        <div className={styles.boxHeader}>
                            <div className={styles.title}>
                                <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width={300} className={styles.title}/>
                            </div>
                            <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width={100} className={styles.creator}/>
                            
                            
                        </div>
                        <div className={styles.boxBody}>
                        <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={16} width="100%" className={styles.creator}/>
                        <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={16} width="100%" className={styles.creator}/>
                        <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={16} width="100%" className={styles.creator}/>
                        </div>
                        <div className={styles.tags}>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div className={styles.tag} key={index}>
                                    <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={16} width="100%" className={styles.tag}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.wrap}>
                        {children}
                    </div>
                </div>
            </div>
        </>
)};

export default SkeletonDescription;
