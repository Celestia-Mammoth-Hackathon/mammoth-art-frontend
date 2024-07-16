import { useRouter } from "next/router";
import styles from "./Description.module.sass";
import Icon from "@/components/Icon";
import Preview from "./Preview";
import Action from "./Action";
import Tags from "./Tags";
import Caption from "./Caption";
import Link from 'next/link';
import { artistAddresses } from '@/constants/details';
import { formatUserAddress } from "@/utils/index";
import SkeletonDescription from "../SkeletonDescription";
import Attributes from "./Attributes";

type DescriptionProps = {
    exit?: boolean;
    children: React.ReactNode;
    contractCreator: any;
    collection: any;
    token: any;
    userToken: any;
    loading: boolean;
};

const Description = ({
    exit,
    children,
    contractCreator,
    collection,
    token,
    userToken,
    loading
}: DescriptionProps) => {
    const router = useRouter();
    const isMobile =  window.innerWidth <= 1023;
    const artistInfor:any = artistAddresses.find((element) => element.artistAddress === contractCreator) || {};

    if(loading) {
        return <></>
    }
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
                        image={token.metadata.image} 
                        animation={token?.cloudflareCdnId || token?.metadata.animation_url} 
                        alt={token.metadata.name} 
                    />
                    <Action collection={collection} userToken={userToken}/>
                    <div className={styles.box}>
                        <div className={styles.boxHeader}>
                            <div className={styles.title}>{token.metadata.name}</div>
                            <Link href={{
                                        pathname: '/profile/[slug]',
                                        query: { slug: artistInfor?.slug },
                            }}>
                                <div className={styles.creator}>{artistInfor?.name || formatUserAddress(contractCreator)}</div>
                            </Link>
                            
                        </div>
                        <div className={styles.boxBody}>
                            <div className={styles.content}>{token.metadata.description}</div>
                        </div>
                        {token.metadata?.tags && <Tags tags={token?.metadata?.tags}/>}
                        {token.metadata?.attributes && <Attributes attributes={token.metadata?.attributes} />}
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
