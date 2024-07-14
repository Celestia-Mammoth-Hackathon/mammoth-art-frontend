import { useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { marketplaceAddress, nativeCurrency } from "@/constants/details";
import useApproveNFT from "@/hooks/useApproveNft";
import { ethers } from "ethers";
import { isValidAmount, isValidPrice } from "../utils";

type useListNFTProps = {
    tokenAddress: string,
    tokenId: string;
    address: string,
    listAmount: string,
    listPrice: string,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
    fetchListingTrigger: boolean,
    setFetchListingTrigger: any
};

const useListNFT = ({
    tokenAddress,
    tokenId,
    address,
    listAmount,
    listPrice,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger,
    fetchListingTrigger,
    setFetchListingTrigger
}: useListNFTProps) => {
    const formattedPrice = isValidPrice(listPrice)
        ? ethers.utils.parseUnits(listPrice.trim(), nativeCurrency.decimals)
        : null;

    const formattedQty = isValidAmount(listAmount)
        ? ethers.BigNumber.from(parseInt(listAmount.trim()))
        : null;

    const { isApprovingLoading, approveNft, isApproved, isApprovingSuccess } = useApproveNFT({
        tokenAddress,
        address,
        operator: marketplaceAddress
    });

    const sellConfig = {
        _params: {
            token: {
                tokenAddress: tokenAddress,
                tokenId: tokenId,
            },
            qty: formattedQty,
            price: formattedPrice,
            recipient: address,
            validFrom: 0,
            validUntil: 0,
        },
    };

    const handleResponse = (response: any) => {
        setResponse(response.status);
        setFetchListingTrigger(!fetchListingTrigger);
        if (setClaimNftTrigger) {
            setClaimNftTrigger(!claimNftTrigger);
        }
    };

    const { data, status, isError: isPrepareError, writeContract, isPending: isPrepareLoading } = useWriteContract();
    const { error: txError, isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: data,
    });

    useEffect(() => {
        if (isTransactionError) {
            handleResponse(txError);
        } else if (isTransactionSuccess) {
            handleResponse(data);
        }
    }, [isTransactionError, isTransactionSuccess, txError, data]);

    const listNft = async () => {
        try {
            if(!isApproved) {
                await approveNft();
            } else {
                writeContract({
                    address: marketplaceAddress,
                    abi: simpleMarketplaceUpgradeableABI,
                    functionName: 'makeSellOrder',
                    args: [sellConfig._params],
                });
            }
        } catch (error) {
            console.error("Error approving NFT:", error);
            setResponse(error);
        }
    };

    useEffect(() => {
        if (isApprovingSuccess) {
            try {
                writeContract({
                    address: marketplaceAddress,
                    abi: simpleMarketplaceUpgradeableABI,
                    functionName: 'makeSellOrder',
                    args: [sellConfig._params],
                });
            } catch (error) {
                console.error("Error initiating transaction:", error);
                setResponse(error);
            }
        }
    }, [isApprovingSuccess]);

    return {
        isListingLoading: isTransactionLoading || isPrepareLoading,
        isApprovingLoading,
        isListingError: isTransactionError || isPrepareError,
        listNft,
    };
};

export default useListNFT;
