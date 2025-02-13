import LayoutCreate from "@/components/LayoutCreate";
import Details from "./Details"
const DetailsPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="6" rightElement={<Details cid={cid}/>}/>
        </>
    );
};

export default DetailsPage;
