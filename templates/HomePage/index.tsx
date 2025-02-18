import Main from "./Main";
import CuratedCollections from "./CuratedCollections";
import OpenCollections from "./OpenCollections";
import LatestCollections from "./LatestCollections";
import RandomCollections from "./RandomCollections";
import { useState, useEffect, useMemo } from "react";
import useCollectionStore from '@/store/index';

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [latestCollections, setLatestCollections] = useState<any[]>([]);
    const [randomCollections, setRandomCollections] = useState<any[]>([]);
    const [mainCollections, setMainCollections] = useState<any[]>([]);
    const [curatedCollections, setCuratedCollections] = useState<any[]>([]);

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

    const allCuratedCollections = useMemo(() => Object.values(collections), [collections]);
    const allGenerativeCollections = useMemo(() => Object.values(generativeCollections), [generativeCollections]);

    useEffect(() => {
        if (!allGenerativeCollections.length || !curatedCollections.length) return;

        setLatestCollections(allGenerativeCollections);
        setMainCollections(allGenerativeCollections);
        setRandomCollections(allGenerativeCollections);
        setCuratedCollections(allCuratedCollections);
    }, [allGenerativeCollections, allCuratedCollections]);

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
