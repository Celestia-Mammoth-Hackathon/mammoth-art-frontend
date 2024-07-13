import { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./Menu.module.sass";
import Modal from "@/components/Modal";
import NavLink from "@/components/NavLink";
import { useUserContext } from "context/user";
import { chainBridgeURL } from "@/constants/details";
import { ConnectBtn } from "./ConnectBtn";

type MenuProps = {
    classBurger?: string;
};

const Menu = ({ classBurger }: MenuProps) => {
    const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
    const { address } = useUserContext();

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
                        <ConnectBtn />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Menu;
