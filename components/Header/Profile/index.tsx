import { useEffect, useRef, useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Icon from "@/components/Icon";
import Wallet from "./Wallet";
import Image from "@/components/Image";
// import Address from "./Address";
import { formatUserAddress } from "@/utils/index";
import { useUserContext } from "context/user";
import NavLink from "@/components/NavLink";
import { chainBridgeURL } from "@/constants/details";

type ProfileProps = {
    account?: any;
    className?: string;
    headClassName?: string;
    bodyClassName?: string;
    visible: any;
    onOpen: () => void;
    onClose: () => void;
    onDisconnect: () => void;
    canDisconnect: boolean;
};

const Profile = ({
    account,
    className,
    headClassName,
    bodyClassName,
    onOpen,
    onClose,
    onDisconnect,
    canDisconnect,
    visible,
}: ProfileProps) => {
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
    const initialRender = useRef(true);
    const { address, ensName } = useUserContext();
    const menu = address ? [
        {
            title: "MY PROFILE",
            url: "/my-collection",
        },
        {
            title: "BRIDGE FUNDS",
            url: chainBridgeURL,
            newPage : true,
        },
        {
            title: "DISCORD",
            url: "https://discord.gg/P6tEY8d7De",
            newPage : true,
        },
    ] : [
        {
            title: "BRIDGE FUNDS",
            url: chainBridgeURL,
        },
        {
            title: "DISCORD",
            url: "https://discord.gg/P6tEY8d7De",
            newPage : true,
        },
    ];
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            visible ? disablePageScroll() : enablePageScroll();
        }
    }, [visible]);

    return (
        <OutsideClickHandler onOutsideClick={onClose}>
            <div
                className={cn(
                    styles.profile,
                    { [styles.active]: visible },
                    className
                )}
            >
                <button onClick={onOpen}>
                    <div className={styles.connectBtn}>
                        {ensName ? ensName : account.displayName}
                    </div>
                </button>
                <div className={cn(styles.body, bodyClassName)}>
                    <button
                        className={cn(
                            "button-circle button-medium",
                            styles.close
                        )}
                        onClick={onClose}
                    >
                        <Icon name="close-fat" />
                    </button>
                    <div className={styles.user}>
                        <div className={styles.avatar}>
                            <Image
                                src="/images/users/avatar-1.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={styles.login}>{ensName ? ensName : account.displayName}</div>
                            
                        </div>
                    </div>
                    <Wallet account={account}/>
                    {/* <Address /> */}
                    {canDisconnect && (
                        <button
                            className={styles.button}
                            onClick={onDisconnect}
                        >
                            <span className={styles.action}>DISCONNECT WALLET</span>
                        </button>
                    )}
                    <div className={styles.menu}>
                        {menu.map((link, index) => (
                            <NavLink
                                className={cn(styles.link)}
                                activeClassName={styles.active}
                                href={link.url}
                                key={index}
                                onClose={() => setVisibleMenu(false)}
                                newPage={link?.newPage ? link.newPage : false}
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>
                    
                </div>
            </div>
        </OutsideClickHandler>
    );
};

export default Profile;
