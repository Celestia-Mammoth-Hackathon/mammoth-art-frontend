import styles from "./Background.module.sass";
import Image from "@/components/Image";
import Skeleton from '@mui/material/Skeleton';

type BackgroundProps = {
    image: any;
    loading?: boolean
};

const Background = ({ image, loading = false }: BackgroundProps) => {
    return (
        loading 
        ?   <div className={styles.background}>
                <Skeleton variant="rectangular" height="100%" width="100%" sx={{ bgcolor: '#141414' }}/>
            </div>
        :   <div className={styles.background}>
                <Image src={image} layout="fill" objectFit="cover" alt="Background" />
            </div>
    )

}
    

export default Background;
