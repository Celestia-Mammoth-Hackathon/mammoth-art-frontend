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
      const savedData = localStorage.getItem(cid);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Convert Base64 collection image back to File
        if (parsedData.collectionImage?.data) {
          const { name, type, data } = parsedData.collectionImage;
          parsedData.collectionImage = base64ToFile(data, name, type);
        }

        // Convert Base64 placeholder metadata image back to File
        if (parsedData.placeholderMetadata?.image?.data) {
          const { name, type, data } = parsedData.placeholderMetadata.image;
          parsedData.placeholderMetadata.image = base64ToFile(data, name, type);
        }

        // Convert Base64 zip file back to File
        if (parsedData.zipFile?.data) {
          const { name, type, data } = parsedData.zipFile;
          parsedData.zipFile = base64ToFile(data, name, type);
        }

        return parsedData;
      }
    }

    // Return default data if no CID or no data found
    return {
      influencingNFTs: [],
      placeholderMetadata: {
        name: '',
        description: '',
        image: null,
        imageCid: '',
        attributes: [],
      },
      revealMetadata: {
        _metadata: '',
      },
      contractAddress: '',
      contractName: '',
      contractSymbol: '',
      collectionName: '',
      collectionDescription: '',
      collectionImage: null,
      collectionImageCid: '',
      collectionAttributes: [],
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
      zipFile: null,
    };
  };

  // Function to save to localStorage
  const saveCollectionData = async (newData: any, passedCid: any = cid) => {
    if (!passedCid || typeof passedCid !== 'string') return;
    
    try {
      // Get existing data from localStorage
      const existingDataStr = localStorage.getItem(passedCid);
      const existingData = existingDataStr ? JSON.parse(existingDataStr) : {};

      // Prepare the fields that need to be updated
      const updates: any = {};
      
      // Process each field in the new data
      for (const [key, value] of Object.entries(newData)) {
        
        if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          // Handle nested objects
          updates[key] = {};
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            if (nestedValue instanceof File) {
              // Handle File objects in nested objects
              const base64 = await fileToBase64(nestedValue as File);
              updates[key][nestedKey] = {
                data: base64,
                name: (nestedValue as File).name,
                type: (nestedValue as File).type,
              };
            } else {
              // Handle other types of nested data
              updates[key][nestedKey] = nestedValue;
            }
          }
        } else if (value instanceof File) {
          // Handle File objects at root level
          const base64 = await fileToBase64(value as File);
          updates[key] = {
            data: base64,
            name: (value as File).name,
            type: (value as File).type,
          };
        } else {
          // Handle other types of data at root level
          updates[key] = value;
        }
      }
      
      // Merge the data: new fields are added, existing fields are updated
      const mergedData = {
        ...existingData,
        ...updates
      };
      
      localStorage.setItem(passedCid, JSON.stringify(mergedData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  // Update the setCollectionData to automatically save
  const updateCollectionData = async (newData: any) => {
    setCollectionData(newData);
  };

  // Update collectionData when cid becomes available
  useEffect(() => {
    if (cid && typeof cid === 'string') {
      loadCollectionData(cid).then((savedData) => {
        setCollectionData(savedData);
      });
    }
  }, [cid]);

  const [collectionData, setCollectionData] = useState(() => loadCollectionData(undefined));

  return (
    <CollectionContext.Provider value={{ 
      collectionData, 
      setCollectionData: updateCollectionData,
      saveDataToLocalStorage: saveCollectionData,
      cid 
    }}>
      {children}
    </CollectionContext.Provider>
  );
};