import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./ConnectBtn.module.sass";
import { useUserContext } from "context/user";
import { useAccount, useDisconnect, useBalance } from 'wagmi'
import { useEnsName } from 'wagmi'
import { lookUpAddress } from "@/utils/provider";
import { isAddress, withTimeout } from 'viem'
import {usePrivy, useWallets} from '@privy-io/react-auth';
import { chainId } from "@/constants/details";
import {useSetActiveWallet} from '@privy-io/wagmi';
import { dnumFormat } from "@/utils/index";
import Address from "../../Profile/Address";
import Wallet from "../../Profile/Wallet";

type ConnectBtnProps = {
    btnStyle?: any;
    className?: string;
    children?: React.ReactNode;
};

export const ConnectBtn = ({
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

  const [reqSwitchNetwork, setReqSwitchNetwork] = useState<boolean>(false);
  const { address, setAddress, setBalance, ensName, setEnsName } = useUserContext();

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
      setAddress("");
      setEnsName("");
      setBalance(undefined);
    }
  }, [isDisconnected, activeWallet]);

  if (!ready || !walletsReady) {
    return <></>;
  }

  if (isDisconnected || !activeWallet) {
    return (
      <div>
        <button
          onClick={connectOrCreateWallet}
          className={cn(styles.button, className)}
          type="button"
          style={btnStyle}
        >
          <span className={styles.action}>{children || "CONNECT WALLET"}</span>
        </button>
      </div>
    )
  }

  setAddress(activeWallet.address);
  setBalance(balanceData?.formatted);
  const account = {
    ...activeWallet,
    displayName: `${activeWallet.address.slice(0, 4)}...${activeWallet.address.slice(-4)}`,
    displayBalance: balanceData ? `${dnumFormat(balanceData.value, balanceData.decimals)} ${balanceData.symbol}` : '',
  };

  const canDisconnect = activeWallet.connectorType === "embedded" || (activeWallet.walletClientType === "metamask" && window.ethereum && window.ethereum.isMetaMask);

  if (reqSwitchNetwork) {
    return (
      <>
        <Wallet account={account} />
        <Address />
        <div>
          <button
            onClick={() => activeWallet.switchChain(chainId)}
            className={cn(styles.button, className)}
            type="button"
            style={btnStyle}
          >
            <span className={styles.action}>SWITCH NETWORK</span>
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <Wallet account={account} />
      <Address />
      {canDisconnect && (
        <button
          className={cn(styles.button, styles.disconnect)}
          onClick={async () => {
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
          }}
        >
          <span className={styles.action}>DISCONNECT WALLET</span>
        </button>
      )}
    </>
  );
};
