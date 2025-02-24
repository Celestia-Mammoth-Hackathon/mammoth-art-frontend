import type { NextPage } from "next";
import PreviewPage from "@/templates/MintGenerativePage/PreviewPage";
import { useRouter } from 'next/router';

const Preview: NextPage = () => {
    const router = useRouter();
    const { cid } = router.query;
    return <PreviewPage cid={cid} />;
};

export default Preview;
