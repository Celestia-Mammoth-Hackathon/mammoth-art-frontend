import Link from "next/link";
import cn from "classnames";
import styles from "./CreatePage.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Arrow from "@/components/Arrow";
import Icon from "@/components/Icon";
import Footer from "@/components/Footer";

const CreatPage = () => {
    return (
        <Layout layoutNoOverflow footerHide emptyHeader>
            <LayoutCreate
                left={
                    <>
                        <div className={cn("h1", styles.title)}>
                            Create
                        </div>
                        <Arrow className={styles.arrow} />
                        <div className={styles.content}>
                            Create a collection or select a 
                            collection to create a NFT under.
                        </div>
                    </>
                }
            >
                <div className={styles.head}>
                    <div className={styles.subtitle}>Your collection(s)</div>
                    <div className={styles.counter}>0</div>
                </div>
                <Link href="/create/step-1">
                    <a className={styles.add}>
                        <div className={styles.plus}></div>
                        <div className={styles.info}>Create a new collection</div>
                    </a>
                </Link>
                <div className={styles.list}>
                    {Array.from(Array(3).keys()).map((x) => (
                        <div className={styles.item} key={x}>
                            <div className={styles.preview}>
                                <Icon name="picture" />
                            </div>
                            <div className={styles.lines}></div>
                        </div>
                    ))}
                </div>
                {/* <div className={styles.foot}>
                    <Link href="/article">
                        <a className={styles.link}>
                            Learn about Collection on Crypter
                        </a>
                    </Link>
                </div> */}
            </LayoutCreate>
            <Footer />
        </Layout>
    );
};

export default CreatPage;
