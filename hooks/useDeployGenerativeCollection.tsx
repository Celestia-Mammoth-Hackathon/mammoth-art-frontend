import { useTransactionReceipt, useWriteContract, useDeployContract } from 'wagmi';
import { useUserContext } from 'context/user';
import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';
import ERC1967Proxy from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts-v5/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';
import { useEffect } from 'react';
import { ethers } from "ethers";
import { writeContract } from 'viem/actions';
import { useCollectionContext } from 'context/collection';

const IMPLEMENTATION_ADDRESS = process.env.NEXT_PUBLIC_GENERATIVE_ERC721_IMPLEMENTATION_ADDRESS || "0xB7bF8FcBd1afFD5D28C9B3Cd365b355da5E549B6";

type UseDeployGenerativeCollectionProps = {
  collectionName: string;
  collectionDescription: string;
  collectionImageCid: string;
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
  collectionDescription,
  collectionImageCid,
  symbol,
  collectionSize,
  royaltyRecipient,
  royaltyFee,
  placeholderMetadata,
  revealMetadata,
  influencingNFTs
}: UseDeployGenerativeCollectionProps) => {
  const { data: setPlaceHolderMetadataDataTxHash, status: setPlaceHolderMetadataStatus, writeContract: writePlaceHolderMetadataContract } = useWriteContract();
  const { data: setRevealMetadataDataTxHash, status: setRevealMetadataStatus, writeContract: writeRevealMetadataContract } = useWriteContract();
  const { data: setInfluencingNFTsDataTxHash, status: setInfluencingNFTsStatus, writeContract: writeInfluencingNFTsContract } = useWriteContract();
  const { data: setContractMetadataDataTxHash, status: setContractMetadataStatus, error: setContractMetadataError, writeContract: writeContractMetadataContract } = useWriteContract();
  const { address } = useUserContext();
  const { setCollectionData, collectionData, saveDataToLocalStorage } = useCollectionContext();
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
    if (proxyDeployStatus === 'success' && proxyDeployReceipt?.contractAddress && !setPlaceHolderMetadataDataTxHash) {
      if (collectionName && collectionDescription && collectionImageCid) {
        writeContractMetadataContract({
          address: proxyDeployReceipt?.contractAddress as `0x${string}`,
          abi: [
            {
              "name": "setContractMetadata",
              "type": "function",
              "stateMutability": "nonpayable",
              "inputs": [
                {
                  "components": [
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "description", "type": "string" },
                    { "internalType": "string", "name": "image", "type": "string" },
                    { "internalType": "string", "name": "externalLink", "type": "string" },
                    { "internalType": "string[]", "name": "collaborators", "type": "string[]" }
                  ],
                  "internalType": "struct StdContractMetadata",
                  "name": "_data",
                  "type": "tuple"
                }
              ],
              "outputs": [],
            }
            ],
            functionName: 'setContractMetadata',
            args: [{
              name: collectionName,
              description: collectionDescription, 
              image: `ipfs://${collectionImageCid}`,
              externalLink: "",
              collaborators: []
            }]
        });
      }
      if (placeholderMetadata) {
        writePlaceHolderMetadataContract({
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

  useEffect(() => {
    if (proxyDeployStatus === 'success' && proxyDeployReceipt?.contractAddress) {
      setCollectionData({
        ...collectionData,
        contractAddress: proxyDeployReceipt?.contractAddress,
      });
      saveDataToLocalStorage({
        contractAddress: proxyDeployReceipt?.contractAddress,
      });
    }
  }, [proxyDeployStatus, proxyDeployReceipt]);

  useEffect(() => {
    if (setPlaceHolderMetadataStatus === 'success') {
      setCollectionData({
        ...collectionData,
        placeholderMetadataStatus: true,
      });
      saveDataToLocalStorage({
        placeholderMetadataStatus: true,
      });
    }
  }, [setPlaceHolderMetadataStatus]);

  useEffect(() => {
    if (setRevealMetadataStatus === 'success') {
      setCollectionData({
        ...collectionData,
        revealMetadataStatus: true,
      });
      saveDataToLocalStorage({
        revealMetadataStatus: true,
      });
    }
  }, [setRevealMetadataStatus]);

  useEffect(() => {
    if (setInfluencingNFTsStatus === 'success') {
      setCollectionData({
        ...collectionData,
        influencingNFTsStatus: true,
      });
      saveDataToLocalStorage({
        influencingNFTsStatus: true,
      });
    }
  }, [setInfluencingNFTsStatus]);

  useEffect(() => {
    if (setContractMetadataStatus === 'success') {
      setCollectionData({
        ...collectionData,
        contractMetadataStatus: true,
      }); 
      saveDataToLocalStorage({
        contractMetadataStatus: true,
      });
    }
  }, [setContractMetadataStatus]);

  const setPlaceHolderMetadata = (contractAddress: string) => {  
    if (placeholderMetadata) {
      writePlaceHolderMetadataContract({
        address: contractAddress as `0x${string}`,
        abi: generativeERC721Upgradeable.abi,
        functionName: 'setPlaceholderMetadata',
        args: [JSON.stringify(placeholderMetadata)],
      });
    }
  }

  const setRevealMetadata = (contractAddress: string) => {
    if (revealMetadata) {
      writeRevealMetadataContract({
        address: contractAddress as `0x${string}`,
        abi: generativeERC721Upgradeable.abi,
        functionName: 'setRevealPlaceholderMetadata',
        args: [revealMetadata._metadata],
      });
    }
  }
  
  const setInfluencingNFTs = (contractAddress: string) => {
    if (influencingNFTs.length > 0) {
      const tokenAddresses = influencingNFTs.map((nft: any) => nft[0]);
      const tokenIds = influencingNFTs.map((nft: any) => nft[1]);

      writeInfluencingNFTsContract({
        address: contractAddress as `0x${string}`,
        abi: generativeERC721Upgradeable.abi,
        functionName: 'setInfluencingNFTs',
        args: [tokenAddresses, tokenIds],
      });
    }
  }

  const setContractMetadata = (contractAddress: string) => {
    if (collectionName && collectionDescription && collectionImageCid) {

      writeContractMetadataContract({
        address: contractAddress as `0x${string}`,
        abi: [
          {
            "name": "setContractMetadata",
            "type": "function",
            "stateMutability": "nonpayable",
            "inputs": [
              {
                "components": [
                  { "internalType": "string", "name": "name", "type": "string" },
                  { "internalType": "string", "name": "description", "type": "string" },
                  { "internalType": "string", "name": "image", "type": "string" },
                  { "internalType": "string", "name": "externalLink", "type": "string" },
                  { "internalType": "string[]", "name": "collaborators", "type": "string[]" }
                ],
                "internalType": "struct StdContractMetadata",
                "name": "_data",
                "type": "tuple"
              }
            ],
            "outputs": [],
          }
          ],
          functionName: 'setContractMetadata',
          args: [{
            name: collectionName,
            description: collectionDescription, 
            image: `ipfs://${collectionImageCid}`,
            externalLink: "",
            collaborators: []
          }]
      });
    }
  }

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
      return proxyDeployReceipt?.contractAddress;
    } catch (error) {
      console.error('Deployment error:', error);
      throw error;
    }
  };

  return {
    contractAddress: proxyDeployReceipt?.contractAddress,
    isProxyDeployed: proxyDeployStatus === 'success' && proxyReceiptStatus === 'success',
    isSetUpPlaceHolderMetadataSuccess:  setPlaceHolderMetadataStatus === 'success',
    isSetUpContractMetadataSuccess: setContractMetadataStatus === 'success',
    isSetUpRevealMetadataSuccess: setRevealMetadataStatus === 'success',
    isSetUpInfluencingNFTsSuccess: setInfluencingNFTsStatus === 'success',
    isSetUpAllSuccess: proxyDeployStatus === 'success' && proxyReceiptStatus === 'success' && setPlaceHolderMetadataStatus === 'success' && setRevealMetadataStatus === 'success' && setInfluencingNFTsStatus === 'success',
    deployTxHash: proxyDeployTxHash,
    deployStatus: proxyDeployStatus,
    setPlaceHolderMetadataStatus: setPlaceHolderMetadataStatus,
    setRevealMetadataStatus: setRevealMetadataStatus,
    setInfluencingNFTsStatus: setInfluencingNFTsStatus,
    setContractMetadataStatus: setContractMetadataStatus,
    deployCollection: deployCollection,
    setPlaceHolderMetadata: setPlaceHolderMetadata,
    setRevealMetadata: setRevealMetadata,
    setInfluencingNFTs: setInfluencingNFTs,
    setContractMetadata: setContractMetadata,
  };
};

export default useDeployGenerativeCollection;
