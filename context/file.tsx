import { createContext, useState, useContext, useCallback, ReactNode } from 'react';

export const FileContext = createContext<any>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

type FileProviderProps = {
    children: ReactNode;
};

export const FileProvider = ({ children }: FileProviderProps) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <FileContext.Provider value={{ uploadedFile, setUploadedFile }}>
      {children}
    </FileContext.Provider>
  );
};

