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
            setResponse(status);
            setVisibleMintMenu(true);
            setClaimNftTrigger && setClaimNftTrigger(!claimNftTrigger)
        }
    }, [canMerkleMint, status, claimNftTrigger, setClaimNftTrigger, setResponse, setVisibleMintMenu]);

    useEffect(() => {
        if (simError) {
            console.error("useSimulateContract", simError.message);
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

    const claimNFT = useCallback(async () => {
        try {
            writeContract(simData!.request);
        } catch (error) {
            console.error("Error initiating transaction:", error);
            setResponse(status);
        }
    }, [canMerkleMint, writeContract, simData, setResponse, status]);

    return {
        mintingStatus: status,
        isMintingLoading : isTransactionLoading || isPrepareLoading  ,
        isMintingError: isTransactionError,
        claimNFT,
        mintingError: error,
        mintedTokens,
    };
};

export default useClaimNFT;
