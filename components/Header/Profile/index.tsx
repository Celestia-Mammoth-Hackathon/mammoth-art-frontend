import { useEffect, useRef } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import OutsideClickHandler from "react-outside-click-handler";
import cn from "classnames";
import styles from "./Profile.module.sass";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Icon from "@/components/Icon";
import Wallet from "./Wallet";

const menu = [
    {
        title: "MY PROFILE",
        url: "/profile",
    },
    {
        title: "SETTINGS",
        url: "/settings",
    },
    {
        title: "HELP",
        url: "/help",
    },
];


type ProfileProps = {
    account?: any;
    className?: string;
    headClassName?: string;
    bodyClassName?: string;
    visible: any;
    onOpen: () => void;
    onClose: () => void;
    onDisconnect: () => void;
};

const Profile = ({
    account,
    className,
    headClassName,
    bodyClassName,
    onOpen,
    onClose,
    onDisconnect,
    visible,
}: ProfileProps) => {
    const initialRender = useRef(true);

    const action = {
        title: "Disconnect",
        icon: "close-square",
        onClick: onDisconnect,
    };

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
                <button
                    className={cn(styles.head, headClassName)}
                    onClick={onOpen}
                >
                    <Image
                        src="/images/avatar.jpg"
                        layout="fill"
                        objectFit="cover"
                        alt="Avatar"
                    />
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
                                src="/images/avatar.jpg"
                                layout="fill"
                                objectFit="cover"
                                alt="Avatar"
                            />
                        </div>
                        <div className={styles.details}>
                            <div className={cn("h3", styles.man)}>Dash</div>
                            <div className={styles.login}>@randomdash</div>
                        </div>
                        <div className={styles.connect}>
                            <div className={styles.code}>{account.displayName}</div>
                            <button
                                className={styles.action}
                                onClick={action.onClick}
                            >
                                <Icon name={action.icon} />
                                {action.title}
                            </button>
                        </div>
                        
                    </div>
                    <Wallet onDisconnect={onDisconnect} account={account}/>
                    <div className={styles.menu}>
                        {menu.map((link, index) => (
                            <NavLink
                                className={cn(styles.link)}
                                activeClassName={styles.active}
                                href={link.url}
                                key={index}
                                onClose={onClose}
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
