import LayoutCreate from "@/components/LayoutCreate";
import Render from "./Render";

const PreviewPage = ({cid}: {cid: any}) => {
    return (
        <>
            <LayoutCreate step="3" rightElement={<Render cid={cid}/>}/>
        </>
    );
};

export default PreviewPage;
