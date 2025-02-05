import { generativeERC721UpgradeableABI } from '@/abi/GenerativeERC721Upgradeable';
import { useWriteContract } from 'wagmi';

type UseMintGenerativeProps = {
    contractAddress?: `0x${string}`;
};

const useMintGenerative = ({ contractAddress }: UseMintGenerativeProps = {}) => {
    const { 
        data, 
        status, 
        isError: isMintError, 
        writeContract, 
        isPending: isMintLoading 
    } = useWriteContract();

    const mint = async (to: string, amount: number) => {
        if (!contractAddress) return;
        
        writeContract({
            address: contractAddress,
            abi: generativeERC721UpgradeableABI,
            functionName: 'mint',
            args: [to, amount],
        });
    };

    return { 
        mint,
        isMintError,
        isMintLoading,
        mintStatus: status,
        mintData: data
    };
};

export default useMintGenerative; 