import Link from "next/link";
import cn from "classnames";
import styles from "./Logo.module.sass";

type LogoProps = {
    className?: string;
    light?: boolean;
    onClick?: () => void;
};

const Logo = ({ className, light, onClick }: LogoProps) => (
    <Link href="/">
        <a
            className={cn(styles.logo, { [styles.light]: light }, className)}
            onClick={onClick}
        >
            MammothArt



        </a>
    </Link>
);

export default Logo;
