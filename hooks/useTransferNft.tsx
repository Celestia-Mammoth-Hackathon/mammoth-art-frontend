import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
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

    const { config } = usePrepareContractWrite({
        address: tokenAddress as `0x${string}`,
        abi: simpleERC1155UpgradeableABI,
        functionName: 'safeBatchTransferFrom',
        // from, to, ids, values, data
        args: [address, toAddress, [tokenId], [transferAmount], ""],
        chainId: chainId,
        onError(error) {
            console.error(error.message)
        },
    });

    const { data, status, write, isLoading: isPrepareLoading  } = useContractWrite(config);
    const { isLoading: isTransactionLoading, isError: isTransactionError } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            handleResponse(data);
        },
        onError(error) {
            handleResponse(error);
        },
    });

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

    const transferNft = async () => {
        try {
            write?.();
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isTransferLoading : isTransactionLoading || isPrepareLoading,
        isTransferError: isTransactionError,
        transferNft,
        writeTransferring: write,
        transferHash: data?.hash
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
    const { config } = usePrepareContractWrite({
        address: tokenAddress as `0x${string}`,
        abi: IERC721ABI,
        functionName: 'safeTransferFrom',
        // from, to, tokenId
        args: [address as `0x${string}`, toAddress as `0x${string}`, BigInt(tokenId)],
        chainId: chainId,
        onError(error) {
            console.error(error.message)
        },
    });

    const { data, status, write, isLoading: isPrepareLoading  } = useContractWrite(config);
    const { isLoading: isTransactionLoading, isError: isTransactionError } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            handleResponse(data);
        },
        onError(error) {
            handleResponse(error);
        },
    });

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

    const transferNft = async () => {
        try {
            write?.();
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    };

    return {
        isTransferLoading : isTransactionLoading || isPrepareLoading,
        isTransferError: isTransactionError,
        transferNft,
        writeTransferring: write,
        transferHash: data?.hash
    };
};

export default useTransferNFT;
