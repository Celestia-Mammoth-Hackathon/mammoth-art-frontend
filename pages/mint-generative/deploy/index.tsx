import type { NextPage } from "next";
import DeployPage from "@/templates/MintGenerativePage/DeployPage";
import { useRouter } from 'next/router';

const Deploy: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;
    
    return <DeployPage cid={cid}/>;
    

};

export default Deploy;
