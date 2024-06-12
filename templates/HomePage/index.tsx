import Main from "./Main";
import CuratedCollections from "./CuratedCollections";
import OpenCollections from "./OpenCollections";
import LatestCollections from "./LatestCollections";
import RandomCollections from "./RandomCollections";

const HomePage = () => {
    return (
            <>
                <Main />
                <CuratedCollections />
                <OpenCollections />
                <LatestCollections />
                <RandomCollections />
            </>
    );
};

export default HomePage;
