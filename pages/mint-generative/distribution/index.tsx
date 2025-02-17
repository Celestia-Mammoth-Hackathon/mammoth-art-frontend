import type { NextPage } from "next";
import DistributionPage from "@/templates/MintGenerativePage/DistributionPage";
import { useRouter } from 'next/router';

const Distribution: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;

    return <DistributionPage cid={cid}/>;
    

};

export default Distribution;
