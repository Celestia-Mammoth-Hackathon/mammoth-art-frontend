import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Search from "./Search";
import Profile from "./Profile";
import Menu from "./Menu";
import { useUserContext } from "context/user";
import { UserContext } from "context/user";
import { resultSearch } from "@/mocks/resultSearch";
import { ConnectBtn } from "./ConnectBtn";

type HeaderProps = {
    className?: string;
    noRegistration?: boolean;
    light?: boolean;
    empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
    const { address, balance, visibleProfile, setVisibleProfile, visibleSearch, setVisibleSearch, registration, setRegistration } = useUserContext();


    const router = useRouter();
    useHotkeys("esc", () => setVisibleProfile(false));

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
                            {
                                address && 
                                    <Link href="/mint-generative/create">
                                        <div className={cn(
                                            styles.create,
                                            {
                                                [styles.visibleSearch]: visibleSearch,
                                                [styles.active]: router.pathname === "/create", 
                                            },
                                        )}>
                                            <span className={cn(styles.link)} style={{ color: router.pathname.includes("/mint-generative") ? '#FFFFFF' : '#8C8D8F' }}>CREATE</span>
                                        </div>
                                    </Link>
                            }

                            {/* <Link href="/discover">
                                    <div className={cn(
                                        styles.create,
                                        {
                                            [styles.visibleSearch]: visibleSearch,
                                            [styles.active]: router.pathname === "/discover", 
                                        },
                                    )}>
                                        <span className={cn(styles.link)} style={{ color: router.pathname === "/discover" ? '#FFFFFF' : '#8C8D8F' }}>DISCOVER</span>
                                    </div>
                            </Link> */}
                            <Link href="/create">
                                <a
                                    className={cn(
                                        "button-stroke button-medium",
                                        styles.createButton
                                    )}
                                >
                                    <Icon name="plus" />
                                </a>
                            </Link>

                            <Search
                                className={styles.search}
                                result={resultSearch}
                                light={visibleProfile || light}
                                visibleSearch={visibleSearch}
                                setVisibleSearch={setVisibleSearch}
                            />
                            <div className={styles.connectBtnWrapper}>
                                <ConnectBtn 
                                    registration={registration}
                                    setRegistration={setRegistration} 
                                    visibleProfile={visibleProfile} 
                                    setVisibleProfile={setVisibleProfile}
                                />
                            </div>
                        </div>
                    </>
                )}
            </header>
            <div
                className={cn(styles.overlay, {
                    [styles.visible]: visibleProfile,
                })}
            ></div>
        </>
    );
};

export default Header;