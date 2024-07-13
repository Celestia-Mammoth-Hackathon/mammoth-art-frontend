import cn from "classnames";
import styles from "./MintTab.module.sass";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Icon from "@/components/Icon";
import BuyModal from "../Modal/BuyModal";
import List from "@/components/List";
import { formatUserAddress } from "@/utils/index";
import Spinner from "@/components/Spinner";
import { ConnectBtn } from "@/components/Header/ConnectBtn";
import { useUserContext } from "context/user";
import TransferModal from "../Modal/TransferModal";
import LowBalanceModal from "../Modal/LowBalanceModal";
import ListModal from "../Modal/ListModal";
import CancelModal from "../Modal/CancelModal";
import useBuyOrder from "@/hooks/useBuyOrder";
import useCancelOrder from "@/hooks/useCancelOrder";
import Skeleton from '@mui/material/Skeleton';
import { useMediaQuery } from "react-responsive";
import OutsideClickHandler from "react-outside-click-handler";
import { convertBigNumberToString } from "@/utils/index";
import { nativeCurrency } from '@/constants/details';

type TabsProps = {
  tab: string;
  collection: any;
  token?: any;
  address?: any;
  listings: any;
  setListings: any;
  fetchListingTrigger: boolean;
  setFetchListingTrigger: Dispatch<SetStateAction<boolean>>;
  ownedSupply: number;
  availableSupply: number;
  ownedTrigger: boolean;
  setOwnedTrigger: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
};

