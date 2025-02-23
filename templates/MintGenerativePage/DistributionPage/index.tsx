import LayoutCreate from "@/components/LayoutCreate";
import Distribution from "./Distribution"
const DistributionPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="4" rightElement={<Distribution cid={cid}/>}/>
        </>
    );
};

export default DistributionPage;
