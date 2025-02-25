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

    const reveal = async (collectionAddress: string, collectionSize: number) => {
        if (!contractAddress) return;
        try {
            setIsFetchingRevealMetadata(true);
            const result = await getRevealMetadata(collectionAddress, collectionSize);
            if (!Array.isArray(result)) {
                const { tokenIds, metadata } = result;

                // Convert metadata objects to strings
                const metadataStrings = metadata.map((metadataObj: any) => {
                    // Ensure the metadata object has the required structure
                    const formattedMetadata = {
                        name: metadataObj.name || '',
                        description: metadataObj.description || '',
                        attributes: metadataObj.traits || {},
                        image: metadataObj.image || ''
                    };

                    // Convert to JSON string
                    return JSON.stringify(formattedMetadata);
                });

                writeContract({
                    address: contractAddress,
                    abi: generativeERC721Upgradeable.abi,
                    functionName: 'reveal',
                    args: [tokenIds, metadataStrings], // Pass array of JSON strings
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