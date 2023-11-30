// LeftElementCollection.js
import React from "react";
import styles from ".././LayoutCreate.module.sass";
import cn from "classnames";
import Field from "@/components/Field";

type LeftElementProps = {
    collection: any;
    nftName: string;
    nftDesc: string;
    edition: string;
    royalty: string;
    nftImage: any;
    options: any;
    setCollection: any;
    setNftName: any;
    setNftDesc: any;
    setEdition: any;
    setRoyalty: any;
    setNftImage: any;
};

const LeftElementNft= ({
    collection,
    nftName,
    nftDesc,
    edition,
    royalty,
    nftImage,
    options,
    setCollection,
    setNftName,
    setNftDesc,
    setEdition,
    setRoyalty,
    setNftImage,
}: LeftElementProps) => {
  return (
    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                CREATE AN NFT
                            </div>
                        </div>
                        <form
                            className={styles.form}
                            action=""
                            onSubmit={() => console.log("Submit")}
                        >
                            <span className={styles.label}>Select the collection your token will be part of.</span>
                            <Field
                                className={styles.field}
                                placeholder="Collection name"
                                icon="profile"
                                value={collection}
                                onChange={(e: any) => setCollection(e)}
                                options={options}
                                large
                                select
                                required
                            />
                            <span className={styles.label}> NFT Name</span>
                            <Field
                                className={styles.field}
                                placeholder="Collection name"
                                icon="profile"
                                value={nftName}
                                onChange={(e: any) => setNftName(e.target.value)}
                                large
                                required
                            />
                            <span className={styles.label}>Description</span>
                            <Field
                                className={styles.field}
                                placeholder="Enter in a description"
                                icon="email"
                                type="email"
                                value={nftDesc}
                                onChange={(e: any) => setNftDesc(e.target.value)}
                                large
                                textarea
                                required
                            />
                            <span className={styles.label}>Edition(s)</span>
                            <Field
                                className={styles.field}
                                placeholder="Enter in edition"
                                value={edition}
                                onChange={(e: any) => setEdition(e.target.value)}
                                large
                                number
                                required
                            />
                            <span className={styles.label}>Set a royalty percentage fee between 0% and 25%</span>
                            <Field
                                className={styles.field}
                                placeholder="Enter in royalty"
                                value={royalty}
                                onChange={(e: any) => setRoyalty(e.target.value)}
                                large
                                number
                                min="0"
                                max="25"
                                required
                            />
                            <span className={styles.label}>Upload NFT File</span>
                            <Field
                                className={styles.field}
                                value={nftImage}
                                onChange={(e: any) => {
                                    setNftImage(e.target.files[0]);
                                }}
                                large
                                upload
                                required
                                setImage={setNftImage}
                                nftImage={true}
                            />
                        </form>
                    </>
  );
};

export default LeftElementNft;
