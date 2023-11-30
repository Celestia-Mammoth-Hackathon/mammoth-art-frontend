// LeftElementCollection.js
import React from "react";
import styles from ".././LayoutCreate.module.sass";
import cn from "classnames";
import Field from "@/components/Field";

type LeftElementProps = {
    name: string;
    description: string;
    bannerImage: any;
    collectionImage: any;
    setName: any;
    setDescription: any;
    setBannerImage: any;
    setCollectionImage: any;
};

const LeftElementCollection = ({
  name,
  description,
  bannerImage,
  collectionImage,
  setName,
  setDescription,
  setBannerImage,
  setCollectionImage,
}: LeftElementProps) => {
  return (
    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                CREATE A COLLECTION
                            </div>
                        </div>

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
                                placeholder="Enter in a description"
                                icon="email"
                                type="email"
                                value={description}
                                onChange={(e: any) => setDescription(e.target.value)}
                                large
                                textarea
                                required
                            />
                            <span className={styles.label}>Upload Banner Image</span>
                            <Field
                                className={styles.field}
                                value={bannerImage}
                                onChange={(e: any) => {
                                    setBannerImage(e.target.files[0]);
                                }}
                                large
                                upload
                                required
                                setImage={setBannerImage}
                                bannerImage={true}
                            />
                            <span className={styles.label}>Upload Collection Image</span>
                            <Field
                                className={styles.field}
                                value={collectionImage}
                                onChange={(e: any) => {
                                    setCollectionImage(e.target.files[0]);
                                }}
                                large
                                upload
                                required
                                setImage={setCollectionImage}
                                collectionImage={true}
                            />
                        </form>
                    </>
  );
};

export default LeftElementCollection;
