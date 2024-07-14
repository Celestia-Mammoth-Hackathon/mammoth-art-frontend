import { useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { parseEther } from "viem";
import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { chainId, marketplaceAddress, nativeCurrency } from "@/constants/details";
import { ethers } from "ethers";
import { set } from 'lodash';
import { write } from 'fs';

type useBuyOrderProps = {
    address:string,
    buyAmount: number,
    setVisibleBuyMenu: any,
    setBuyLoadingId: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
    fetchListingTrigger: boolean,
    setFetchListingTrigger: any,
    setInsufficientFunds: any,
};

const useBuyOrder = ({
    address,
    buyAmount,
    setVisibleBuyMenu,
    setBuyLoadingId,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger,
    fetchListingTrigger,
    setFetchListingTrigger,
    setInsufficientFunds,
}: useBuyOrderProps) => {
    const handleResponse = (response:any) => {
        setResponse(status);
        setVisibleBuyMenu(true);
        setBuyLoadingId(null);
        setFetchListingTrigger(!fetchListingTrigger);
        setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger);
    };

    const { data, status, error: writeError, writeContract, isPending: isPrepareLoading } = useWriteContract();
    const { error: txError, isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: data,
    });

    useEffect(() => {
        if (writeError && writeError.message.includes("The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.")) {
            setInsufficientFunds(true);
        }
    }, [writeError]);

    useEffect(() => {
        if (isTransactionError) {
            handleResponse(txError);
        } else if (isTransactionSuccess) {
            handleResponse(data);
        }
    }, [isTransactionError, isTransactionSuccess, txError, data]);

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

            writeContract({
                address: marketplaceAddress,
                abi: simpleMarketplaceUpgradeableABI,
                functionName: 'takeSellOrder',
                args: [ buyConfig._params ],
                value: valueBigInt,
            });
            setBuyLoadingId(listingId);

        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isBuyingLoading: isTransactionLoading || isPrepareLoading,
        isBuyingError: isTransactionError,
        buyNft,
    };
};

export default useBuyOrder;
