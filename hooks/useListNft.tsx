import { useEffect } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { simpleMarketplaceUpgradeableABI } from '@/abi/SimpleMarketplaceUpgradeable.abi';
import { chainId, marketplaceAddress, nativeCurrency } from "@/constants/details";
import useApproveNFT from "@/hooks/useApproveNft";
import { ethers } from "ethers";
import { isValidAmount, isValidPrice } from "../utils";
type useListNFTProps = {
    item: any,
    tokenAddress: string,
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
    item,
    tokenAddress,
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
        item,
        tokenAddress,
        address,
        operator: marketplaceAddress
    });

    const sellConfig = {
        _params: {
            token: {
                tokenAddress: item.tokenAddress,
                tokenId: item.tokenId,
            },
            qty: formattedQty,
            price: formattedPrice,
            recipient: address,
            validFrom: 0,
            validUntil: 0,
        },
    };

    const { data, write, isLoading: isPrepareLoading, isError: isPrepareError } = useContractWrite({
        address: marketplaceAddress,
        abi: simpleMarketplaceUpgradeableABI,
        functionName: 'makeSellOrder',
        chainId: chainId,
        args: [sellConfig._params],
    });

    const { isLoading: isTransactionLoading, isError: isTransactionError } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            handleResponse(data);
        },
        onError(error) {
            handleResponse(error);
        },
    });

    const handleResponse = (response: any) => {
        setResponse(response.status);
        setFetchListingTrigger(!fetchListingTrigger);
        if (setClaimNftTrigger) {
            setClaimNftTrigger(!claimNftTrigger);
        }
    };

    const listNft = async () => {
        try {
            if(!isApproved) {
                await approveNft();
            } else {
                write?.();
            }
        } catch (error) {
            console.error("Error approving NFT:", error);
            setResponse(error);
        }
    };

    useEffect(() => {
        if (isApprovingSuccess) {
            try {
                write?.();
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
        writeListing: write,
    };
};

export default useListNFT;
