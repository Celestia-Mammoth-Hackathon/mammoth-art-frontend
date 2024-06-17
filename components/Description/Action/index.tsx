import cn from "classnames";
import styles from "./Action.module.sass";
import { useContext } from "react";
import Icon from "@/components/Icon";
import { ModalContext } from "context/modal";
import { UserContext } from "context/user";

type ActionProps = {
    collection: any,
    userToken: any,
};

const Action = ({ collection, userToken }: ActionProps) => {
    const { setVisibleListMenu } = useContext(ModalContext);
    const { address } = useContext(UserContext);
    const sortedListings = collection.secondaryListings.sort((a: any, b: any) => parseFloat(a.price) - parseFloat(b.price));
    const myListing = sortedListings.filter((listing : any) => listing.makerId.toLowerCase() === address.toLowerCase());
    const ownedSupply = userToken ? userToken.ownedSupply : 0;
    const listingSupply = myListing.length ? myListing.reduce((sum:number, listing:any) => sum + (parseInt(listing.qty) - parseInt(listing.filled ?? 0)), 0) : 0;
    const availableSupply = ownedSupply - listingSupply;

    return (
        <div className={styles.action}>
            <div className={styles.line}>
                <div className={styles.infor}>
                    <div className={styles.own}>
                        <div className={styles.title}>Owned: 
                            <span className={styles.value}>{ownedSupply || 0}</span>
                        </div>
                        <div className={styles.btn}>
                            <a
                                className={cn(
                                    "button-medium button-wide",
                                    styles.button,
                                    styles.listBtn
                                )}
                                onClick={() => 
                                    setVisibleListMenu(true)
                                }
                            >
                                LIST
                            </a>
                        </div>
                    </div>
                    <div className={styles.list}>
                        <div className={styles.title}>Listed:
                            <span className={styles.value}>{listingSupply || 0}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.btns}>
                    <button className={styles.btn}>
                        <a
                            className={cn(
                                "button-medium button-wide",
                                styles.button,
                                styles.offerBtn
                            )}
                            onClick={() => 
                                setVisibleListMenu(true)
                            }
                        >
                            MAKE A OFFER
                        </a>
                    </button>
                    <div className={styles.btn}>
                        <a
                            className={cn(
                                "button-medium button-wide",
                                styles.button,
                                styles.buyBtn
                            )}
                            onClick={() => 
                                setVisibleListMenu(true)
                            }
                        >
                            BUY NOW
                        </a>
                    </div>
                </div>
            </div>
        </div>
)};

export default Action;
