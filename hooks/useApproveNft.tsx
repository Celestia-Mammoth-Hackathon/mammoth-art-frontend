import { useEffect, useState } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';

type useApproveNFTProps = {
    tokenAddress: any,
    address: any,
    operator: string
};

const useApproveNFT = ({
    tokenAddress,
    address,
    operator
}: useApproveNFTProps) => {
    const [isApproved, setIsApproved] = useState(false);

    // Step 1: Check if already approved
    const { data: approvalStatus, refetch: refetchApprovalStatus } = useReadContract({
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

    const handleResponse = (response: any) => {
        try {
            console.log("Approve NFT successfully:", response);
        } catch (error) {
            console.error("Error handling response:", error);
        }
    };

    const { data, writeContract, isPending: isPrepareLoading } = useWriteContract();
    const { error: txError, isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: data,
    });

    useEffect(() => {
        if (isTransactionError) {
            handleResponse(txError);
        } else if (isTransactionSuccess) {
            handleResponse(data);
            // Refetch approval status after successful transaction
            refetchApprovalStatus();
        }
    }, [isTransactionError, isTransactionSuccess, txError, data]);

    const approveNft = async () => {
        if (!isApproved) {
            try {
                writeContract({
                    address: tokenAddress,
                    abi: simpleERC1155UpgradeableABI,
                    functionName: 'setApprovalForAll',
                    args: [operator, true],
                });
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
        isApprovingSuccess: isTransactionSuccess,
        isApproved,
    };
};

export default useApproveNFT;
