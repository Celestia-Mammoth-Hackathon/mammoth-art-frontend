import axios from "axios";

export const uploadFileToNFTStorage = async (file:any) => {
  const form = new FormData();
  form.append("asset", file);

  const res = await axios.post("https://upload.crunchy.network/single", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.cid;
};
export const transformUri = (uri:any, useCdn: boolean = true) => {
  // normalize
  uri = uri.replace("https://gateway.pinata.cloud/ipfs/", "ipfs://");
  uri = uri.replace("https://ipfs.io/ipfs/", "ipfs://");

  if (useCdn) {
    uri = uri.replace("ipfs://", "/images/ipfs/");
  } else {
    const gateway = "https://nftstorage.link/ipfs/";
    uri = uri.replace("ipfs://", gateway);
  }

  return uri;
};
