import { useState, useEffect } from 'react';
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from "viem";
import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { chainId, marketplaceAddress, nativeCurrency } from "@/constants/details";
import { ethers } from "ethers";

type useBuyOrderProps = {
    item: any,
    address:string, 
    buyAmount: number, 
    visibleBuyMenu:boolean, 
    setVisibleBuyMenu: any, 
    buyLoadingId: any,
    setBuyLoadingId: any,
    response: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
    fetchListingTrigger: boolean,
    setFetchListingTrigger: any
};

const useBuyOrder = ({
    item, 
    address, 
    buyAmount, 
    visibleBuyMenu, 
    setVisibleBuyMenu, 
    buyLoadingId,
    setBuyLoadingId,
    response,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger,
    fetchListingTrigger,
    setFetchListingTrigger,
}: useBuyOrderProps) => {
    const { data, status, write, isLoading: isPrepareLoading } = useContractWrite({
        address: marketplaceAddress,
        abi: simpleMarketplaceUpgradeableABI,
        functionName: 'takeSellOrder',
        chainId: chainId,
        onError(error) {
            console.log(error);
        },
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
        console.log("Buy NFT Response:", response);
        setResponse(status);
        setVisibleBuyMenu(true);     
        setBuyLoadingId(null);
        setFetchListingTrigger(!fetchListingTrigger);
        setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger);
    };

    const buyNft = async (listingId: any, orderPrice: any, quantity: any = 1) => {
        const pricePerNftBigNumber = ethers.BigNumber.from(orderPrice.toString());
        const mintAmountBigNumber = ethers.BigNumber.from(buyAmount.toString());

        const value:any = pricePerNftBigNumber.mul(mintAmountBigNumber);
        const valueBigInt = BigInt(value.toString());

        try {
            const buyConfig = {
                _params: {
                    orderId: parseInt(listingId),
                    qty: quantity,
                    recipient: address,    
                },
            };

            write?.({
                args: [
                    buyConfig._params,
                ],
                value: valueBigInt
            });
            setBuyLoadingId(listingId); 

        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isBuyingLoading : isTransactionLoading || isPrepareLoading,
        isBuyingError: isTransactionError,
        buyNft,
        writeBuying: write,
    };
};

export default useBuyOrder;
