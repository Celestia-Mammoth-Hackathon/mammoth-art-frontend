import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

export const CollectionContext = createContext<any>(undefined);

type CollectionProviderProps = {
  children: ReactNode;
};

export const useCollectionContext = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollectionContext must be used within a CollectionProvider');
  }
  return context;
};

// Helper function to convert a File to a Base64-encoded string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Helper function to convert a Base64-encoded string back to a File
const base64ToFile = (base64: string, filename: string, mimeType: string): File => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });
  return new File([blob], filename, { type: mimeType });
};

export const CollectionProvider = ({ children }: CollectionProviderProps) => {
  const router = useRouter();
  const { cid } = router.query;

  // Load collection data from localStorage based on CID
  const loadCollectionData = async (cid: string | undefined) => {
    if (cid) {
      const savedData = localStorage.getItem(cid); // Use CID as the key
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Convert Base64 image back to File object
        if (parsedData.image) {
          const { name, type } = parsedData.image;
          parsedData.image = base64ToFile(parsedData.image.data, name, type);
        }

        return parsedData;
      }
    }
    // Return default data if no CID or no data found
    return {
      placeholderMetadata: {
        name: '',
        description: '',
        image: null,
        attributes: [],
      },
      contractAddress: '',
      zipFile: null,
      contractName: '',
      contractSymbol: '',
      size: 0,
      price: '',
      startDate: '',
      endDate: '',
      primarySaleAddress: '',
      royalty: '',
      royaltyAddress: '',
      target: 'Viewport',
      trigger: 0,
      resolution: [],
      influences: [],
      formaCollection: null,
      dropContractAddress: '',
    };
  };

  const [collectionData, setCollectionData] = useState(() => loadCollectionData(undefined)); // Initialize with default data

  // Update collectionData when cid becomes available
  useEffect(() => {
    if (cid && typeof cid === 'string') {
      loadCollectionData(cid).then((savedData) => {
        setCollectionData(savedData);
      });
    }
  }, [cid]);

  // Save collection data to localStorage whenever it changes
  useEffect(() => {
    if (cid && typeof cid === 'string') {
      const saveData = async () => {
        const dataToSave : any = { ...collectionData };

        // Convert File image to Base64 before saving
        if (dataToSave.image instanceof File) {
          const base64 = await fileToBase64(dataToSave.image);
          dataToSave.image = {
            data: base64,
            name: dataToSave.image.name,
            type: dataToSave.image.type,
          };
        }

        localStorage.setItem(cid, JSON.stringify(dataToSave));
      };

      saveData();
    }
  }, [collectionData, cid]);

  return (
    <CollectionContext.Provider value={{ collectionData, setCollectionData, cid }}>
      {children}
    </CollectionContext.Provider>
  );
};