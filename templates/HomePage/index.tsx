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
                const [cleanupGen, cleanupColl] : [any, any]  = await Promise.all([
                    fetchAllGenerativeCollections(),
                    fetchAllCollections()
                ]);
                if (isMounted) setLoading(false);

                // Return a single cleanup function that handles both
                return () => {
                    if (typeof cleanupGen === 'function') cleanupGen();
                    if (typeof cleanupColl === 'function') cleanupColl();
                };
            } catch (error) {
                console.error("Error fetching collections:", error);
                if (isMounted) setLoading(false);
                // Return a no-op function if there's an error
                return () => {};
            }
        };

        let isMounted = true;
        const cleanupPromise = fetchData();

        return () => {
            isMounted = false;
            // Handle the promise resolution
            cleanupPromise.then((cleanup: (() => void) | undefined) => {
                if (typeof cleanup === 'function') cleanup();
            });
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
