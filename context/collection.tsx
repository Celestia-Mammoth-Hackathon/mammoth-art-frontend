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

export const CollectionProvider = ({ children }: CollectionProviderProps) => {
  const router = useRouter();
  const { cid } = router.query;

  // Load collection data from localStorage based on CID
  const loadCollectionData = (cid: string | undefined) => {
    if (cid) {
      const savedData = localStorage.getItem(cid); // Use CID as the key
      if (savedData) {
        return JSON.parse(savedData);
      }
    }
    // Return default data if no CID or no data found
    return {
      zipFile: null,
      collectionName: '',
      contractName: '',
      contractSymbol: '',
      description: '',
      size: 0,
      price: '',
      image: null,
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
    };
  };

  const [collectionData, setCollectionData] = useState(() => loadCollectionData(undefined)); // Initialize with default data

  // Update collectionData when cid becomes available
  useEffect(() => {
    if (cid && typeof cid === 'string') {
      const savedData = loadCollectionData(cid);
      setCollectionData(savedData);
    }
  }, [cid]);

  // Save collection data to localStorage whenever it changes
  useEffect(() => {
    if (cid && typeof cid === 'string') {
      localStorage.setItem(cid, JSON.stringify(collectionData));
    }
  }, [collectionData, cid]);

  return (
    <CollectionContext.Provider value={{ collectionData, setCollectionData, cid }}>
      {children}
    </CollectionContext.Provider>
  );
};