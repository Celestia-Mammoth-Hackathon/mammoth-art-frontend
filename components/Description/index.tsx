import { useRouter } from "next/router";
import styles from "./Description.module.sass";
import Icon from "@/components/Icon";
import Preview from "./Preview";
import Action from "./Action";
import Tags from "./Tags";
import { artistAddresses } from '@/constants/details';
import { formatUserAddress } from "@/utils/index";

type DescriptionProps = {
    exit?: boolean;
    children: React.ReactNode;
    collection: any;
    userToken: any;
    loading: boolean;
};

const Description = ({
    exit,
    children,
    collection,
    userToken,
    loading
}: DescriptionProps) => {
    const router = useRouter();
    
    if(loading || !collection) {
        return <></>
    }

    const artistInfor:any = artistAddresses.find((element) => element.artistAddress === collection.token.contractCreator) || {};

    return (
        <>
            {exit && (
                <div className={styles.top}>
                    <button
                        className={styles.exit}
                        onClick={() => router.back()}
                    >
                        <Icon name="close-fat" />
                        <span>Exit preview mode</span>
                    </button>
                </div>
            )}
            <div className={styles.col}>
                <div className={styles.row}>
                    <Preview 
                        image={collection.token.metadata.image} 
                        animation={collection?.token?.cloudflareCdnId || collection?.token?.metadata.animation_url} 
                        alt={collection.token.metadata.name} 
                    />
                    <Action collection={collection} userToken={userToken}/>
                    <div className={styles.box}>
                        <div className={styles.boxHeader}>
                            <div className={styles.title}>{collection.token.metadata.name}</div>
                            <div className={styles.creator}>{artistInfor?.name || formatUserAddress(collection.token.contractCreator)}</div>
                        </div>
                        <div className={styles.boxBody}>
                            <div className={styles.stage}>Details</div>
                            <div className={styles.content}>{collection.token.metadata.description}</div>
                        </div>
                        <Tags tags={collection.token.metadata.tags}/>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.wrap}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Description;
