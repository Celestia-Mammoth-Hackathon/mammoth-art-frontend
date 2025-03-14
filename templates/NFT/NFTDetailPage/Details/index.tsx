import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import { useState } from "react";
import List from "@/components/List";
import Info from "./Info";
import Skeleton from '@mui/material/Skeleton';

type DetailsProps = {
    collection: any;
    userToken: any;
    loading: boolean;
};

const Details = ({
    collection, 
    userToken, 
    loading
}: DetailsProps) => {
    const [sorting, setSorting] = useState<string>("info");
    const [owned, setOwned] = useState<boolean>(true);
    const [value, setValue] = useState<number>(0);
    const [theme, setTheme] = useState<boolean>(false);
    const tabsTokens = [
        {
            title: "Info",
            value: "info",
        },
        {
            title: "Listings",
            value: "listings",
        },
        {
            title: "Offers",
            value: "offers",
        },
        {
            title: "Owners",
            value: "owners",
        },
        {
            title: "History",
            value: "history",
        },
    ];
    const onChange = (e:any) => {
        setValue(e.target.value)
    }

    

    return (
        loading 
        ?   <List
                tabs={tabsTokens}
                tabsValue={sorting}
                setTabsValue={setSorting}
                light={theme}
                nftDetail={true}
            >
                <div className={styles.loadingWrapper}>
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                    <Skeleton variant="rectangular" width="100%" sx={{ bgcolor: '#141414' }} className={styles.loading} />
                </div>
            </List>
        :   <List
                tabs={tabsTokens}
                tabsValue={sorting}
                setTabsValue={setSorting}
                light={theme}
                nftDetail={true}
            >
                {sorting === "info" && (
                    <Info collection={collection}/>
                )}

                {sorting === "listings" && (
                    <div className={styles.details}>
                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <div className={styles.label}>Buy now price</div>
                                    <button className={styles.btnWrap}>
                                        <input
                                            className={styles.buyNowInput}
                                            required={true}
                                            onChange={onChange}
                                            placeholder="0.00"
                                        >
                                        </input>
                                        <button
                                            className={styles.logo}
                                        >
                                            <Image
                                                src="/images/celestia.svg"
                                                width={24}
                                                height={24}
                                                alt="Celestia LOGO"
                                            />
                                            <span className={styles.logoTitle}>TIA</span>
                                        </button>
                                    </button>
                                </div>
                            </div>
                            <div className={styles.footBox}>
                                <div className={styles.foot}>
                                    <div className={styles.label}>Our fee</div>
                                    <div className={cn("h4", styles.value)}>
                                        <div className={styles.percent}>2.5%</div>
                                        <div className={styles.fee}>{value * 2.5 / 100} TIA</div>
                                    </div>
                                </div>
                                <div className={styles.foot}>
                                    <div className={styles.label}>You will receive</div>
                                    <div className={cn("h4", styles.value)}>
                                        <div className={styles.percent}>97.5%</div>
                                        <div className={styles.fee}>{value * 97.5 / 100} TIA</div>
                                    </div>
                                </div>
                                
                            </div>
                            <div> 

                            <div className={styles.setButton}>
                                        <a
                                            className={cn(
                                                "button-medium button-wide",
                                                styles.button
                                            )}
                                            onClick={() => {
                                                setSorting("listed")
                                                setOwned(true)
                                            }}
                                        >
                                            {owned ? "set buy now price" : "buy now"}
                                        </a>
                                    </div>
                            </div>
                        
                    </div>
                )}

                {sorting === "offers" && (
                    <div className={styles.details}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Buy now</div>
                                <div className={cn("h4", styles.value)}>
                                    {value} TIA
                                </div>
                                <div>
                                    <a
                                        className={cn(
                                            "button-medium button-wide",
                                            styles.button
                                        )}
                                        onClick={() => {
                                            setSorting("details")
                                            setOwned(false)
                                        }}
                                    >
                                        buy now
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.foot}>
                            <div className={styles.box}>
                                <div className={styles.label}>YOUR LISTING</div>
                                <div className={cn("h4", styles.value)}>
                                {value} TIA
                                </div>
                            </div>
                            <div className={styles.cancelButon}>
                                CANCEL
                            </div>
                        </div>
                        <div className={styles.foot}>
                            <div className={styles.box}>
                                <div className={styles.label}>Last sold</div>
                                <div className={cn("h4", styles.value)}>
                                    {true ? "6.05 TIA" : "-"}
                                </div>
                            </div>
                            <div className={styles.user}>
                                <div className={cn(styles.avatar, styles.history)}>
                                    <Image
                                        src="/images/avatar.jpg"
                                        layout="fill"
                                        objectFit="cover"
                                        alt="Avatar"
                                    />
                                </div>
                                <div className={styles.wrap}>
                                    <div className={styles.author}>Dash</div>
                                    <div className={styles.code}>0x56C1...8eCC</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </List>
    );
}


export default Details;
