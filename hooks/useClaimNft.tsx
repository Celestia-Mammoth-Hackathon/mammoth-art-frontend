import { useCallback, useMemo, useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi';
import { parseEther } from "viem";
import { simpleDropUpgradeableABI } from '@/abi/SimpleDropUpgradeable.abi';
import { dropAddress, chainId } from "@/constants/details";
import { ethers } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

type useClaimNFTProps = {
    item: any,
    address:string, 
    mintAmount: number, 
    visibleMintMenu:boolean, 
    setVisibleMintMenu: any, 
    response: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any
};

const handleError = (errorMessage:string) => {
    if (errorMessage) {
        if (errorMessage.includes("The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account")) {
            return "Balance too low to mint.";
        } else if (errorMessage.includes("max mints exceeded")) {
            return "Mint amount exceeds max allowed";
        } else if (errorMessage.includes("not started")) {
            return "Mint has not started yet";
        } else if (errorMessage.includes("Invalid minter")) {
            return "Invalid minter";
        } else if (errorMessage.includes("Invalid tokenId")) {
            return "Invalid tokenId";
        } else if (errorMessage.includes("sold out")) {
            return "Sold out";
        } else if (errorMessage.includes("invalid qty")) {
            return "Invalid qty";
        } 
    }

    return "Error";
};

const useClaimNFT = ({
    item, 
    address, 
    mintAmount, 
    visibleMintMenu, 
    setVisibleMintMenu, 
    response,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger
}: useClaimNFTProps) => {
    const [error, setError] = useState<string>("");
    const [canMerkleMint, setCanMerkleMint] = useState<boolean>(false);
    const pricePerNft = item?.price;
    const tokenId = item?.metadata?.id;

    const claimConfig = {
        _dropId: item.drop.id,
        _qty: mintAmount,
        _recipient: address,
        _merkleProof: [] as string[],
    };

    // check for merkle mint
    const [ proof, merkleDrop ] = useMemo(() => {
        let proof = [] as string[];
        let merkleDrop: any;
        if (item.merkleRoot && item.merkleTree && item.merkleDrops.length > 0 && address) {
            merkleDrop = item.merkleDrops.find((d: any) => d.merkleRoot.toLowerCase() === item.merkleRoot.toLowerCase());
            if (merkleDrop) {
                const tree = StandardMerkleTree.load(item.merkleTree);
                for (const [i, v] of tree.entries()) {
                    if (v[0].toLocaleLowerCase() === address.toLocaleLowerCase()) {
                        proof = tree.getProof(i);
                        break;
                    }
                }
            }
        }
        return [ proof, merkleDrop ];
    }, [item, address]);

    const args = [
        claimConfig._dropId,
        claimConfig._qty,
        claimConfig._recipient,
        claimConfig._merkleProof
    ];

    const pricePerNftBigNumber = ethers.utils.parseEther(pricePerNft.toString());
    const mintAmountBigNumber = ethers.BigNumber.from(mintAmount.toString());

    const value:any = pricePerNftBigNumber.mul(mintAmountBigNumber);
    const valueBigInt = BigInt(value.toString());

    const { config } = usePrepareContractWrite({
        address: dropAddress,
        abi: simpleDropUpgradeableABI,
        functionName: 'mint',
        args: args,
        value: valueBigInt,
        onError(error) {
            console.error(error.message)
            setError(handleError(error.message));
        },
        onSuccess(success) {
            console.log("usePrepareContractWrite success");
            setError("");
        },
    });

    const { data, status, write, isLoading: isPrepareLoading } = useContractWrite(config);


    const { isLoading: isTransactionLoading, isError: isTransactionError } = useWaitForTransaction({
            hash: data?.hash,
            onSuccess(data) {
                handleResponse(data);
            },
            onError(error) {
                handleResponse(error);
            },
        });

    const { config: merkleConfig } = usePrepareContractWrite({
        address: dropAddress,
        abi: simpleDropUpgradeableABI,
        functionName: 'mint',
        args: [ merkleDrop?.id, 1, address, proof ],
        // chainId: chainId,
        value: BigInt(0),
        onError() {
            setCanMerkleMint(false);
        },
        onSuccess() {
            if (merkleDrop && proof.length > 0) {
                setCanMerkleMint(true);
            }
        },
    });
    const { data: merkleData, status: merkleStatus, write: merkleWrite, isLoading: isMerklePrepareLoading } = useContractWrite(merkleConfig);
    const { isLoading: isMerkleTransactionLoading, isError: isMerkleTransactionError } = useWaitForTransaction({
        hash: merkleData?.hash,
        onSuccess(data) {
            handleResponse(data);
        },
        onError(error) {
            handleResponse(error);
        },
    });

    const handleResponse = useCallback((response:any) => {
        try {
            console.log("Mint NFT successfully:", response);
        } catch (error) {
            console.error("Error handling response:", error);
        } finally {
            setResponse(canMerkleMint ? merkleStatus : status);
            setVisibleMintMenu(true);
            setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger)
        }
    }, [canMerkleMint, status, merkleStatus, claimNftTrigger, setClaimNftTrigger, setResponse, setVisibleMintMenu]);

    const claimNFT = useCallback(async () => {
        try {
            canMerkleMint ? merkleWrite?.() : write?.();
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    }, [canMerkleMint, write, merkleWrite, setResponse]);

    return {
        isMintingLoading : isTransactionLoading || isPrepareLoading || isMerklePrepareLoading || isMerkleTransactionLoading,
        isMintingError: isTransactionError || isMerkleTransactionError,
        claimNFT,
        writeMinting: write,
        mintingError: error,
        canMerkleMint
    };
};

export default useClaimNFT;
