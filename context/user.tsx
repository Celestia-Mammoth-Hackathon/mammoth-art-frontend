import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { chainId } from "@/constants/details";
import { useWallets } from '@privy-io/react-auth';
import { useAccount } from 'wagmi'

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

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string | undefined>("");
  const [ensName, setEnsName] = useState<string>("");
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);

  const caip2ChainId = `eip155:${chainId}`;
  const {wallets, ready: walletsReady} = useWallets();
  const {address: wagmiAddress} = useAccount();
  const activeWallet = wallets.find((wallet) => wallet.address === wagmiAddress);
  const checkNetwork = useCallback(async () => {
    if (activeWallet && activeWallet.chainId !== caip2ChainId) {
      await activeWallet.switchChain(chainId);
    }
  }, [activeWallet]);

  const values = {
    address,
    setAddress,
    balance,
    setBalance,
    ensName,
    setEnsName,
    visibleProfile,
    setVisibleProfile,
    visibleSearch,
    setVisibleSearch,
    registration,
    setRegistration,
    checkNetwork,
  };

  return (
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  );
};
