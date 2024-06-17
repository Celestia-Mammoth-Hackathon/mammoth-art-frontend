import { simpleERC1155UpgradeableABI } from '@/abi/SimpleERC1155Upgradeable.abi';
import { useContractRead } from 'wagmi';

type useReadMintedSupplyProps = {
    tokenId: string,
    contractAddress: any,
    contractType: any,
};

const useReadMintedSupply = ({ tokenId, contractAddress, contractType }: useReadMintedSupplyProps) => {
    const abi:any = simpleERC1155UpgradeableABI;

    // Fetch claim condition data
    const { data: mintedSupply, isError: isMintedSupplyError, isLoading: isMintedSupplyLoading, refetch: refetchMintedSupply, isRefetching: isMintedSupplyRefetching } = useContractRead({
        address: contractAddress,
        abi,
        functionName: 'totalSupply',
    });

    return { isMintedSupplyLoading, isMintedSupplyError, mintedSupply, refetchMintedSupply, isMintedSupplyRefetching };
};

export default useReadMintedSupply;