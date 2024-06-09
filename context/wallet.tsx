import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { chainId } from "@/constants/details";

type WalletContextType = {
    visibleProfile: boolean;
    setVisibleProfile: React.Dispatch<React.SetStateAction<boolean>>;
    connect: boolean;
    setConnect: React.Dispatch<React.SetStateAction<boolean>>;
    registration: boolean;
    setRegistration: React.Dispatch<React.SetStateAction<boolean>>;
    visibleSearch: boolean;
    setVisibleSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WalletContext = createContext<any>(undefined);

export const useWalletContext = () => {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWalletContext must be used within a WalletProvider');
    }
    return context;
};

type WalletProviderProps = {
    children: ReactNode;
};

export const WalletProvider = ({ children }: WalletProviderProps) => {
    const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
    const [connect, setConnect] = useState<boolean>(false);
    const [registration, setRegistration] = useState<boolean>(false);
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);

    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();

    const checkNetwork = useCallback(async () => {
        if (!chain || !switchNetworkAsync) {
            return;
        }
        try {
            if (chainId !== chain?.id) {
                console.log('Chain IDs do not match. Prompting user to switch network.');
                await switchNetworkAsync?.(chainId);
            } else {
                console.log('Chain IDs match.');
            }
        } catch (error) {
            console.error('Error checking network:', error);
        }
    }, [chain, switchNetworkAsync]);

    const values = {
        visibleProfile,
        setVisibleProfile,
        connect,
        setConnect,
        registration,
        setRegistration,
        visibleSearch,
        setVisibleSearch,
        checkNetwork
    };

    return (
        <WalletContext.Provider value={values}>
            {children}
        </WalletContext.Provider>
    );
};
