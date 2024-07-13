import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "@/components/Logo";
import { ConnectBtn } from "./ConnectBtn";
import Menu from "./Menu";
import { useUserContext } from "context/user";
import { chainBridgeURL } from "@/constants/details";

type HeaderProps = {
    className?: string;
    noRegistration?: boolean;
    light?: boolean;
    empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
    const { address, balance, visibleProfile, setVisibleProfile, visibleSearch, registration, setRegistration } = useUserContext();
    
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
                                <Link href="/">
                                    <div className={cn(
                                        styles.create,
                                        {
                                            [styles.visibleSearch]: visibleSearch,
                                            [styles.active]: router.pathname === "/", 
                                        },
                                    )}>
                                        <span className={cn(styles.link, styles.createLink)} style={{ color: router.pathname === "/" ? '#FFFFFF' : '#8C8D8F' }}>[HOME]</span>
                                    </div>
                                </Link>

                                {
                                    address  && <Link href="/my-collection">
                                    <div className={cn(
                                        styles.create,
                                        {
                                            [styles.visibleSearch]: visibleSearch,
                                            [styles.active]: router.pathname === "/my-collection", 
                                        },
                                    )}>
                                        <span className={cn(styles.link, styles.createLink)} style={{ color: router.pathname === "/my-collection" ? '#FFFFFF' : '#8C8D8F' }}>[MY COLLECTION]</span>
                                    </div>
                                    </Link>
                                }

                                <a href={chainBridgeURL} target="_blank" rel="noreferrer">
                                    <div className={cn(
                                        styles.create,
                                        {
                                            [styles.visibleSearch]: visibleSearch,
                                            [styles.active]: router.pathname === "/deposit", 
                                        },
                                    )}>
                                        <span className={cn(styles.link, styles.createLink)} style={{ color: (router.pathname === "/deposit") ? '#FFFFFF' : '#8C8D8F' }}>[DEPOSIT TIA]</span>
                                    </div>
                                </a>
                                <div>
                                    <ConnectBtn 
                                        registration={registration}
                                        setRegistration={setRegistration} 
                                        visibleProfile={visibleProfile} 
                                        setVisibleProfile={setVisibleProfile}
                                    />
                                </div>
                                <Menu classBurger={styles.burger} />
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
