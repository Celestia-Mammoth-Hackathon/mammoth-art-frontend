import LayoutCreate from "@/components/LayoutCreate";
import Deploy from "./Deploy"
const DeployPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="7" rightElement={<Deploy cid={cid}/>}/>
        </>

    );
};

export default DeployPage;
