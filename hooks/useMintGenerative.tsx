import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';
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
            abi: generativeERC721Upgradeable.abi,
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