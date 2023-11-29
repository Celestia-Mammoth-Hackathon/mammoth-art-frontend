import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./NavLink.module.sass";
import Icon from "@/components/Icon";

type NavLinkProps = {
    className?: string;
    activeClassName?: any;
    href: string;
    children: React.ReactNode;
    onClose?: () => void;
};

const NavLink = ({
    className,
    activeClassName,
    href,
    children,
    onClose
}: NavLinkProps) => {
    const router = useRouter();

    const handleOnClick = () => {
        if (onClose) {
            onClose();
        }
    };

    return (
        <Link href={href}>
            <a
                className={cn("h3", styles.link, className, {
                    [styles.active]: router.pathname === href,
                })}
                onClick={onClose ? handleOnClick : undefined}
            >
                <div className={styles.title}>
                    {children}
                    <span className={styles.hover}>{children}</span>
                </div>
                <Icon name="arrow-right" className={styles.icon}/>
            </a>
        </Link>
    );
};

export default NavLink;
