import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ConnectBtn.module.sass";
import Profile from "../Profile";
import { useUserContext } from "context/user";
import { useAccount, useDisconnect, useBalance } from 'wagmi'
import { useEnsName } from 'wagmi'
import { lookUpAddress } from "@/utils/provider";
import { isAddress, withTimeout } from 'viem'
import {usePrivy, useWallets} from '@privy-io/react-auth';
import { chainId } from "@/constants/details";
import {useSetActiveWallet} from '@privy-io/wagmi';
import { dnumFormat } from "@/utils/index";

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
  const {ready, connectOrCreateWallet, logout} = usePrivy();
  const { disconnect } = useDisconnect();
  const {wallets, ready: walletsReady} = useWallets();
  const {setActiveWallet} = useSetActiveWallet();
  const {address: wagmiAddress, isConnected, isConnecting, isDisconnected} = useAccount();
  const {data: balanceData} = useBalance({
    address: wagmiAddress as `0x${string}`,
  });
  const activeWallet = wallets.find((wallet) => wallet.address === wagmiAddress);
  // if (ready && walletsReady && wallets.length && !activeWallet) {
  //   setActiveWallet(wallets[0]);
  // }

  const [reqSwitchNetwork, setReqSwitchNetwork] = useState<boolean>(false);
  const { address, setAddress, setBalance, ensName, setEnsName } = useUserContext();
  const [isMobile, setIsMobile] = useState<boolean>(false); 

  useEffect(() => {
      const checkIsMobile = () => {
          if (typeof window !== "undefined") {
              setIsMobile(window.innerWidth <= 1023);
          }
      };

      checkIsMobile();

      // Add event listener to check for mobile resizing
      window.addEventListener('resize', checkIsMobile);

      // Cleanup the event listener on component unmount
      return () => {
          window.removeEventListener('resize', checkIsMobile);
      };
  }, []);

  useEffect(() => {
    const fetchEnsName = async () => {
        if(address && isAddress(address)) {
            const resolvedAddress = await lookUpAddress(address);
            setEnsName(resolvedAddress);
        }
    };

    fetchEnsName();
    }, [address]);

  // switch network when needed
  const caip2ChainId = `eip155:${chainId}`;
  useEffect(() => {
    if (activeWallet && activeWallet.chainId !== caip2ChainId) {
      setReqSwitchNetwork(true);
    } else {
      setReqSwitchNetwork(false);
    }
  }, [activeWallet])

  useEffect(() => {
    if (isDisconnected || !activeWallet) {
      setRegistration(false);
      setAddress("");
      setEnsName("");
      setBalance(undefined);
    }
  }, [isDisconnected, activeWallet]);

//   if (!ready || !walletsReady) {
//     return <></>;
//   }

  if (isDisconnected || !activeWallet) {
    return (
      <div>
        <button
          onClick={connectOrCreateWallet}
          className={cn(styles.button, className)}
          type="button"
          style={btnStyle}
        >
          <span className={styles.connect}>{isMobile ? "CONNECT" : children || "CONNECT WALLET"}</span>
        </button>
      </div>
    )
  }

  if (reqSwitchNetwork) {
    return (
      <div>
        <button
          onClick={() => activeWallet.switchChain(chainId)}
          className={cn(styles.button, className)}
          type="button"
          style={btnStyle}
        >
          <span className={styles.connect}>{isMobile ? "SWITCH" : "SWITCH NETWORK"}</span>
        </button>
      </div>
    )
  }

  setRegistration(true);
  setAddress(activeWallet.address);
  setBalance(balanceData?.formatted);
  const account = {
    ...activeWallet,
    displayName: `${activeWallet.address.slice(0, 4)}...${activeWallet.address.slice(-4)}`,
    displayBalance: balanceData ? `${dnumFormat(balanceData.value, balanceData.decimals)} ${balanceData.symbol}` : '',
  };

  return (
      <Profile
          className={styles.profile}
          onOpen={() =>
              setVisibleProfile(!visibleProfile)
          }
          onClose={() => {
              setVisibleProfile(false);
          }}
          canDisconnect={activeWallet.connectorType === "embedded" || (activeWallet.walletClientType === "metamask" && window.ethereum && window.ethereum.isMetaMask)}
          onDisconnect={async () => {
            if (activeWallet.connectorType === "embedded") {
              await logout();
            } else {
              disconnect();
              for (const wallet of wallets) {
                wallet.disconnect();
              }
              if (typeof window.ethereum !== "undefined") {
                try {
                  await withTimeout(
                    () =>
                      window.ethereum.request({
                        method: 'wallet_revokePermissions',
                        params: [{ eth_accounts: {} }],
                      }),
                    { timeout: 100 },
                  )
                } catch {}
              }
            }

            setAddress("");
            setEnsName("");
            setBalance(undefined); // Reset balance to undefined
            setVisibleProfile(false);
            setRegistration(false);
          }}
          visible={visibleProfile}
          account={account}
      />
  );
};
