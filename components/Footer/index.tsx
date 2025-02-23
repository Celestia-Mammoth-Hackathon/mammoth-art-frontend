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
            <div>
                <div className={styles.copyright}>
                    Copyright <span className={styles.copyrightIcon}>©</span> Mammoth Bros 2025
                </div>
                <div className={styles.connect}>
                    <span className={styles.connectTitle}>connect with us</span>
                    <Link href="https://x.com/mammothbros" passHref>
                        <a className={styles.connectItem}>
                            <Icon name="twitter" fill="#fff" />
                        </a>
                    </Link>
                    <Link href="https://github.com/Celestia-Mammoth-Hackathon" passHref>
                        <a className={styles.connectItem}>
                            <Icon name="github" fill="#fff" />
                        </a>
                    </Link>
                </div>
            </div>

            <div className={styles.information}>
                <div className={styles.informationList}>
                    <Link href="https://github.com/Celestia-Mammoth-Hackathon/mammoth-bros-frontend/blob/main/README.md/" passHref>
                        <a className={styles.informationItem}>Documentation</a>
                    </Link>
                    <span className={styles.informationItem}>Privacy Policy (coming soon)</span>
                    <span className={styles.informationItem}>Terms of Service (coming soon)</span>
                    <Link href="https://mammoth-bros-server-production.up.railway.app" passHref>
                        <a className={styles.statusItem}>
                            <img height={24} width={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACw0lEQVR4nO1ZPW8TQRA9QYMoKSiACgjwL9KhwI5vJg4uoCANNCAhAvRuIE6QCV8liugQCvbsAS38AKx0kCDxEyB0CQE7sdGcMcTBye2e9+4S8JOmsE43fm9mdndmz/MGGGAAp1Cv1WFgmgKNi6BxVUwxLSiNJXnm7WQojTdBYx00tXob1iHwJ7ydCND4eGvi3aY0PsyUbGGusFfKwQ/8k8NPx/epwD9nSn5DNsbkXfEhvsRn4sRzL3PHQeOs0rj0V2nYC+h6p+0TZ0eYjiVCXjFdVhp/2BO1MxX+B15ySh40XkiaOGwWwjTuhPwZphOKaSVtAcC0LCWb6u7i3vCBCwFfsxKgNC71RX60Onowu+hTaKfnCgfiR7+SP5W1AFXJD8UX8Ar2A1MzMwFMTeEQW0B4wjI1kiJ45c21KAENObHjRZ/pUZLRnardba0111ovPlXd70ag8VYa5DswEmHaxYb9fKzexsyma+Uu8gL5ffVtRDlprI9UR49EC9BYSivygvXmeqs8P2PoAydNymfR+WLcJvLTtbLx/yimDyYCVm3IP/v4PIzivfn7CUae2gI0fnMqQMhvJNRLhCvy0M7ASvQaYFowcSaLLqokXJQNdK+B9yYZmDR1WHrXO7qSCZeRhz8ldDtSgB/4h2wmr62i7DbyZL6NhlkI/Akb570y4TLy0I7+dc8GcvXhQoQT8kwzVuR/Z0LjmE0zt1lE3+SZGmeZ8rHIx22nOyJcRB76bafjDjSyWPtbsORmoNn1I2XmQz3TF8/7369VVCU/JJdMqZNnWnZ2T5pjOp96+QT+RW83Xu4C03fnl7sdSEoV0xNZXK6v10Hj59B3JX/USxryMUKavs4HjvDEthQgJ+zwrw8c4qtYLO7xsoTsGIn3NkkDmG5sV06yhqy7yrQh5SBDkQzgMsOKySQFTHfkWeqEBhjgH8dP91Ujkmbl3W8AAAAASUVORK5CYII=" alt="verified-account--v1"/>
                            <span>Server status</span>
                        </a>
                    </Link>
                    <Link href="https://mammoth-bros-contracts-production.up.railway.app/graphql" passHref>
                        <a className={styles.statusItem}>
                            <img height={24} width={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACw0lEQVR4nO1ZPW8TQRA9QYMoKSiACgjwL9KhwI5vJg4uoCANNCAhAvRuIE6QCV8liugQCvbsAS38AKx0kCDxEyB0CQE7sdGcMcTBye2e9+4S8JOmsE43fm9mdndmz/MGGGAAp1Cv1WFgmgKNi6BxVUwxLSiNJXnm7WQojTdBYx00tXob1iHwJ7ydCND4eGvi3aY0PsyUbGGusFfKwQ/8k8NPx/epwD9nSn5DNsbkXfEhvsRn4sRzL3PHQeOs0rj0V2nYC+h6p+0TZ0eYjiVCXjFdVhp/2BO1MxX+B15ySh40XkiaOGwWwjTuhPwZphOKaSVtAcC0LCWb6u7i3vCBCwFfsxKgNC71RX60Onowu+hTaKfnCgfiR7+SP5W1AFXJD8UX8Ar2A1MzMwFMTeEQW0B4wjI1kiJ45c21KAENObHjRZ/pUZLRnardba0111ovPlXd70ag8VYa5DswEmHaxYb9fKzexsyma+Uu8gL5ffVtRDlprI9UR49EC9BYSivygvXmeqs8P2PoAydNymfR+WLcJvLTtbLx/yimDyYCVm3IP/v4PIzivfn7CUae2gI0fnMqQMhvJNRLhCvy0M7ASvQaYFowcSaLLqokXJQNdK+B9yYZmDR1WHrXO7qSCZeRhz8ldDtSgB/4h2wmr62i7DbyZL6NhlkI/Akb570y4TLy0I7+dc8GcvXhQoQT8kwzVuR/Z0LjmE0zt1lE3+SZGmeZ8rHIx22nOyJcRB76bafjDjSyWPtbsORmoNn1I2XmQz3TF8/7369VVCU/JJdMqZNnWnZ2T5pjOp96+QT+RW83Xu4C03fnl7sdSEoV0xNZXK6v10Hj59B3JX/USxryMUKavs4HjvDEthQgJ+zwrw8c4qtYLO7xsoTsGIn3NkkDmG5sV06yhqy7yrQh5SBDkQzgMsOKySQFTHfkWeqEBhjgH8dP91Ujkmbl3W8AAAAASUVORK5CYII=" alt="verified-account--v1"/>
                            <span>Indexer status</span>
                        </a>
                    </Link>
                </div>
                <div className={styles.powered}>
                    <div className={styles.poweredTitle}>
                        powered by <Link href="https://forma.art/"><a className={styles.poweredLink} >Forma</a></Link> & <Link href="https://celestia.org/"><a className={styles.poweredLink}>Celestia</a></Link>
                    </div>
                    <div className={styles.poweredTitle}>
                        built for <Link href="https://mammothon.celestia.org/"><a className={styles.poweredLink}>Mammothon</a></Link> with ❤️
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
