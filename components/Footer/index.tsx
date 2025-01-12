import Link from "next/link";
import cn from "classnames";
import styles from "./Footer.module.sass";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

import { footerNavigation } from "@/constants/footerNavigation";

type FooterProps = {};

const Footer = ({}: FooterProps) => (
    <footer className={styles.footer}>
        <div className={styles.foot}>
            <div className={styles.copyright}>
            Copyright <span className={styles.copyrightIcon}>©</span> Mammothon Bros 2025. All rights reserved
            </div>
        </div>
    </footer>
);

export default Footer;
