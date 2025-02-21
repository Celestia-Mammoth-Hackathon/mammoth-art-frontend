import { useCallback, useMemo, useState, useEffect } from "react";
import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import { parseGwei } from "viem";
import { simpleDropUpgradeableABI } from '@/abi/SimpleDropUpgradeable.abi';
import { simpleERC1155UpgradeableABI } from "@/abi/SimpleERC1155Upgradeable.abi";
import { dropAddress, chainId } from "@/constants/details";
import { ethers } from "ethers";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { getPrice } from "@/utils/nft";

type useClaimNFTProps = {
    item: any,
    address:string,
    mintAmount: number,
    setVisibleMintMenu: any,
    setResponse: any,
    claimNftTrigger?: boolean,
    setClaimNftTrigger?: any
};

const handleError = (errorMessage:string) => {
    if (errorMessage) {
        if (errorMessage.includes("The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account")) {
            return "Balance too low to mint.";
        } else if (errorMessage.includes("block max mints exceeded")) {
            return "Mint amount exceeds max allowed per transaction";
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
        } else if (errorMessage.includes("Could not verify merkle proof")) {
            return "Not whitelisted";
        }
    }

    return "Error";
};

const useClaimNFT = ({
    item,
    address,
    mintAmount,
    setVisibleMintMenu,
    setResponse,
    claimNftTrigger,
    setClaimNftTrigger
}: useClaimNFTProps) => {
    const [error, setError] = useState<string>("");
    const [canMerkleMint, setCanMerkleMint] = useState<boolean>(false);
    const [mintedTokens, setMintedTokens] = useState<string[]>([]);
    const pricePerNft = item ? getPrice(item) : 0;
    const tokenId = item?.metadata?.id;

    const claimConfig = {
        _dropId: item?.drop?.id,
        _qty: mintAmount,
        _recipient: address || `0x0000000000000000000000000000000000000000`,
        _merkleProof: [] as string[],
    };

    // check for merkle mint
    const [ proof, merkleDrop ] = useMemo(() => {
        let proof = [] as string[];
        let merkleDrop: any;
        if (address && item.merkleDrops && item.merkleDrops.length > 0) {
            if (item.merkleRoot && item.merkleTree) {
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
            } else if (item.merkleRoots && item.merkleRoots.length > 0) {
                for (const m of item.merkleDrops) {
                    const m2 = item.merkleRoots.find((r: any) => r.root.toLowerCase() === m.merkleRoot.toLowerCase());
                    if (m2) {
                        merkleDrop = m;
                        const tree = StandardMerkleTree.load(m2.tree);
                        for (const [i, v] of tree.entries()) {
                            if (v[0].toLocaleLowerCase() === address.toLocaleLowerCase()) {
                                proof = tree.getProof(i);
                                break;
                            }
                        }
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

    const { data: simData, error: simError } = useSimulateContract({
        address: dropAddress,
        abi: simpleDropUpgradeableABI,
        functionName: 'mint',
        args: args,
        value: valueBigInt,
        gas: item?.overrideGas ? item?.overrideGas(mintAmount) : undefined,
    });

    const { data, status, writeContract, isPending: isPrepareLoading } = useWriteContract();
    const { error: txError, isLoading: isTransactionLoading, isError: isTransactionError, isSuccess: isTransactionSuccess } = useWaitForTransactionReceipt({
        hash: data,
    });


    let merkleValue = BigInt(0);
    if (merkleDrop) {
        merkleValue = BigInt(merkleDrop.price) * BigInt(mintAmount);
    }

    const { data: merkleSimData, error: merkleSimError } = useSimulateContract({
        address: dropAddress,
        abi: simpleDropUpgradeableABI,
        functionName: 'mint',
        args: [ merkleDrop?.id || 0, mintAmount, address, proof ],
        value: merkleValue,
        gas: item?.overrideGas ? item?.overrideGas(mintAmount) : undefined,
        maxFeePerGas: parseGwei('20'),
        maxPriorityFeePerGas: parseGwei('1'),
    });

    const { data: merkleData, status: merkleStatus, writeContract: merkleWriteContract, isPending: isMerklePrepareLoading } = useWriteContract();
    const { error: merkleTxError, isLoading: isMerkleTransactionLoading, isError: isMerkleTransactionError, isSuccess: isMerkleTransactionSuccess } = useWaitForTransactionReceipt({
        hash: merkleData,
    });

    const handleResponse = useCallback((response:any) => {
        try {
            console.log("Mint NFT successfully:", response);
            if (response.logs) {
                let mt = [];
                const iface = new ethers.utils.Interface(simpleERC1155UpgradeableABI);
                for (const l of response.logs) {
                    try {
                        const log = iface.parseLog(l);
                        if (log.name == 'TransferSingle') {
                            mt.push(log.args.id.toString());
                        }
                    } catch {}
                }
                setMintedTokens(mt);
            }
        } catch (error) {
            console.error("Error handling response:", error);
        } finally {
            setResponse(canMerkleMint ? merkleStatus : status);
            setVisibleMintMenu(true);
            setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger)
        }
    }, [canMerkleMint, status, merkleStatus, claimNftTrigger, setClaimNftTrigger, setResponse, setVisibleMintMenu]);

    useEffect(() => {
        if (simError) {
            console.error("useSimulateContract", simError.message);
            if (item.drop.id !== merkleDrop?.id) {
                setError(canMerkleMint ? "" : handleError(simError.message));
            }
        } else {
            setError("");
        }
    }, [simError, canMerkleMint]);

    useEffect(() => {
        if (isTransactionError) {
            handleResponse(txError);
        } else if (isTransactionSuccess) {
            handleResponse(data);
        }
    }, [isTransactionError, isTransactionSuccess, txError, data]);

    useEffect(() => {
        if (merkleSimError) {
            console.log("merkle mint error", merkleSimError.message);
            setCanMerkleMint(false);
            if (item.drop.id === merkleDrop?.id) {
                setError(handleError(merkleSimError.message));
            }
        } else if (merkleDrop && proof.length > 0) {
            setCanMerkleMint(true);
            if (item.drop.id === merkleDrop?.id) {
                setError("");
            }
        }
    }, [item, merkleSimError, merkleDrop, proof]);

    useEffect(() => {
        if (isMerkleTransactionError) {
            handleResponse(merkleTxError);
        } else if (isMerkleTransactionSuccess) {
            handleResponse(merkleData);
        }
    }, [isMerkleTransactionError, isMerkleTransactionSuccess, merkleTxError, merkleData]);

    const claimNFT = useCallback(async () => {
        try {
            canMerkleMint ? merkleWriteContract(merkleSimData!.request) : writeContract(simData!.request);
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(canMerkleMint ? merkleStatus : status);
        }
    }, [canMerkleMint, writeContract, merkleWriteContract, simData, merkleSimData, setResponse, status, merkleStatus]);

    return {
        mintingStatus: status,
        isMintingLoading : isTransactionLoading || isPrepareLoading || isMerklePrepareLoading || isMerkleTransactionLoading,
        isMintingError: isTransactionError || isMerkleTransactionError,
        claimNFT,
        mintingError: error,
        canMerkleMint,
        mintedTokens,
    };
};

export default useClaimNFT;
