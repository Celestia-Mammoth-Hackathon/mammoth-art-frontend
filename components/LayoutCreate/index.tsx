import styles from "./LayoutCreate.module.sass";
import { useEffect, useState } from "react";
import cn from "classnames";
import List from "@/components/List";
import Preview from "../../templates/Create/CreateStep1Page/Preview";
import LeftElementCollection from "./Collection/LeftElement";
import RightElementCollection from "./Collection/RightElement";
import LeftElementNft from "./Nft/LeftElement";
import RightElementNft from "./Nft/RightElement";
import Field from "@/components/Field";

type LayoutCreateProps = {
    left: React.ReactNode;
    children: React.ReactNode;
};

const collectionOptions = [
    {
        label: "Da Best NFTs",
        value: "Da Best NFTs",
    },
    {
        label: "Da Great NFTs",
        value: "Da Great NFTs",
    },
];

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

    const [collection, setCollection] = useState<string>("Da Best NFTs")
    const [nftName, setNftName] = useState<string>("");
    const [nftDesc, setNftDesc] = useState<string>("");
    const [edition, setEdition] = useState<string>("");
    const [royalty, setRoyalty] = useState<string>("");
    const [nftImage, setNftImage] = useState<any>(""); 

    const [isNftSubmitted, setIsNftSubmitted] = useState<boolean>(false);
    const [isCollectionSubmitted, setIsCollectionSubmitted] = useState<boolean>(false);
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

    useEffect(() => {
        // Check if sortingTokens is 'nfts'
        if (sortingTokens === "collection") {
            setLeftElement(
                <LeftElementCollection
                    name={name}
                    description={description}
                    bannerImage={bannerImage}
                    collectionImage={collectionImage}
                    setName={setName}
                    setDescription={setDescription}
                    setBannerImage={setBannerImage}
                    setCollectionImage={setCollectionImage}
                    isCollectionSubmitted={isCollectionSubmitted}
                />
            );
            setRightElement(
                <RightElementCollection
                    name={name}
                    description={description}
                    collectionImage={collectionImage}
                    bannerImage={bannerImage}
                    setIsCollectionSubmitted={setIsCollectionSubmitted}
                />
            );
        } else if(sortingTokens === "nft") {
            setLeftElement(
                <LeftElementNft
                    collection={collection}
                    nftName={nftName}
                    nftDesc={nftDesc}
                    edition={edition}
                    royalty={royalty}
                    nftImage={nftImage}
                    options={collectionOptions}
                    setCollection={setCollection}
                    setNftName={setNftName}
                    setNftDesc={setNftDesc}
                    setEdition={setEdition}
                    setRoyalty={setRoyalty}
                    setNftImage={setNftImage}
                    isNftSubmitted={isNftSubmitted}
                />
            );
            setRightElement(
                <RightElementNft 
                    collection={collection}
                    edition={edition}
                    royalty={royalty}
                    nftName={nftName}
                    nftDesc={nftDesc}
                    nftImage={nftImage}
                    setIsNftSubmitted={setIsNftSubmitted}
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
    }, [sortingTokens, collection, edition, royalty, nftImage, nftName, nftDesc, collectionImage, bannerImage, name, description, isNftSubmitted, isCollectionSubmitted]);

    return (
        <div className={styles.row}>
        <List
            tabs={tabsSorting}
            tabsValue={sortingTokens}
            setTabsValue={setSortingTokens}
            light={theme}
            create={true}
        >
            <form
                className={styles.form}
                action=""
                onSubmit={() => console.log("Submit")}
            >
                <div className={styles.col}>
                <div className={styles.wrap}>{leftElement}</div>
            </div>
            <div className={styles.col}>
                {rightElement}
            </div>

            </form>
            
        </List>
        
    </div>
    )
    
};

export default LayoutCreate;
