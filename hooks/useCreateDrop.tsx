import { useTransactionReceipt, useWriteContract } from 'wagmi';
import { useUserContext } from 'context/user';
import simpleDropUpgradeable from '@/abi/SimpleDropUpgradeable.json';
import { BigNumber } from 'bignumber.js';
import ERC1967Proxy from '@openzeppelin/upgrades-core/artifacts/@openzeppelin/contracts-v5/proxy/ERC1967/ERC1967Proxy.sol/ERC1967Proxy.json';
import { ethers } from 'ethers';
import generativeERC721Upgradeable from '@/abi/GenerativeERC721Upgradeable.abi.json';

type useCreateDropProps = {
  proxyContractAddress: `0x${string}`;
  recipient: string;
  token: {
    tokenAddress: string;
    tokenId: number;
  };
  maxAllowed: number;
  maxPerWallet: number;
  maxPerToken: number;
  maxPerBlock: number;
  reserves: number;
  startDate: Date;
  endDate: Date;
  price: number;
  merkleRoot?: string;

};

const useCreateDrop = ({ 
  proxyContractAddress,
  recipient,
  token,
  maxAllowed,
  maxPerWallet,
  maxPerToken,
  maxPerBlock,
  reserves,
  startDate,
  endDate,
  price,


  merkleRoot = "0x0000000000000000000000000000000000000000000000000000000000000000"
}: useCreateDropProps) => {
  const { address } = useUserContext();
  
  // Hook for creating the drop
  const { 
    data: createDropTxHash, 
    writeContract,
    status: createDropStatus,
    isError: isCreateDropError,
    isPending: isCreateDropPending
  } = useWriteContract();

  // Hook for transaction receipt of drop creation
  const { 
    data: createDropReceipt,
    isSuccess: isCreateDropSuccess 
  } = useTransactionReceipt({
    hash: createDropTxHash,
    query: {
      enabled: Boolean(createDropTxHash),
    },
  });

  // Add new hook for granting minter role
  const { 
    data: grantMinterTxHash,
    writeContract: grantMinterRole,
    status: grantMinterStatus,
    isError: isGrantMinterError,
    isPending: isGrantMinterPending
  } = useWriteContract();

  // Add transaction receipt hook for minter role
  const {
    data: grantMinterReceipt,
    isSuccess: isGrantMinterSuccess
  } = useTransactionReceipt({
    hash: grantMinterTxHash,
    query: {
      enabled: Boolean(grantMinterTxHash),
    },
  });

  // Create a drop after contract is deployed
  const createDrop = async () => {
    if (!address || !grantMinterReceipt?.contractAddress) return;
    
    try {
      // const dropConfig = {
      //   recipient: recipient,
      //   token: {
      //     tokenAddress: token.tokenAddress,
      //     tokenId: token.tokenId,
      //   },
      //   maxAllowed: maxAllowed,
      //   maxPerWallet: maxPerWallet,
      //   maxPerBlock: maxPerBlock,
      //   maxPerToken: maxPerToken,
      //   reserves: reserves,
      //   startDate: Math.floor(startDate.getTime() / 1000),
      //   endDate: Math.floor(endDate.getTime() / 1000),
      //   price: new BigNumber(price).times(new BigNumber(10).pow(18)).toFixed(),
      //   merkleRoot,
      // };
      
      const dropConfig = {
        recipient: "0x45BE33bFD6fC8D4448B7FA603Db753A5f69a29f3", // recipient of drop mint revenue
        token: {
          tokenAddress: "0x063eA336c397d8112bcd7707164148cCCBEfB218",
          tokenId: 0,
        },
        maxAllowed: 0,    // 0 mean unlimited
        maxPerWallet: 0,  // 0 mean unlimited
        maxPerToken: 0, // 0 mean unlimited
        maxPerBlock: 0, // 0 mean unlimited,
        reserves: 0, // 0 mean unlimited,
        startDate: Math.floor(new Date('2025-06-18T00:00:00Z').getTime() / 1000),
        endDate: Math.floor(new Date('2025-06-22T00:00:00Z').getTime() / 1000),
        price: new BigNumber(0.1).times(new BigNumber(10).pow(18)).toFixed(),
        // merkleRoot: ethers.encodeBytes32String(""), // no merkle root mints yet
        merkleRoot: "", // no merkle root mints yet,
      }

      writeContract({
        address: grantMinterReceipt.contractAddress as `0x${string}`,
        abi: simpleDropUpgradeable.abi,
        functionName: 'createDrop',
        args: [dropConfig],
      });

    } catch (error) {
      console.error('Drop creation error:', error);
      throw error;
    }
  };

  // Add function to grant minter role
  const grantMinterRoleToImplementation = async () => {
    if (!address) return;
    
    try {
      grantMinterRole({
        address: proxyContractAddress,
        abi: generativeERC721Upgradeable.abi,
        functionName: 'grantMinter',
        args: [process.env.NEXT_PUBLIC_SIMPLE_DROP_IMPLEMENTATION_ADDRESS as `0x${string}`],
      });
    } catch (error) {
      console.error('Grant minter role error:', error);
      throw error;
    }
  };

  return {
    // Add minter role status
    isGrantMinterSuccess,
    grantMinterTxHash,
    grantMinterStatus,
    isGrantMinterError,
    isGrantMinterPending,

    // Drop creation status
    dropContractAddress: createDropReceipt?.contractAddress,
    isDropCreated: createDropStatus === 'success' && isCreateDropSuccess,
    createDropTxHash,
    createDropStatus,
    isCreateDropError,
    isCreateDropPending,

    // Functions
    createDrop,
    grantMinterRoleToImplementation,
  };
};

export default useCreateDrop;
