import Link from "next/link";
import styles from "./Contacts.module.sass";
import Icon from "@/components/Icon";

type LinksType = {
    title: string;
    icon: string;
    url: string;
};

type ContactsProps = {
    links: LinksType[];
    bio: string;
};

const Contacts = ({ links, bio }: ContactsProps) => (
    <div className={styles.contacts}>
        <div className={styles.description}>
            <div className={styles.item}>
                <div className={styles.category}>bio</div>
                <div className={styles.content}>
                    {bio}
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.category}>links</div>
                <div className={styles.links}>
                    {links.map((link, index) => (
                        <Link href={link.url} key={index}>
                            <a className={styles.link} target="_blank" rel="noopener noreferrer">
                                <Icon name={link.icon} />
                                {link.title}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

export default Contacts;
