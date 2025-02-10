import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';
import { useWriteContract, useReadContract } from 'wagmi';

type UseRevealGenerativeProps = {
    contractAddress?: `0x${string}`;
    tokenId?: string;
};

const useRevealGenerative = ({ 
    contractAddress,
    tokenId 
}: UseRevealGenerativeProps = {}) => {
    const { 
        data: revealData, 
        status: revealStatus, 
        isError: isRevealError, 
        writeContract, 
        isPending: isRevealLoading 
    } = useWriteContract();

    // Check if token metadata is cemented
    const { 
        data: isMetadataCemented,
        isError: isMetadataCementedError,
        isLoading: isMetadataCementedLoading 
    } = useReadContract({
        address: contractAddress,
        abi: generativeERC721Upgradeable.abi,
        functionName: 'tokenURICemented',
        args: tokenId ? [BigInt(tokenId)] : undefined,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,

    });

    const reveal = async (tokenIds: number[], metadata: string[]) => {
        if (!contractAddress) return;

        writeContract({
            address: contractAddress,
            abi: generativeERC721Upgradeable.abi,
            functionName: 'reveal',
            args: [tokenIds, metadata],
        });
    };

    const setTokenMetadata = async (tokenId: number, metadata: string) => {
        if (!contractAddress) return;

        writeContract({
            address: contractAddress,
            abi: generativeERC721Upgradeable.abi,
            functionName: 'setTokenMetadataRaw',
            args: [tokenId, metadata],
        });
    };

    return {
        // Write operations
        reveal,
        setTokenMetadata,
        revealData,
        revealStatus,
        isRevealError,
        isRevealLoading,

        // Read operations
        isMetadataCemented,
        isMetadataCementedError,
        isMetadataCementedLoading
    };
};

export default useRevealGenerative; 