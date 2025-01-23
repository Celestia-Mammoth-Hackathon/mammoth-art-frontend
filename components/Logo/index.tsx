import Link from "next/link";
import cn from "classnames";
import styles from "./Logo.module.sass";
import Image from "@/components/Image";

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
            <Image
                src="/mstile-150x150.png"
                width={80}
                height={80}
                alt="Logo"
            />
            MammothArt



        </a>
    </Link>
);

export default Logo;
