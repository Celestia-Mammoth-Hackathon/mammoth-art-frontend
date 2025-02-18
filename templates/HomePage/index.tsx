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
        let isMounted = true; // Flag to track if component is still mounted

        const fetchData = async () => {
            try {
                setLoading(true);
                await Promise.all([fetchAllGenerativeCollections(), fetchAllCollections()]);
            } catch (error) {
                console.error("Error fetching collections:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup to avoid setting state on unmounted component
        };
    }, []);

    // Memoize collections to prevent unnecessary re-renders
    const allCuratedCollections = useMemo(() => Object.values(collections), [collections]);
    const allGenerativeCollections = useMemo(() => Object.values(generativeCollections), [generativeCollections]);

    useEffect(() => {
        if (!allGenerativeCollections.length || !allCuratedCollections.length) return;

        setLatestCollections(allGenerativeCollections);
        setMainCollections(allGenerativeCollections);
        setRandomCollections(allGenerativeCollections);
        setCuratedCollections(allCuratedCollections);
    }, [allGenerativeCollections, allCuratedCollections]);

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
