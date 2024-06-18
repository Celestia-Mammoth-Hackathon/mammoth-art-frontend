import Description from "@/components/Description";
import Details from "./Details";
import { useState, useEffect, useContext } from "react";
import useCollectionStore, { DropState } from '@/store/index';
import { UserContext } from "context/user";

type MintNFTPageProps = {
    tokenAddress?: any;
    tokenId?: any;
    tab?: any;
};

const MintNFTPage = ({ tokenAddress, tokenId, tab } : MintNFTPageProps) => {
    const { address } = useContext(UserContext);
    
    const {
        users,
        collections,
        fetchCollection,
        setSecondaryListings,
        fetchOwnNfts,
    } = useCollectionStore();

    const [collection, setCollection] = useState<any>(null);
    const [userToken, setUserToken] = useState<any>(null);
    const [supplyLoading, setSupplyLoading] = useState(false);
    const [collectionLoading, setCollectionLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [claimNftTrigger, setClaimNftTrigger] = useState(false);
    const [fetchListingTrigger, setFetchListingTrigger] = useState(false);

    const [mintStatus, setMintStatus] = useState<string>('Minting ends');
    const [mintTime, setMintTime] = useState<number>(0);
    const [showTimeCounter, setShowTimeCounter] = useState<boolean>(true);

    const collectionId = `${tokenAddress?.toLowerCase()}_${tokenId}`;

    const loadingToken  = {
        contractType: "",
        metadata: {
            name: "",
            description: "",
            image: "",
            animation_url: "",
        },
        drop: {
            startDate: 0,
            endDate: 0,
            maxAllowed: 0,
        },
        contractCreator: "",
        mintedSupply: 0,
        price: "0",
        royalty: 0,
        tokenAddress: "",
        tokenId: "",
        type: "",
        cloudflareCdnId: "",
        loading: true,
    };
    

    const [listings, setListings] = useState({
        all: [],
        mine: [],
        cheapest: {},
        loading: true,
    });

    useEffect(() => {
        const collection = collections[collectionId];
        const collectionDrop = collection?.token?.drop;
        if (collection && collectionDrop) {
            const dropState = collection.dropState;
            const startDateInMillisecond = collectionDrop.startDate * 1000;
            const endDateInMillisecond = collectionDrop.endDate * 1000;
            const currentDate = new Date().getTime();

            switch (dropState) {
                case DropState.NotStarted:
                    setMintStatus('Starts in');
                    setMintTime(startDateInMillisecond - currentDate);
                    setShowTimeCounter(true);
                    break;
                case DropState.InProgress:
                    setMintStatus('Minting Ends');
                    setMintTime(endDateInMillisecond - currentDate);
                    setShowTimeCounter(true);
                    break;
                case DropState.SecondaryListingsActive:
                case DropState.SecondaryListingsNone:
                case DropState.SoldOut:
                    setMintStatus('Minting Ends');
                    setMintTime(0);
                    setShowTimeCounter(false);
                    break;
                default:
                    break;
            }
        } 
    }, [collections])

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCollectionLoading(true);
                await fetchCollection(tokenAddress, tokenId);
            } catch (error) {
                console.error("Error fetching collections:", error);
            } finally {
                setCollectionLoading(false);
            }
        };
        fetchData();
    }, [claimNftTrigger]);

    useEffect(() => {
        const fetchSupply = async () => {
            if(address) {
                try {
                    setSupplyLoading(true);
                    await fetchOwnNfts(tokenAddress, tokenId, address);
                } catch(error) {
                    console.log(error);
                } finally {
                    setSupplyLoading(false);
                }
            }
        };
        fetchSupply();
    }, [address, claimNftTrigger, tokenAddress, tokenId]);

    useEffect(() => {
        // Check if all fetch operations are completed
        if (!collectionLoading && !supplyLoading && collections) {
            // If all fetch operations are completed, set loading to false
            setLoading(false);
            setCollection(collections[collectionId])
            setUserToken(users[address]?.collections[collectionId])
        }
    }, [collectionLoading, supplyLoading, collections]);
    
    return (
        <>
            <Description
                collection={collection}
                userToken={userToken}
                loading={loading}
            >
                <Details 
                    collection={collection}
                    userToken={userToken}
                    loading={loading}
                />
            </Description>
        </>
    );
};

export default MintNFTPage;
