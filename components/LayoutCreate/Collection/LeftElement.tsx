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
    isCollectionSubmitted: boolean;
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
  isCollectionSubmitted,
}: LeftElementProps) => {
  return (
    <>
                        <div className={styles.head}>
                            <div className={cn("h1", styles.title)}>
                                CREATE A COLLECTION
                            </div>
                        </div>

                        <div>
                            <span className={styles.label}>Name</span>
                            <Field
                                className={styles.field}
                                placeholder="Collection name"
                                icon="profile"
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                                large
                                required
                                label="Enter a Collection name"
                                isSubmitted={isCollectionSubmitted}
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
                                label="Enter a description"
                                isSubmitted={isCollectionSubmitted}
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
                                label="Upload a banner image"
                                isSubmitted={isCollectionSubmitted}
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
                                label="Upload a collection image"
                                isSubmitted={isCollectionSubmitted}
                            />
                        </div>
                    </>
  );
};

export default LeftElementCollection;
