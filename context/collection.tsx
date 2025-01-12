import { createContext, useState, useContext, useCallback, ReactNode } from 'react';

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

export const CollectionProvider = ({ children } : CollectionProviderProps) => {
  const [collectionData, setCollectionData] = useState({
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
  });

  return (
    <CollectionContext.Provider value={{ collectionData, setCollectionData }}>
      {children}
    </CollectionContext.Provider>
  );
};
