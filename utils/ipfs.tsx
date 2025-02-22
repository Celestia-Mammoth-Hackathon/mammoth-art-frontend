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

export const uploadImageToIPFS = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to upload file: ${errorText}`);
    }

    const resData = await res.json();
    return resData.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};

export const uploadZipFileToIPFS = async (file: File, collectionSize: number, collectionName: string) => {
  try {
    // Create FormData to send the file
    const formData = new FormData();
    formData.append('zipFile', file);
    formData.append('collectionSize', "10".toString());
    formData.append('collectionName', "test");

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ZIP_SERVER_URL}/upload`,
      // `http://localhost:3001/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
      }
    );

    if (!response.data.success) {
      throw new Error('Failed to upload zip file');
    }

    return {
      imagesHash: response.data.imagesHash,
      metadataHash: response.data.metadataHash,
      metadata: response.data.metadata
    };
  } catch (error) {
    console.error('Error uploading zip file:', error);
    throw error;
  }
};

const MOD_IPFS_CIDS = [
  "QmW6e2ScVbjveVUr2xcQq1dgeChXMup8LRcNVkrvSBAWHL",
  "QmT5jzbYUbH4Tb4w8PTL5VSAWD57YgDXCseoRkR9WoMsPs",
  "Qmc78jmkQzKdmai15XyNps6MUczbgSNdPw6SkMmdno8Fk6",
  "QmNUwTKAfv67p77f5czzt8yELL6G8Z5gdsimPWzhxsFcPX",
  "Qmc86c9f1pzMRK3mYj7ZKREPG9jqc9TaA87pcRZ1CDJUzC",
]

export const transformUri = (uri:any, useCdn: boolean = true) => {
  if(!uri) return "";
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
