import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';
import { chainId } from "@/constants/details";

type useTransferNFTProps = {
    item: any,
    address:string, 
    toAddress:string, 
    transferAmount: number, 
    visibleTransferMenu:boolean, 
    setVisibleTransferMenu: any, 
    response: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any,
};

const useTransferNFT = ({
    item, 
    address,
    toAddress, 
    transferAmount, 
    visibleTransferMenu, 
    setVisibleTransferMenu, 
    response,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger
}: useTransferNFTProps) => {
    const claimConfig = {
        _from: address,
        _to: toAddress,
        _ids: [item.tokenId],
        _values: [transferAmount],
        _data: ""
    };

    const args =  [
        claimConfig._from,
        claimConfig._to,
        claimConfig._ids,
        claimConfig._values,
        claimConfig._data
    ];

    const { config } = usePrepareContractWrite({
        address: item.tokenAddress,
        abi: simpleERC1155UpgradeableABI,
        functionName: 'safeBatchTransferFrom',
        args: args,
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
            setVisibleTransferMenu(true);     
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
