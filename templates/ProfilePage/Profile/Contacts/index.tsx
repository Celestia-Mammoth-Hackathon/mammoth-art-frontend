import Link from "next/link";
import styles from "./Contacts.module.sass";
import Icon from "@/components/Icon";
import Skeleton from '@mui/material/Skeleton';

type LinksType = {
    title: string;
    icon: string;
    url: string;
};

type ContactsProps = {
    links: LinksType[];
    bio: string;
    loading?: boolean;
};

const Contacts = ({ links, bio, loading = false }: ContactsProps) => (
    <div className={styles.contacts}>
        <div className={styles.description}>
            <div className={styles.item}>
                <div className={styles.category}>bio</div>
                <div className={styles.content}>
                    {loading 
                    ?   <>
                            <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width="100%"/>
                            <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width="100%"/>
                            <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width="100%"/>
                        </>
                    : bio}
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.category}>links</div>
                <div className={styles.links}>
                    {
                        loading
                        ?   <>
                                <Skeleton variant="circular" sx={{ bgcolor: '#141414' }} height={24} width={24}/>
                                <Skeleton variant="text" sx={{ bgcolor: '#141414' }} height={24} width={100}/>
                            </>
                        : links.map((link, index) => (
                            <Link href={link.url} key={index}>
                                <a className={styles.link} target="_blank" rel="noopener noreferrer">
                                    <Icon name={link.icon} />
                                    {link.title}
                                </a>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
);

export default Contacts;
