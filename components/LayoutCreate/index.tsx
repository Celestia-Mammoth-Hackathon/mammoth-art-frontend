import styles from "./LayoutCreate.module.sass";
import { useEffect, useState } from "react";
import cn from "classnames";
import List from "@/components/List";
import Preview from "../../templates/Create/CreateStep1Page/Preview"
import Field from "@/components/Field";

type LayoutCreateProps = {
    left: React.ReactNode;
    children: React.ReactNode;
};

const LayoutCreate = ({ left, children }: LayoutCreateProps) => {
    const [theme, setTheme] = useState<any>(false);
    const [sortingTokens, setSortingTokens] = useState<string>("");
    const [leftElement, setLeftElement] = useState<any>(null);
    const [rightElement, setRightElement] = useState<any>(null);

    const [name, setName] = useState<string>("");
    const [symbol, setSymbol] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [bannerImage, setBannerImage] = useState<any>("");
    const [collectionImage, setCollectionImage] = useState<any>("");

    const [collection, setCollection] = useState<string>("")
    const [nftName, setNftName] = useState<string>("");
    const [nftDesc, setNftDesc] = useState<string>("");
    const [edition, setEdition] = useState<string>("");
    const [royalty, setRoyalty] = useState<string>("");
    const [nftImage, setNftImage] = useState<any>(""); 

    const tabsSorting = [
        {
            title: "Create NFT",
            value: "nft",
        },
        {
            title: "Create Collection",
            value: "collection",
        },
    ];

    const collections = [
        "Da Best NFTs",
        "Da Greatest NFTs"
    ]
    useEffect(() => {
        // Check if sortingTokens is 'nfts'
        if (sortingTokens === "collection") {
            setLeftElement(
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
            );
            setRightElement(
                <Preview 
                    name={name}
                    description={description}
                    collectionImage={collectionImage}
                    bannerImage={bannerImage}
                />
            );
        } else if(sortingTokens === "nft") {
            setLeftElement(
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
                                onChange={(e: any) => setCollection(e.target.value)}
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
            setRightElement(
                <Preview 
                    collection={collection}
                    edition={edition}
                    royalty={royalty}
                    name={nftName}
                    description={nftDesc}
                    bannerImage={nftImage}
                    nft={true}
                />
            );
        } else {
            setLeftElement(
                <>
                        <div className={cn("h1", styles.title)}>
                            Create An NFT
                        </div>
                        
                        <div className={styles.content}>
                        You haven’t created a collection yet. To create a NFT, you must
                        first create a collection and then mint your NFT under that collection.
                        </div>
                        <button className={styles.noColButton}>
                            CREATE COLLECTION
                        </button>
                    </>
            )
            setRightElement(
                <></>
            )
        }
    }, [bannerImage, collectionImage, description, edition, name, nftDesc, nftImage, nftName, royalty, sortingTokens]);

    return (
        <div className={styles.row}>
        <List
            tabs={tabsSorting}
            tabsValue={sortingTokens}
            setTabsValue={setSortingTokens}
            light={theme}
            create={true}
        >
            <div className={styles.col}>
                <div className={styles.wrap}>{leftElement}</div>
            </div>
            <div className={styles.col}>
                {rightElement}
            </div>
        </List>
        
    </div>
    )
    
};

export default LayoutCreate;
