import type { NextPage } from "next";
import DetailsPage from "@/templates/MintGenerativePage/DetailsPage";
import { useRouter } from 'next/router';

const Details: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;

    return <DetailsPage cid={cid}/>;
    

};

export default Details;
