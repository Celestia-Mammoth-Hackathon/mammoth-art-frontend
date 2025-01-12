import LayoutCreate from "@/components/LayoutCreate";
import Upload from "./Upload";

const CreatPage = () => {
    return (
        <>
            <LayoutCreate step="1" rightElement={Upload}/>
        </>
    );
};

export default CreatPage;