const Tabs = ({
  tab,
  collection,
  token,
  address,
  listings,
  setListings,
  fetchListingTrigger,
  setFetchListingTrigger,
  ownedSupply,
  availableSupply,
  ownedTrigger,
  setOwnedTrigger,
  loading
}: TabsProps) => {

    const [currentTab, setCurrentTab] = useState<string>(tab);

    // Modal Trigger
    const [visibleBuyMenu, setVisibleBuyMenu] = useState<boolean>(false);
    const [visibleTransferMenu, setVisibleTransferMenu] = useState<string | undefined>(undefined);
    const [visibleListMenu, setVisibleListMenu] = useState<string | undefined>(undefined);
    const [visibleCancelMenu, setVisibleCancelMenu] = useState<boolean>(false);

    // Mobile button trigger
    const [showDropdown, setShowDropdown] = useState<string | undefined>(undefined);

    // Buy
    const [buyAmount, setBuyAmount] = useState<number>(1);
    const [buyLoadingId, setBuyLoadingId] = useState<string | null>(null);
    // Cancel
    const [cancelLoadingId, setCancelLoadingId] = useState<string | null>(null);

    const [response, setResponse] = useState<any>(null);
    const [insufficientFunds, setInsufficientFunds] = useState<boolean>(false);
    const [visibleInsufficientFundsModal, setVisibleInsufficientFundsModal] = useState(false);


    const {
        visibleProfile,
        setVisibleProfile,
        registration,
        setRegistration,
        checkNetwork
    } = useUserContext();

    const isTablet = useMediaQuery({
        query: "(max-width: 1023px)",
    });

    const toggleDropdown = (tokenId: string) => {
        setShowDropdown(showDropdown ? undefined : tokenId);
    };

    const [btnStyle, setBtnStyle] = useState<React.CSSProperties>({
        marginLeft: '0',
        width: '100%',
        display: 'block'
    });

    // Tabs for MintTab
    let mintTabs = [
        { title: "LISTINGS", value: "listings" },
        { title: "OWNED", value: "owned" }
    ];

    const { isCancelLoading, isCancelError, cancelOrder } = useCancelOrder({
        cancelLoadingId,
        setCancelLoadingId,
        listings,
        setListings,
        visibleCancelMenu,
        setVisibleCancelMenu,
        response,
        setResponse,
    });

    const { isBuyingLoading, isBuyingError, buyNft } = useBuyOrder({
        address,
        buyAmount,
        setVisibleBuyMenu,
        setBuyLoadingId,
        setResponse,
        claimNftTrigger: ownedTrigger,
        setClaimNftTrigger: setOwnedTrigger,
        fetchListingTrigger,
        setFetchListingTrigger,
        setInsufficientFunds,
    });

    const onCloseModal = (setVisibleModal: any) => {
        return () => {
            setVisibleModal(false);
            setResponse(null);
        };
    };

    const onCloseTokenIdModal = (setVisibleModal: any) => {
        return () => {
            setVisibleModal(undefined);
            setResponse(null);
        };
    };

    const onCloseInsufficientFundsModal = () => {
            setVisibleInsufficientFundsModal(false);
            setInsufficientFunds(false);
    };

    useEffect(() => {
        if (insufficientFunds) {
            setVisibleInsufficientFundsModal(true);
        };
    }, [insufficientFunds]);

  if (loading) {
    return <div className={styles.col}>
      <div className={styles.wrap}>
        <div className={styles.caption}>
          <div className={styles.line}>
            <div className={cn("h2", styles.detailsTitle)}>
              <Skeleton variant="rounded" sx={{ bgcolor: '#141414', marginBottom: '20px' }} height={35} width="100%" />
            </div>
          </div>
          <div className={styles.date}>
            <Skeleton variant="text" sx={{ bgcolor: '#141414', marginBottom: '20px' }} height={20} width="40%" />
          </div>
        </div>
        <Skeleton variant="text" sx={{ bgcolor: '#141414', marginBottom: '20px' }} height={500} width="100%" />
      </div>
    </div>
  }

    const renderListing = () => {
        if (!token.isMarketplaceAllowed) {
            return (
                <div className={styles.noItemDetails}>
                    <div className={styles.noItems}>Secondary listings will appear here after the initial mint has concluded.</div>
                </div>
            );
        }

        return (
            <div className={styles.details}>

                {/* Show listings.all next */}
                {listings?.all?.length !== 0 ? (
                    listings.all.map((listing: any, index: number) => (
                        <div key={index} className={styles.listRow}>
                            <div className={styles.items}>
                                {
                                    !isTablet && collection.type === "ERC1155" &&
                                    <div className={styles.item}>
                                        <div className={styles.label}>Seller</div>
                                        <div className={cn("h4", styles.listValue)}>
                                            {`${formatUserAddress(listing.makerId)}`}
                                        </div>
                                    </div>
                                }
                                {
                                    !isTablet && collection.type === "ERC721" &&
                                    <div className={styles.item}>
                                        <div className={styles.label}>Token</div>
                                        <div className={cn("h4", styles.listValue)}>
                                            {`#${listing.tokenId}`}
                                        </div>
                                    </div>
                                }
                                <div className={styles.listRightItem}>
                                    <div>
                                        <div className={isTablet ? styles.leftLabel : styles.rightLabel}>Price</div>
                                        <div className={cn("h4", styles.listRightValue)}>
                                            {+convertBigNumberToString(listing.price, nativeCurrency.decimals)} {nativeCurrency.symbol}
                                        </div>
                                    </div>
                                    {address ? (
                                        <div className={styles.btn}>
                                            <a
                                                className={cn(
                                                    "button-medium button-wide",
                                                    styles.button,
                                                    styles.listButton
                                                )}
                                                onClick={async() => {
                                                    await checkNetwork();
                                                    try {
                                                        await buyNft(listing.id, listing.price, 1);
                                                    } catch (error) {
                                                        if (insufficientFunds) {
                                                            setVisibleInsufficientFundsModal(true);
                                                        } else {
                                                            console.error("Error buying NFT:", error);
                                                        }
                                                    }
                                                }}
                                            >
                                                { (buyLoadingId === listing.id && isBuyingLoading) ? (  // Check if the current listing is loading
                                                    <Spinner className={styles.spinner}/>
                                                ) : (
                                                    `BUY`
                                                )}
                                            </a>
                                            <CancelModal
                                                visible={visibleCancelMenu}
                                                onClose={onCloseModal(setVisibleCancelMenu)}
                                                response={response}
                                            />
                                            <BuyModal
                                                visible={visibleBuyMenu}
                                                onClose={onCloseModal(setVisibleBuyMenu)}
                                                response={response}
                                            />
                                        </div>

                                    ) : (
                                        <div className={styles.btn}>
                                            <ConnectBtn
                                                registration={registration}
                                                setRegistration={setRegistration}
                                                visibleProfile={visibleProfile}
                                                setVisibleProfile={setVisibleProfile}
                                                btnStyle={btnStyle}
                                                className={cn(
                                                    "button-medium button-wide",
                                                    styles.button,
                                                    styles.listButton
                                                )}
                                            >
                                                CONNECT
                                            </ConnectBtn>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : null}

                {/* Show "No listed items" if both listings.mine and listings.all are empty */}
                {(listings?.mine?.length === 0 && listings?.all?.length === 0) && (
                    <div className={styles.noItemDetails}>
                        <div className={styles.noItems}>{`No items are currently listed. To list, visit the "Owned" tab and select a item to list.`}</div>
                    </div>
                )}
                {(listings?.mine?.length > 0 && listings?.all?.length === 0) && (
                    <div className={styles.noItemDetails}>
                        <div className={styles.noItems}>{`No items are currently listed. To list, visit the "Owned" to manage your listings.`}</div>
                    </div>
                )}
                  {visibleInsufficientFundsModal && (
                                <LowBalanceModal visible={visibleInsufficientFundsModal} onClose={() => onCloseInsufficientFundsModal()} />
                            )}
            </div>
        );
    }

    const renderAction = (tokenId: string) => {
        if (isTablet) {
            if (ownedSupply > 0) {
                return <div className={styles.actions}>
                <button
                    className={cn("button-circle button-medium", styles.dotButton)}
                    onClick={() => toggleDropdown(tokenId)}
                >
                    <Icon name="dots" className={styles.dot}/>
                </button>
                {
                    showDropdown === tokenId &&
                    <OutsideClickHandler onOutsideClick={() => setShowDropdown(undefined)}>
                        <div className={styles.dropdown}>
                            <button className={styles.dropdownItem} onClick={() => setVisibleListMenu(tokenId)}>
                                <span>LIST</span>
                            </button>
                            <button className={styles.dropdownItem} onClick={() => setVisibleTransferMenu(tokenId)}>
                                <span>TRANSFER</span>
                            </button>
                        </div>
                    </OutsideClickHandler>
                }

            </div>
            } else {
                return <></>
            }
        }

        return ownedSupply > 0 ? (
            <div className={styles.transferBtns}>
            {token.isMarketplaceAllowed && (
            <div className={styles.btn}>
                <a
                    className={cn(
                        "button-medium button-wide",
                        styles.button,
                        styles.setBtn
                    )}
                    onClick={() =>
                        setVisibleListMenu(tokenId)
                    }
                >
                    LIST
                </a>
            </div>
            )}
            <div className={styles.btn}>
                    <a
                        className={cn(
                            "button-medium button-wide",
                            styles.button,
                            styles.setBtn
                        )}
                        onClick={() =>
                            setVisibleTransferMenu(tokenId)
                        }
                    >
                        TRANSFER
                    </a>
            </div>
        </div>
        ) : null;
    }

  return (
    <>
    <List tabs={mintTabs} tabsValue={currentTab} setTabsValue={setCurrentTab} nft={true}>

      {currentTab === "listings" && (
        <>
          {renderListing()}
        </>
      )}

      {currentTab === "owned" && (
        <div className={styles.details}>
          <div className={styles.transferRow}>
            <div className={styles.items}>
              <div className={styles.nameItem}>
                <div>
                  <div className={styles.label}>Owned</div>
                  <div className={cn("h4", styles.nameValue)}>
                    {ownedSupply > 0 ? `${ownedSupply}` : "0"}
                  </div>
                </div>
              </div>
              <div className={styles.transferRightItem}>
                {ownedSupply > 0 && (
                  <>
                    {renderAction(token.tokenId)}
                    <TransferModal
                      key={`${token.tokenAddress}_${token.tokenId}_transfer`}
                      tokenAddress={token.tokenAddress}
                      tokenId={token.tokenId}
                      tokenType={collection.type}
                      address={address}
                      owned={ownedSupply}
                      visible={visibleTransferMenu == token.tokenId}
                      onClose={onCloseTokenIdModal(setVisibleTransferMenu)}
                      setVisibleTransferMenu={setVisibleTransferMenu}
                      claimNftTrigger={ownedTrigger}
                      setClaimNftTrigger={setOwnedTrigger}
                    />
                    <CancelModal
                      visible={visibleCancelMenu}
                      onClose={onCloseModal(setVisibleCancelMenu)}
                      response={response}
                    />
                    <ListModal
                      key={`${token.tokenAddress}_${token.tokenId}_list`}
                      tokenAddress={token.tokenAddress}
                      tokenId={token.tokenId}
                      tokenType={collection.type}
                      visible={visibleListMenu == token.tokenId}
                      onClose={onCloseTokenIdModal(setVisibleListMenu)}
                      availableSupply={availableSupply}
                      setResponse={setResponse}
                      response={response}
                      fetchListingTrigger={fetchListingTrigger}
                      setFetchListingTrigger={setFetchListingTrigger}
                      setClaimNftTrigger={ownedTrigger}
                      claimNftTrigger={setOwnedTrigger}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {listings?.mine?.length > 0 && (
            <div className={styles.ownedListing}>
              <div className={styles.label}>MY LISTINGS</div>
              {listings.mine.map((listing: any, index: number) => (
                <div className={styles.ownedListWrapper} key={index}>
                  <div className={styles.ownedListRow}>
                    <div className={styles.items}>
                      <div className={styles.ownedItem}>
                        <div className={styles.label}>Listed</div>
                        <div className={cn("h4", styles.listValue)}>
                          {listing.qty - listing.filled}
                        </div>
                      </div>
                      <div className={styles.ownedRightItem}>
                        <div>
                          <div className={styles.rightLabel}>Price</div>
                          <div className={cn("h4", styles.listRightValue)}>
                            {+convertBigNumberToString(listing.price, nativeCurrency.decimals)} {nativeCurrency.symbol}
                          </div>
                        </div>
                        <div className={styles.btn}>
                          <a
                            className={cn(
                              "button-medium button-wide",
                              styles.button,
                              styles.myListButton
                            )}
                            onClick={async () => {
                              await checkNetwork();
                              cancelOrder(listing.id);
                            }}
                          >
                            {(cancelLoadingId === listing.id && isCancelLoading) ? (
                              <Spinner className={styles.spinner} />
                            ) : (
                              `Cancel`
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </List>
    </>
  );
}

export default Tabs;
