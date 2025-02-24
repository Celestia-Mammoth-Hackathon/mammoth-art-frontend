import { useTransactionReceipt, useWriteContract, useDeployContract } from 'wagmi';
import { useUserContext } from 'context/user';
import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';
import ERC1967Proxy from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts-v5/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';
import { useEffect } from 'react';
import { ethers } from "ethers";

const IMPLEMENTATION_ADDRESS = process.env.NEXT_PUBLIC_GENERATIVE_ERC721_IMPLEMENTATION_ADDRESS || "0xB7bF8FcBd1afFD5D28C9B3Cd365b355da5E549B6";

type UseDeployGenerativeCollectionProps = {
  collectionName: string;
  symbol: string;
  collectionSize: number;
  royaltyRecipient: string;
  royaltyFee: number;
  placeholderMetadata: {
    name: string;
    description: string;
    image: string;
    tags?: string[];
  };
  revealMetadata: {
    _metadata: string;
  };
  influencingNFTs: [];
};

const useDeployGenerativeCollection = ({ 
  collectionName,
  symbol,
  collectionSize,
  royaltyRecipient,
  royaltyFee,
  placeholderMetadata,
  revealMetadata,
  influencingNFTs
}: UseDeployGenerativeCollectionProps) => {
  const { data: setPlaceHolderMetadataDataTxHash, status: setPlaceHolderMetadataStatus, writeContract } = useWriteContract();
  const { data: setRevealMetadataDataTxHash, status: setRevealMetadataStatus, writeContract: writeRevealMetadataContract } = useWriteContract();
  const { data: setInfluencingNFTsDataTxHash, status: setInfluencingNFTsStatus, writeContract: writeInfluencingNFTsContract } = useWriteContract();
  const { address } = useUserContext();

  // Hook for deploying the proxy contract
  const { data: proxyDeployTxHash, deployContract: deployProxyContract, status: proxyDeployStatus } = useDeployContract();
  const { data: proxyDeployReceipt, status: proxyReceiptStatus } = useTransactionReceipt({
    hash: proxyDeployTxHash,
    query: {
      enabled: Boolean(proxyDeployTxHash),
    },
  });

  // After the proxy is deployed, call setPlaceholderMetadata if placeholderMetadata is provided
  useEffect(() => {
    console.log(proxyDeployReceipt)
    if (proxyDeployStatus === 'success' && proxyDeployReceipt?.contractAddress && !setPlaceHolderMetadataDataTxHash) {
      if (placeholderMetadata) {
        writeContract({
          address: proxyDeployReceipt.contractAddress as `0x${string}`,
          abi: generativeERC721Upgradeable.abi,
          functionName: 'setPlaceholderMetadata',
          args: [JSON.stringify(placeholderMetadata)],
        });
      }
      if (revealMetadata) {
        writeRevealMetadataContract({
          address: proxyDeployReceipt.contractAddress as `0x${string}`,
          abi: generativeERC721Upgradeable.abi,
          functionName: 'setRevealPlaceholderMetadata',
          args: [revealMetadata._metadata],
        });
      }
      if (influencingNFTs.length > 0) {
        // Split the arrays into separate tokenAddresses and tokenIds arrays
        const tokenAddresses = influencingNFTs.map((nft: any) => nft[0]);
        const tokenIds = influencingNFTs.map((nft: any) => nft[1]);

        writeInfluencingNFTsContract({
          address: proxyDeployReceipt.contractAddress as `0x${string}`,
          abi: generativeERC721Upgradeable.abi,
          functionName: 'setInfluencingNFTs',
          args: [tokenAddresses, tokenIds],
        });
      }
    }
  }, [proxyDeployStatus, proxyDeployReceipt]);

  // Deploy only the proxy contract using the existing implementation
  const deployCollection = async () => {
    if (!address) return;
    
    try {
      // Prepare the initializer call data
      const iface = new ethers.utils.Interface(generativeERC721Upgradeable.abi);

      const initData = iface.encodeFunctionData("initialize", [
        collectionName,
        symbol,
        ethers.BigNumber.from(Number(collectionSize)),
        address,
        royaltyRecipient,
        ethers.BigNumber.from(Number(royaltyFee))
      ]);

      // const initData = iface.encodeFunctionData("initialize", [
      //   "MAMMOTH",
      //   "MAMMOTH",
      //   ethers.BigNumber.from(100),
      //   address,
      //   address,
      //   ethers.BigNumber.from(100)
      // ]);

      // Deploy the proxy contract
      deployProxyContract({
        abi: ERC1967Proxy.abi,
        bytecode: ERC1967Proxy.bytecode as `0x${string}`,
        args: [IMPLEMENTATION_ADDRESS, initData],
      });
    } catch (error) {
      console.error('Deployment error:', error);
      throw error;
    }
  };

  return {
    contractAddress: proxyDeployReceipt?.contractAddress,
    isProxyDeployed: proxyDeployStatus === 'success' && proxyReceiptStatus === 'success',
    isSetUpPlaceHolderMetadata:  setPlaceHolderMetadataStatus === 'success',
    isSetUpRevealMetadata: setRevealMetadataStatus === 'success',
    isSetUpInfluencingNFTs: setInfluencingNFTsStatus === 'success',
    deployTxHash: proxyDeployTxHash,
    deployStatus: proxyDeployStatus,
    setPlaceHolderMetadataStatus: setPlaceHolderMetadataStatus,
    setRevealMetadataStatus: setRevealMetadataStatus,
    setInfluencingNFTsStatus: setInfluencingNFTsStatus,
    deployCollection,
  };
};

export default useDeployGenerativeCollection;
