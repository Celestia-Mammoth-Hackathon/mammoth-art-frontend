import { useState } from "react";
import Link from "next/link";
import cn from "classnames";
import styles from "./CreateStep1Page.module.sass";
import Layout from "@/components/Layout";
import LayoutCreate from "@/components/LayoutCreate";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Preview from "./Preview";

const CreatPage = () => {
    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<any>("");

    return (
        <Layout layoutNoOverflow>
            <LayoutCreate
                left={
                    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                CREATE A COLLECTION
                            </div>
                            <Link href="/create">
                                <a className={cn("button-circle", styles.back)}>
                                    <Icon name="arrow-left" className={styles.arrow}/>
                                </a>
                            </Link>
                        </div>
                        {/* <div className={styles.info}>
                            Deploy a smart contract to showcase a series of NFT
                            artworks.
                        </div> */}
                        <form
                            className={styles.form}
                            action=""
                            onSubmit={() => console.log("Submit")}
                        >
                            <span className={styles.label}>Name</span>
                            <Field
                                className={styles.field}
                                placeholder="Collection name"
                                icon="profile"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                large
                                required
                            />
                            <span className={styles.label}>Description</span>
                            <Field
                                className={styles.field}
                                placeholder="Collection description"
                                icon="email"
                                type="email"
                                value={description}
                                onChange={(e: any) => setDescription(e.target.value)}
                                large
                                textarea
                                required
                            />
                            <span className={styles.label}>Upload Collection Image</span>
                            <Field
                                className={styles.field}
                                icon="email"
                                type="email"
                                value={description}
                                onChange={(e: any) => {
                                    setImage(e.target.files[0]);
                                }}
                                large
                                upload
                                required
                                setImage={setImage}
                            />
                            {/* <Link href="/create/step-2">
                                <a
                                    className={cn(
                                        "button-large",
                                        styles.button
                                    )}
                                >
                                    <span>Continue</span>
                                    <Icon name="arrow-right" />
                                </a>
                            </Link> */}
                        </form>
                    </>
                }
            >
                <Preview 
                    name={name}
                    description={description}
                    image={image}
                />
            </LayoutCreate>
        </Layout>
    );
};

export default CreatPage;
