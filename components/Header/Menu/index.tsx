import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import cn from "classnames";
import styles from "./Menu.module.sass";
import Modal from "@/components/Modal";
import NavLink from "@/components/NavLink";
import Icon from "@/components/Icon";
import Search from "../Search";

import { useDisconnect } from 'wagmi'

const socials = [
    {
        icon: "discord-fat",
        url: "https://www.instagram.com/ui8net/",
    },
    {
        icon: "twitter-fat",
        url: "https://twitter.com/ui8",
    },
    // {
    //     icon: "facebook-fat",
    //     url: "https://www.facebook.com/ui8.net/",
    // },
    // {
    //     icon: "linkedin-fat",
    //     url: "https://www.linkedin.com/company/ui8",
    // },
];

const menu = [
    {
        title: "Discover",
        url: "/discover",
    },
    {
        title: "Create",
        url: "/create",
    },
    {
        title: "Docs",
        url: "/blog",
    },
    // {
    //     title: "Feed",
    //     url: "/feed",
    // },
    // {
    //     title: "Help center",
    //     url: "/help",
    // },
    // {
    //     title: "Blog",
    //     url: "/blog",
    // },
];

type MenuProps = {
    classBurger?: string;
    resultSearch?: any;
    address?: any;
};

const Menu = ({ classBurger, resultSearch, address }: MenuProps) => {
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

    const { disconnect } = useDisconnect()

    const isTablet = useMediaQuery({
        query: "(max-width: 1023px)",
    });

    return (
        <>
            <button
                className={cn(styles.burger, classBurger)}
                onClick={() => setVisibleMenu(true)}
            ></button>
            <Modal
                className={styles.modal}
                closeClassName={styles.close}
                visible={visibleMenu}
                onClose={() => setVisibleMenu(false)}
            >
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={cn("h1", styles.title)}>
                            Create Anything.
                        </div>
                        <div className={styles.socials}>
                            {socials.map((social, index) => (
                                <a
                                    className={styles.social}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={index}
                                >
                                    <Icon name={social.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className={styles.col}>
                        {isTablet && (
                            <Search
                                className={styles.search}
                                result={resultSearch}    
                            />
                        )}
                        <div className={styles.menu}>
                            {menu.map((link, index) => (
                                <NavLink
                                    className={cn(styles.link)}
                                    activeClassName={styles.active}
                                    href={link.url}
                                    key={index}
                                >
                                    {link.title}
                                </NavLink>
                            ))}
                        </div>
                        {/* <div className={cn("h4", styles.info)}>
                            Download app
                        </div> */}
                        {
                            address 
                            ? (
                                <div className={styles.btns}>
                                    <div className={styles.code}>
                                        {address}
                                        <button className={styles.copy}>
                                            <Icon name="copy" />
                                        </button>
                                    </div>
                                    <button
                                        className={cn("button-white", styles.disconnect)}
                                        onClick={() => {
                                            setVisibleMenu(false)
                                            disconnect()
                                        }}
                                    >
                                        <span className={styles.text}>DISCONNECT WALLET</span>
                                    </button>
                                </div>
                            )
                            : (
                                <div className={styles.btns}>
                                    <button
                                        className={cn("button-white", styles.button)}
                                        
                                        
                                        
                                    >
                                        <span className={styles.text}>CONNECT WALLET</span>
                                    </button>
                                </div>
                            )
                        }
                        
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Menu;
