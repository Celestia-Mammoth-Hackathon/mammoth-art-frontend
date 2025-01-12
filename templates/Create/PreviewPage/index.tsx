import LayoutCreate from "@/components/LayoutCreate";
import Preview from "./Preview"
const PreviewPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="2" rightElement={<Preview cid={cid}/>}/>
        </>
    );
};

export default PreviewPage;
