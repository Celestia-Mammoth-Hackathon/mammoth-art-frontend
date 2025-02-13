import axios from "axios";

export const uploadFolderToNFTStorage = async (formData:any) => {
  const res = await fetch(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    }
  );
  const resData = await res.json();

  return resData.IpfsHash;
};

const MOD_IPFS_CIDS = [
  "QmW6e2ScVbjveVUr2xcQq1dgeChXMup8LRcNVkrvSBAWHL",
  "QmT5jzbYUbH4Tb4w8PTL5VSAWD57YgDXCseoRkR9WoMsPs",
  "Qmc78jmkQzKdmai15XyNps6MUczbgSNdPw6SkMmdno8Fk6",
  "QmNUwTKAfv67p77f5czzt8yELL6G8Z5gdsimPWzhxsFcPX",
  "Qmc86c9f1pzMRK3mYj7ZKREPG9jqc9TaA87pcRZ1CDJUzC",
]

export const transformUri = (uri:any, useCdn: boolean = true) => {
  // normalize
  uri = uri.replace("https://gateway.pinata.cloud/ipfs/", "ipfs://");
  uri = uri.replace("https://ipfs.io/ipfs/", "ipfs://");

  uri = uri.replace("Qmc86c9f1pzMRK3mYj7ZKREPG9jqc9TaA87pcRZ1CDJUzC", "QmNUwTKAfv67p77f5czzt8yELL6G8Z5gdsimPWzhxsFcPX");

  // use modularium ipfs
  if (MOD_IPFS_CIDS.some(cid => uri.includes(cid))) {
    uri = uri.replace("ipfs://", "https://ipfs.modularium.art/ipfs/");
  }

  if (useCdn) {
    uri = uri.replace("ipfs://", "/images/ipfs/");
  } else {
    const gateway = "https://ipfs.io/ipfs/";
    uri = uri.replace("ipfs://", gateway);
  }
  return uri;
};
