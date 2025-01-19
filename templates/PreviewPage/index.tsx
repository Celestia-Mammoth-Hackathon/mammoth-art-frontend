import LayoutCreate from "@/components/LayoutCreate";
import Render from "./Render";

const PreviewPage = () => {
    return (
        <>
            <LayoutCreate step="3" rightElement={<Render/>}/>
        </>
    );
};

export default PreviewPage;
