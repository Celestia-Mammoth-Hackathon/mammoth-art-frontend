import { ethers } from "ethers";

const MAINNET_API = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`;

export const provider = new ethers.providers.JsonRpcProvider(MAINNET_API);

export const lookUpAddress = async(address:string) => {
    const resolvedName = await provider.lookupAddress(address).then((resolvedName:string|null) => {
        return resolvedName ?? "";
    })
    return resolvedName;
}

export const resolveName = async(name:string) => {
    const address:string = await provider.resolveName(name).then((address:string|null) => {
        return address ?? "";
    })
    return address;
}
