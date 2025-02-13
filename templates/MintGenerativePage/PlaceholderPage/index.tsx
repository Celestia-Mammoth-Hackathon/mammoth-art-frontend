import LayoutCreate from "@/components/LayoutCreate";
import Placeholder from "./Placeholder"
const PlaceholderPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="5" rightElement={<Placeholder cid={cid}/>}/>
        </>
    );
};

export default PlaceholderPage;
