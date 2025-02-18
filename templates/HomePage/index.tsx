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
    const [curatedCollections, setCuratedCollections] = useState([]);

    const {
        collections,
        generativeCollections,
        fetchAllGenerativeCollections,
        fetchAllCollections
    } = useCollectionStore();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await fetchAllGenerativeCollections();
                await fetchAllCollections();
            } catch (error) {
                console.error("Error fetching drops:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const curatedCollections:any = Object.values(collections);
        const allGenerativeCollections:any = Object.values(generativeCollections);
        setLatestCollections(allGenerativeCollections);
        setMainCollections(allGenerativeCollections);
        setRandomCollections(allGenerativeCollections);
        setCuratedCollections(curatedCollections);
    }, [generativeCollections, collections]);

    return (
            loading ? (
                <></>
            ) : (
                <>
                    <Main collections={mainCollections}/>
                    <CuratedCollections collections={curatedCollections}/>
                    <LatestCollections collections={latestCollections}/>
                    <RandomCollections collections={randomCollections}/>
                    {/* <OpenCollections /> */}
                </>
            )
    );
};

export default HomePage;
