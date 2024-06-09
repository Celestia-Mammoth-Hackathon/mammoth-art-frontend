import cn from "classnames";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./ConnectBtn.module.sass";
import Profile from "../Profile";
import { useContext, useEffect } from "react";
import { UserContext } from "context/user";
import { useDisconnect } from 'wagmi'
import { lookUpAddress } from "@/utils/provider";
import { isAddress } from 'viem'

type ConnectBtnProps = {
    visibleProfile: boolean;
    registration: boolean;
    setVisibleProfile: (visibleProfile:boolean) => void;
    setRegistration: (registration:boolean) => void;
    btnStyle?: any;
    className?: string;
    children?: React.ReactNode;
};

export const ConnectBtn = ({
  registration,
  setRegistration,
  visibleProfile,
  setVisibleProfile,
  btnStyle,
  className,
  children
}: ConnectBtnProps) => {
  const { disconnect } = useDisconnect();
  const { address, setAddress, setBalance, ensName, setEnsName } = useContext(UserContext);

  useEffect(() => {
    const fetchEnsName = async () => {
        if(address && isAddress(address)) {
            const resolvedAddress = await lookUpAddress(address);
            setEnsName(resolvedAddress);
        }
    };

    fetchEnsName();
    }, [address]);  

  return (
      <ConnectButton.Custom>
          {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
          }) => {
              const ready = mounted;
              const connected = ready && account;
              const chainUnSupported = chain?.unsupported;

              return (
                  <div
                      {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                          },
                      })}
                  >
                      {(() => {
                          if (!connected) {
                              setRegistration(false);
                              setAddress("");
                              setEnsName("");
                              setBalance(undefined); 
                              return (
                                <button 
                                    onClick={openConnectModal} 
                                    className={cn(styles.button, className)}
                                    type="button"
                                    style={btnStyle}  
                                >
                                    <span className={styles.connect}>{children || "CONNECT WALLET"}</span>
                                </button>
                            );
                          }
                          if (chainUnSupported) {
                            return (
                                <button 
                                    onClick={openChainModal} 
                                    className={cn(styles.button, className)}
                                    type="button"
                                    style={btnStyle}
                                >
                                    <span className={styles.connect}>SWITCH NETWORK</span>
                                </button>
                            );
                          }
                          setRegistration(true);
                          setAddress(account.address);
                          setBalance(account.balanceFormatted);
                          return (
                              <Profile
                                  className={styles.profile}
                                  onOpen={() =>
                                      setVisibleProfile(!visibleProfile)
                                  }
                                  onClose={() => {
                                      setVisibleProfile(false);
                                  }}
                                  onDisconnect={() => {
                                      setAddress("");
                                      setEnsName("");
                                      setBalance(undefined); // Reset balance to undefined
                                      setVisibleProfile(false);
                                      setRegistration(false);
                                      disconnect();
                                  }}
                                  visible={visibleProfile}
                                  account={account}
                              />
                          );
                      })()}
                  </div>
              );
          }}
      </ConnectButton.Custom>
  );
};
