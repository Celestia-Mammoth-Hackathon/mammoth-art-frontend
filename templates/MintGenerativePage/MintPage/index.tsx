import LayoutCreate from "@/components/LayoutCreate";
import Mint from "./Mint"
const MintPage = ({ cid } : any) => {
    return (
        <>
            <LayoutCreate step="6" rightElement={<Mint/>}/>
        </>
    );
};

export default MintPage;
