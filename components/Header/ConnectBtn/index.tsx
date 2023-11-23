import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from "./ConnectBtn.module.sass";
import Profile from "../Profile";

import { useDisconnect } from 'wagmi'

type ConnectBtnProps = {
    visibleProfile: boolean;
    registration: boolean;
    setVisibleProfile: (visibleProfile:boolean) => void;
    setRegistration: (registration:boolean) => void;
    address: string;
    setAddress: (address:string) => void;
    balance: string | undefined;
    setBalance: (balance:string|undefined) => void;
};

export const ConnectBtn = ({ registration, setBalance, balance, address, setAddress, setRegistration, visibleProfile, setVisibleProfile }: ConnectBtnProps) => {
  const { disconnect } = useDisconnect()

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
        const connected =
          ready &&
          account &&
          chain

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
                setRegistration(false)
                return (
                  <button onClick={openConnectModal} className={styles.button} type="button" >
                    <span className={styles.connect}>CONNECT WALLET</span>
                  </button>
                );
              }
            //   if (chain.unsupported) {
            //     return (
            //       <button onClick={openChainModal} type="button">
            //         Wrong network
            //       </button>
            //     );
            //   }
              setRegistration(true);
              setAddress(account.displayName)
              setBalance(account.balanceFormatted)
              return (
                <Profile
                    className={styles.profile}
                    onOpen={() =>
                        setVisibleProfile(!visibleProfile)
                    }
                    onClose={() => {
                        setVisibleProfile(false)
                    }}
                    onDisconnect={() => {
                        setVisibleProfile(false)
                        setRegistration(false);
                        disconnect()
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