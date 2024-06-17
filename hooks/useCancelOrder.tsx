import { useState, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { chainId } from "@/constants/details";
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
    const { data, status, write, isLoading: isPrepareLoading } = useContractWrite({
        address: marketplaceAddress,
        abi: simpleMarketplaceUpgradeableABI,
        functionName: 'cancelOrder',
        chainId: chainId,
    });
    const { isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            handleResponse(data);
        },
        onError(error) {
            handleResponse(error);
        },
    });

    const handleResponse = (response:any) => {
        console.log("Response:", response);
        setResponse(status);
        setVisibleCancelMenu(true);
        setCancelLoadingId(null);
    };

    const updateMyListings = () => {
        const updatedListings = listings.mine.filter((listing: any) => listing.id !== cancelLoadingId);
        setListings((prevListings:any) => ({
            ...prevListings,
            mine: updatedListings
        }));
    }

    const cancelOrder = async (listingId: any) => {
        try {
            write?.({
                args: [
                    listingId
                ],
            });
            setCancelLoadingId(listingId); 
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };
    
    useEffect(() => {
        if (isTransactionSuccess && !isTransactionLoading) {
            updateMyListings();
        }
    }, [isTransactionSuccess, isTransactionLoading, cancelLoadingId]);

    return {
        isCancelLoading : isTransactionLoading || isPrepareLoading,
        isCancelError: isTransactionError,
        cancelOrder,
        writeCanceling: write,
    };
};

export default useCancelOrder;
