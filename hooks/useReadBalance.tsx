import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';
import { useReadContract } from 'wagmi';

type useReadBalanceProps = {
    address: any,
    tokenId: string,
    contractAddress: any,
    contractType: string,
};

const useReadBalance = ({ address, tokenId, contractAddress, contractType }: useReadBalanceProps) => {
    const abi = simpleERC1155UpgradeableABI;

    // Fetch owned supply data
    const { data: balanceData, isError: isBalanceError, isLoading: isBalanceLoading, refetch: refetchBalance, isRefetching: isBalanceRefetching } = useReadContract({
        address: contractAddress,
        abi,
        functionName: 'balanceOf',
        args: [address, tokenId],
    });


    return { isBalanceLoading, isBalanceError, balanceData, refetchBalance, isBalanceRefetching };
};

export default useReadBalance;