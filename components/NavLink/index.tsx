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
    newPage?: boolean;
};

const NavLink = ({
    className,
    activeClassName,
    href,
    children,
    onClose,
    newPage=false
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
                className={cn(styles.link, className, {
                    [styles.active]: router.pathname === href,
                })}
                onClick={onClose ? handleOnClick : undefined}
                target={newPage ? "_blank" : ""}
            >
                <div className={styles.title}>
                    {children}
                    <span className={styles.hover}>{children}</span>
                </div>
                {/* <Icon name="arrow-right" className={styles.icon}/> */}
            </a>
        </Link>
    );
};

export default NavLink;
