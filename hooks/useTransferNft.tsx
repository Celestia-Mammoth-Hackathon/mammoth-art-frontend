import { useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';
import { IERC721ABI } from '@/abi/IERC721';
import { chainId } from "@/constants/details";

type useTransferNFTProps = {
    tokenAddress: string;
    tokenId: string;
    tokenType: string;
    address:string,
    toAddress:string,
    transferAmount?: number,
    setVisibleTransferMenu: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
};

const useTransferNFT = ({
    tokenAddress,
    tokenId,
    tokenType,
    address,
    toAddress,
    transferAmount,
    setVisibleTransferMenu,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger
}: useTransferNFTProps) => {

    if (tokenType === 'ERC721') {
        return useERC721Transfer({
            tokenAddress,
            tokenId,
            tokenType,
            address,
            toAddress,
            setVisibleTransferMenu,
            setResponse,
            claimNftTrigger,
            setClaimNftTrigger
        });
    }

    const handleResponse = (response:any) => {
        try {
            console.log("Transfer NFT successfully:", response);
        } catch (error) {
            console.error("Error transferring:", error);
        } finally {
            setResponse(status);
            setVisibleTransferMenu(undefined);
            setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger)
        }
    };

    const { data, status, writeContract, isPending: isPrepareLoading } = useWriteContract();
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

    const transferNft = async () => {
        try {
            writeContract({
                address: tokenAddress as `0x${string}`,
                abi: simpleERC1155UpgradeableABI,
                functionName: 'safeBatchTransferFrom',
                // from, to, ids, values, data
                args: [address, toAddress, [tokenId], [transferAmount], ""],
            })
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isTransferLoading : isTransactionLoading || isPrepareLoading,
        isTransferError: isTransactionError,
        transferNft,
        transferHash: data,
    };
};

const useERC721Transfer = ({
    tokenAddress,
    tokenId,
    address,
    toAddress,
    setVisibleTransferMenu,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger
}: useTransferNFTProps) => {
    const handleResponse = (response:any) => {
        try {
            console.log("Transfer NFT successfully:", response);
        } catch (error) {
            console.error("Error transferring:", error);
        } finally {
            setResponse(status);
            setVisibleTransferMenu(undefined);
            setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger)
        }
    };

    const { data, status, writeContract, isPending: isPrepareLoading } = useWriteContract();
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

    const transferNft = async () => {
        try {
            writeContract({
                address: tokenAddress as `0x${string}`,
                abi: IERC721ABI,
                functionName: 'safeTransferFrom',
                // from, to, tokenId
                args: [address as `0x${string}`, toAddress as `0x${string}`, BigInt(tokenId)],
            });
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isTransferLoading : isTransactionLoading || isPrepareLoading,
        isTransferError: isTransactionError,
        transferNft,
        transferHash: data,
    };
};

export default useTransferNFT;
