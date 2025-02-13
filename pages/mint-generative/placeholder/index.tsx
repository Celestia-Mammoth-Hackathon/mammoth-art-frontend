import type { NextPage } from "next";
import PlaceholderPage from "@/templates/MintGenerativePage/PlaceholderPage";
import { useRouter } from 'next/router';

const Placeholder: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;

    return <PlaceholderPage cid={cid}/>;
    

};

export default Placeholder;
