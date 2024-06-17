import { useEffect, useState } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';

type useApproveNFTProps = {
    item: any,
    tokenAddress: any,
    address: any,
    operator: string
};

const useApproveNFT = ({
    item, 
    tokenAddress,
    address,
    operator
}: useApproveNFTProps) => {
    const [isApproved, setIsApproved] = useState(false);

    // Step 1: Check if already approved
    const { data: approvalStatus, refetch: refetchApprovalStatus } = useContractRead({
        address: tokenAddress,
        abi: simpleERC1155UpgradeableABI,
        functionName: 'isApprovedForAll',
        args: [address, operator],
    });

    useEffect(() => {
        if (approvalStatus !== undefined) {
            setIsApproved(approvalStatus as boolean);
        }
    }, [approvalStatus]);

    // Step 2: Prepare for approval if not already approved
    const { config, error: prepareError } = usePrepareContractWrite({
        address: tokenAddress,
        abi: simpleERC1155UpgradeableABI,
        functionName: 'setApprovalForAll',
        args: [operator, true],
    });

    const { data, status, write, isLoading: isPrepareLoading } = useContractWrite(config);

    const { isLoading: isTransactionLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            handleResponse(data);
            // Refetch approval status after successful transaction
            refetchApprovalStatus();
        },
        onError(error) {
            handleResponse(error);
        },
    });

    const handleResponse = (response: any) => {
        try {
            console.log("Approve NFT successfully:", response);
        } catch (error) {
            console.error("Error handling response:", error);
        }
    };

    const approveNft = async () => {
        if (!isApproved) {
            try {
                write?.();
            } catch (error) {
                console.error("Error initiating transaction:", error);
            }
        } else {
            console.log("Already approved for operator:", operator);
        }
    };

    return {
        isApprovingLoading: isTransactionLoading || isPrepareLoading,
        approveNft,
        isApprovingSuccess: isSuccess,
        isApproved,
        prepareError
    };
};

export default useApproveNFT;
