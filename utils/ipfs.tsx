import axios from "axios";

export const uploadFileToNFTStorage = async (file:any) => {
  const form = new FormData();
  form.append("asset", file);

  const res = await axios.post("https://upload.crunchy.network/single", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.cid;
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
    const gateway = "https://nftstorage.link/ipfs/";
    uri = uri.replace("ipfs://", gateway);
  }

  return uri;
};
