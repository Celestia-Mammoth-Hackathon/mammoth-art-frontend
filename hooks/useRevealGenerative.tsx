import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';
import { getRevealMetadata } from '@/utils/nft';
import { useState } from 'react';
import { useWriteContract, useReadContract } from 'wagmi';

type UseRevealGenerativeProps = {
    contractAddress?: `0x${string}`;
    tokenId?: string;
};

const useRevealGenerative = ({ 
    contractAddress,
    tokenId 
}: UseRevealGenerativeProps = {}) => {
    const [isFetchingRevealMetadata, setIsFetchingRevealMetadata] = useState(false);
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

    const reveal = async (collectionAddress: string, collectionSize: string) => {
        if (!contractAddress) return;
        try {
            setIsFetchingRevealMetadata(true);
            const result = await getRevealMetadata(collectionAddress, "1");
            if (!Array.isArray(result)) {
                const { tokenIds, metadata } = result;
                writeContract({
                    address: contractAddress,
                    abi: generativeERC721Upgradeable.abi,
                    functionName: 'reveal',
                    args: [tokenIds, metadata],
                });
            }
        } catch (error) {
            console.error("Error revealing tokens:", error);
        } finally {
            setIsFetchingRevealMetadata(false);
        }
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
        revealLoading: revealStatus === 'pending' || isFetchingRevealMetadata,
        isRevealError,
        isRevealLoading,

        // Read operations
        isMetadataCemented,
        isMetadataCementedError,
        isMetadataCementedLoading
    };
};

export default useRevealGenerative; 