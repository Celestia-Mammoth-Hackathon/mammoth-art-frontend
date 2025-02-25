import Main from "./Main";
import CuratedCollections from "./CuratedCollections";
import OpenCollections from "./OpenCollections";
import LatestCollections from "./LatestCollections";
import RandomCollections from "./RandomCollections";
import { useState, useEffect } from "react";
import useCollectionStore from '@/store/index';
import { useUserContext } from "context/user";
import SkeletonMain from "./Skeleton/SkeletonMain";
import SkeletonCollections from "./Skeleton/SkeletonCollections";

const HomePage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [latestCollections, setLatestCollections] = useState([]);
    const [randomCollections, setRandomCollections] = useState([]);
    const [mainCollections, setMainCollections] = useState([]);
    const { address } = useUserContext();
    const {
        generativeCollections,
        fetchAllGenerativeCollections,
        fetchUserBalance
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
        const fetchUserCollections = async () => {
            try {
                await fetchUserBalance(address);
            } catch (error) {
                console.error("Error fetching user collections:", error);
            } 
        };

        if(address) {
            fetchUserCollections();
        }
    }, [address]);

    const getRandomCollections = (collections: any[], count: number) => {
        const shuffled = [...collections];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
      };

    useEffect(() => {
        const collections:any = Object.values(generativeCollections);
        const randomCollections:any = getRandomCollections(collections, 10);
        setLatestCollections(collections);
        setMainCollections(collections);
        setRandomCollections(randomCollections);
    }, [generativeCollections]);

    return (
            loading ? (
                <>
                    <SkeletonMain />
                    <CuratedCollections />
                    <SkeletonCollections sectionName="LATEST MINTS" />
                    <SkeletonCollections sectionName="RANDOMIZER" />
                </>
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
