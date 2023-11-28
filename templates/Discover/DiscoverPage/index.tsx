import { useRef, useState } from "react";
import Layout from "@/components/Layout";
import Main from "./Main";
import Catalog from "@/components/Catalog";
import Auctions from "@/components/Auctions";
import Collections from "./Collections";
import Artists from "./Artists";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { auctions } from "@/mocks/auctions";
import { tabsTime, nfts, statuses } from "@/mocks/nfts";
import Sorting from "../../../components/Catalog/Sorting";
import List from "@/components/List";

const HomePage = () => {
    const scrollToAll = useRef<any>(null);
    const scrollToNFTs = useRef<any>(null);
    const scrollToCollections = useRef<any>(null);
    const scrollToArtist = useRef<any>(null);
    const [sorting, setSorting] = useState<string>("all");
    const [time, setTime] = useState<string>("1-days");
    const [theme, setTheme] = useState<any>(false);
    const [filter, setFilter] = useState<any>(false);

    const [sortingTokens, setSortingTokens] = useState<string>("nfts");

    const tabsSorting = [
        // {
        //     title: "All",
        //     value: "all",
        //     anchor: scrollToAll,
        // },
        {
            title: "NFTs",
            value: "nfts",
            // counter: "456,789",
            anchor: scrollToNFTs,
        },
        {
            title: "Collections",
            value: "collections",
            // counter: "123,987",
            anchor: scrollToCollections,
        },
        // {
        //     title: "Artist",
        //     value: "artist",
        //     counter: "45,678",
        //     anchor: scrollToArtist,
        // },
    ];
    return (
        <>
            <Main scrollToRef={scrollToAll} />
            <List
                        tabs={tabsSorting}
                        tabsValue={sortingTokens}
                        setTabsValue={setSortingTokens}
                        light={theme}
                        discover={true}
                    >
                        {sortingTokens === "nfts" && (
                            <Catalog
                                title="Discover"
                                tabsSorting={tabsSorting}
                                tabsTime={tabsTime}
                                filters={statuses}
                                items={nfts}
                                scrollToRef={scrollToNFTs}
                            />
                        )}
                        {sortingTokens === "collections" && (
                            <Collections scrollToRef={scrollToCollections} />
                        )}
                    </List>

            {/* <Catalog
                title="NFTs"
                tabsSorting={tabsSorting}
                tabsTime={tabsTime}
                filters={statuses}
                items={nfts}
                scrollToRef={scrollToNFTs}
            />
            <Collections scrollToRef={scrollToCollections} /> */}

        </>
    );
};

export default HomePage;
