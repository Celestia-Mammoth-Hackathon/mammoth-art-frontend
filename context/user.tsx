import { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
    address: string;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    balance: string | undefined;
    setBalance: React.Dispatch<React.SetStateAction<string | undefined>>;
    ensName: string;
    setEnsName: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<any>(undefined);

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [address, setAddress] = useState<string>("");
    const [balance, setBalance] = useState<string | undefined>("");
    const [ensName, setEnsName] = useState<string>("");

    return (
        <UserContext.Provider value={{ address, setAddress, balance, setBalance, ensName, setEnsName }}>
            {children}
        </UserContext.Provider>
    );
};