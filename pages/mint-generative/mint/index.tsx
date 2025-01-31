import type { NextPage } from "next";
import MintPage from "@/templates/MintGenerativePage/MintPage";
import { useRouter } from 'next/router';

const Mint: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;
    
    return <MintPage cid={cid}/>;
    

};

export default Mint;
