import type { NextPage } from "next";
import CreatePage from "@/templates/Create/CreatePage";
import PreviewPage from "@/templates/Create/PreviewPage";
import { useRouter } from 'next/router';

const Create: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;

    if(cid) {
        return <PreviewPage cid={cid}/>;
    }
    return <CreatePage />;
};

export default Create;
