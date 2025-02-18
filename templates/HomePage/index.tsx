import Main from "./Main";
import CuratedCollections from "./CuratedCollections";
import OpenCollections from "./OpenCollections";
import LatestCollections from "./LatestCollections";
import RandomCollections from "./RandomCollections";
import { useState, useEffect } from "react";
import useCollectionStore from '@/store/index';

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [latestCollections, setLatestCollections] = useState([]);
    const [randomCollections, setRandomCollections] = useState([]);
    const [mainCollections, setMainCollections] = useState([]);

    const {
        generativeCollections,
        fetchAllGenerativeCollections
    } = useCollectionStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchAllGenerativeCollections();
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const collections:any = Object.values(generativeCollections);
        setLatestCollections(collections);
        setMainCollections(collections);
        setRandomCollections(collections);
    }, [generativeCollections]);

    return (
            loading ? (
                <></>
            ) : (
                <>
                    <Main collections={mainCollections}/>
                    <CuratedCollections />
                    <LatestCollections collections={latestCollections}/>
                    <RandomCollections collections={randomCollections}/>
                    {/* <OpenCollections /> */}
                </>
            )
    );
};

export default HomePage;
