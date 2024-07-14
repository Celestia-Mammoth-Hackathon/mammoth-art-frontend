import { useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { marketplaceAddress } from "@/constants/details";

type useCancelOrderProps = {
    cancelLoadingId: any,
    setCancelLoadingId: any,
    listings: any,
    setListings: any,
    visibleCancelMenu: any,
    setVisibleCancelMenu: any,
    response: any,
    setResponse: any,
};

const useCancelOrder = ({
    cancelLoadingId,
    setCancelLoadingId,
    listings,
    setListings,
    visibleCancelMenu,
    setVisibleCancelMenu,
    response,
    setResponse,
}: useCancelOrderProps) => {
    const handleResponse = (response:any) => {
        console.log("Response:", response);
        setResponse(status);
        setVisibleCancelMenu(true);
        setCancelLoadingId(null);
    };

    const { data, status, writeContract, isPending: isPrepareLoading } = useWriteContract();
    const { error: txError, isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: data,
    });

    const updateMyListings = () => {
        const updatedListings = listings.mine.filter((listing: any) => listing.id !== cancelLoadingId);
        setListings((prevListings:any) => ({
            ...prevListings,
            mine: updatedListings
        }));
    }

    const cancelOrder = async (listingId: any) => {
        try {
            writeContract({
                address: marketplaceAddress,
                abi: simpleMarketplaceUpgradeableABI,
                functionName: 'cancelOrder',
                args: [ listingId ],
            });
            setCancelLoadingId(listingId);
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    useEffect(() => {
        if (isTransactionError) {
            handleResponse(txError);
        } else if (isTransactionSuccess) {
            handleResponse(data);
        }
    }, [isTransactionError, isTransactionSuccess, txError, data]);

    useEffect(() => {
        if (isTransactionSuccess && !isTransactionLoading) {
            updateMyListings();
        }
    }, [isTransactionSuccess, isTransactionLoading, cancelLoadingId]);

    return {
        isCancelLoading : isTransactionLoading || isPrepareLoading,
        isCancelError: isTransactionError,
        cancelOrder,
    };
};

export default useCancelOrder;
