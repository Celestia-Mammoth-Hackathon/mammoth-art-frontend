import LayoutCreate from "@/components/LayoutCreate";
import Details from "./Details"
const DetailsPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="5" rightElement={<Details/>}/>
        </>
    );
};

export default DetailsPage;
