import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";
import Image from "@/components/Image";
import { useState } from "react";
import List from "@/components/List";
type DetailsProps = {};

const Details = ({}: DetailsProps) => {
    // <div className={styles.details}>
    //     <div className={styles.row}>
    //         <div className={styles.col}>
    //             <div className={styles.label}>Buy now</div>
    //             <div className={cn("h4", styles.value)}>10.00 ETH</div>
    //             <Link href="/buy-now">
    //                 <a
    //                     className={cn(
    //                         "button-medium button-wide",
    //                         styles.button
    //                     )}
    //                 >
    //                     buy now
    //                 </a>
    //             </Link>
    //         </div>
    //         <div className={styles.col}>
    //             <div className={styles.label}>Reserve</div>
    //             <div className={cn("h4", styles.value)}>0.35 ETH</div>
    //             <Link href="/place-a-bid">
    //                 <a
    //                     className={cn(
    //                         "button-stroke-grey button-medium button-wide",
    //                         styles.button
    //                     )}
    //                 >
    //                     place a bid
    //                 </a>
    //             </Link>
    //         </div>
    //     </div>
    //     <div className={styles.foot}>
    //         <div className={styles.box}>
    //             <div className={styles.label}>Last sold</div>
    //             <div className={cn("h4", styles.value)}>6.05 ETH</div>
    //         </div>
    //         <div className={styles.user}>
    //             <div className={cn(styles.avatar, styles.history)}>
    //                 <Image
    //                     src="/images/avatar.jpg"
    //                     layout="fill"
    //                     objectFit="cover"
    //                     alt="Avatar"
    //                 />
    //             </div>
    //             <div className={styles.wrap}>
    //                 <div className={styles.author}>Dash</div>
    //                 <div className={styles.code}>0x56C1...8eCC</div>
    //             </div>
    //         </div>
    //         <Link href="/make-offer">
    //             <a
    //                 className={cn(
    //                     "button-stroke-grey button-medium",
    //                     styles.button
    //                 )}
    //             >
    //                 make offer
    //             </a>
    //         </Link>
    //     </div>
    // </div>
    const [sorting, setSorting] = useState<string>("details");

    const tabs = [
        {
            title: "Details",
            value: "details",
        },
        {
            title: "Offers",
            value: "offers",
        },
    ];

    const offers = [
        {
            amount: "1",
            value: "7.05 TIA",
            user: "Dash",
            address: "0x56C1...8eCC",
        },
        {
            amount: "1",
            value: "7.05 TIA",
            user: "Dash",
            address: "0x56C1...8eCC",
        },
        {
            amount: "1",
            value: "7.05 TIA",
            user: "Dash",
            address: "0x56C1...8eCC",
        },
        {
            amount: "1",
            value: "7.05 TIA",
            user: "Dash",
            address: "0x56C1...8eCC",
        },
    ]
    return (
        <div>
            <List tabs={tabs} tabsValue={sorting} setTabsValue={setSorting} nft={true}>
                {sorting === "details" && (
                    <div className={styles.details}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Buy now</div>
                                <div className={cn("h4", styles.value)}>10.00 TIA</div>
                                <Link href="/buy-now">
                                    <a
                                        className={cn(
                                            "button-medium button-wide",
                                            styles.button
                                        )}
                                    >
                                        buy now
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.foot}>
                            <div className={styles.box}>
                                <div className={styles.label}>Last sold</div>
                                <div className={cn("h4", styles.value)}>6.05 ETH</div>
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
                    {sorting === "offers" && (
                        <div className={styles.details}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <div className={styles.label}>Buy now</div>
                                <div className={cn("h4", styles.value)}>10.00 TIA</div>
                                <Link href="/buy-now">
                                    <a
                                        className={cn(
                                            "button-medium button-wide",
                                            styles.button
                                        )}
                                    >
                                        send offer
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.offerFoot}>
                            <div className={styles.footTitle}>Offers</div>
                            <div className={styles.footBox}>
                            {offers.map((offer, index) => 
                                <div className={styles.footItem} key={index}>
                                    <div className={styles.box}>
                                        <div className={cn("h4", styles.value)}>{offer.amount} at {offer.value}</div>
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
                                            <div className={styles.author}>{offer.user}</div>
                                            <div className={styles.code}>{offer.address}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>
                    )}
            </List>
        </div>
    );
}


export default Details;
