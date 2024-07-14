import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

type ModalContextType = {
    visibleMintMenu: boolean;
    visibleBuyMenu: boolean;
    visibleTransferMenu: boolean;
    visibleListMenu: boolean;
    visibleCancelMenu: boolean;
    setVisibleMintMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleBuyMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleTransferMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleListMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setVisibleCancelMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ModalContext = createContext<any>(undefined);

export const useModalContext = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModalContext must be used within a ModalProvider');
    }
    return context;
};

type ModalProviderProps = {
    children: ReactNode;
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
    const [visibleMintMenu, setVisibleMintMenu] = useState<boolean>(false);
    const [visibleBuyMenu, setVisibleBuyMenu] = useState<boolean>(false);
    const [visibleTransferMenu, setVisibleTransferMenu] = useState<boolean>(false);
    const [visibleListMenu, setVisibleListMenu] = useState<boolean>(false);
    const [visibleCancelMenu, setVisibleCancelMenu] = useState<boolean>(false);


    const values = {
        visibleMintMenu,
        visibleBuyMenu,
        visibleTransferMenu,
        visibleListMenu,
        visibleCancelMenu,
        setVisibleMintMenu,
        setVisibleBuyMenu,
        setVisibleTransferMenu,
        setVisibleListMenu,
        setVisibleCancelMenu
    };

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
};
