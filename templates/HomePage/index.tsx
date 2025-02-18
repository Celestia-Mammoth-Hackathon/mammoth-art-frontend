import Main from "./Main";
import CuratedCollections from "./CuratedCollections";
import OpenCollections from "./OpenCollections";
import LatestCollections from "./LatestCollections";
import RandomCollections from "./RandomCollections";
import { useState, useEffect, useMemo } from "react";
import useCollectionStore from "@/store/index";

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(true);
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
                console.log("Collections after fetch:", collections);
            } catch (error) {
                console.error("Error fetching collections:", error);
            }
        };
    
        fetchData();
    }, []);

    // Memoize collections to prevent unnecessary re-renders
    const allCuratedCollections = useMemo(() => Object.values(collections), [collections]);
    const allGenerativeCollections = useMemo(() => Object.values(generativeCollections), [generativeCollections]);

    useEffect(() => {
        if (!allGenerativeCollections.length || !allCuratedCollections.length) return;
        console.log(allGenerativeCollections, allCuratedCollections);
        setLatestCollections(allGenerativeCollections);
        setMainCollections(allGenerativeCollections);
        setRandomCollections(allGenerativeCollections);
        setCuratedCollections(allCuratedCollections);
    }, [allGenerativeCollections, allCuratedCollections]);

    useEffect(() => {
        if(!mainCollections.length || !latestCollections.length || !randomCollections.length || !curatedCollections.length) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [mainCollections, latestCollections, randomCollections, curatedCollections]);
    return loading ? (
        <></>
    ) : (
        <>
            <Main collections={mainCollections} />
            <CuratedCollections collections={curatedCollections} />
            <LatestCollections collections={latestCollections} />
            <RandomCollections collections={randomCollections} />
            {/* <OpenCollections /> */}
        </>
    );
};

export default HomePage;
