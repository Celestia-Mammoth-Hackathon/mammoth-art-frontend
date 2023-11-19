import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import ConnectWallet from "@/components/ConnectWallet";
import Search from "./Search";
import Discover from "./Discover";
import Profile from "./Profile";
import Menu from "./Menu";

import { resultSearch } from "@/mocks/resultSearch";
import { ConnectBtn } from "./ConnectBtn";

const menu = [
    {
        title: "DISCOVER",
        url: "/discover",
    },
    // {
    //     title: "Feed",
    //     url: "/feed",
    // },
];

type HeaderProps = {
    className?: string;
    noRegistration?: boolean;
    light?: boolean;
    empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
    const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
    const [connect, setConnect] = useState<boolean>(false);
    const [registration, setRegistration] = useState<boolean>(false);
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
    const [account, setAccount] = useState<any>(undefined);

    useHotkeys("esc", () => setVisibleProfile(false));

    const handleClick = () => {
        setConnect(false);
        setRegistration(true);
    };

    return (
        <>
            <header
                className={cn(
                    styles.header,
                    {
                        [styles.profileOpen]: visibleProfile,
                        // [styles.light]: visibleProfile || light,
                        [styles.light]: visibleProfile,
                        [styles.empty]: empty,
                        [styles.noRegistration]:
                            noRegistration && !registration,
                    },
                    className
                )}
            >
                {empty ? (
                    <>
                        <Logo
                            className={styles.logo}
                            light={visibleProfile || light}
                        />
                        {/* <Profile
                            className={styles.profile}
                            headClassName={styles.profileHead}
                            bodyClassName={styles.profileBody}
                            onOpen={() => setVisibleProfile(!visibleProfile)}
                            onClose={() => setVisibleProfile(false)}
                            visible={visibleProfile}
                        /> */}
                    </>
                ) : (
                    <>
                        <div className={styles.col}>
                            <Logo
                                className={styles.logo}
                                light={visibleProfile || light}
                            />
                            
                        </div>
                        <div className={styles.col}>
                            <Link href="/create">
                                    <div className={cn(
                                        styles.create,
                                        {
                                            [styles.visibleSearch]: visibleSearch,
                                        },
                                    )}>
                                        <span className={cn(styles.link, styles.createLink)}>CREATE</span>
                                    </div>
                            </Link>
                            <Link href="/create">
                                <a
                                    className={cn(
                                        "button-stroke button-medium",
                                        styles.button,
                                        styles.createButton
                                    )}
                                >
                                    <Icon name="plus" />
                                </a>
                            </Link>

                            <div 
                                className={cn(
                                    styles.navigation,
                                    {
                                        [styles.visibleSearch]: visibleSearch,
                                    },
                                )}>
                                {menu.map((link, index) => (
                                <Link href={link.url} key={index}>
                                    <a className={styles.link}>
                                    {link.title}
                                    </a>
                                </Link>
                                ))}
                            </div>

                            <Search
                                className={styles.search}
                                result={resultSearch}
                                light={visibleProfile || light}
                                visibleSearch={visibleSearch}
                                setVisibleSearch={setVisibleSearch}
                            />
                            <div>
                                <ConnectBtn 
                                    registration={registration}
                                    setRegistration={setRegistration} 
                                    visibleProfile={visibleProfile} 
                                    setVisibleProfile={setVisibleProfile}
                                />
                            </div>

                            {/* <Link href="/notification">
                                <a
                                    className={cn(
                                        styles.notification,
                                        styles.active
                                    )}
                                >
                                    <Icon name="flash" />
                                </a>
                            </Link> */}
                            {/* <Profile
                                className={styles.profile}
                                onOpen={() =>
                                    setVisibleProfile(!visibleProfile)
                                }
                                onClose={() => setVisibleProfile(false)}
                                visible={visibleProfile}
                            /> */}
                            <Menu
                                classBurger={styles.burger}
                                resultSearch={resultSearch}
                            />
                        </div>
                    </>
                )}
            </header>
            <div
                className={cn(styles.overlay, {
                    [styles.visible]: visibleProfile,
                })}
            ></div>
            {/* <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={connect}
                onClose={() => setConnect(false)}
            >
                <ConnectWallet
                    onClickLogo={() => setConnect(false)}
                    onContinue={handleClick}
                />
            </Modal> */}
        </>
    );
};

export default Header;
