import type { NextPage } from "next";
import CreatePage from "@/templates/MintGenerativePage/Create/CreatePage";
import PreviewPage from "@/templates/MintGenerativePage/Create/PreviewPage";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import VisitOnDesktopPage from "@/templates/VisitOnDesktopPage";

const Create: NextPage = () => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { cid } = router.query;

    useEffect(() => {
        const checkIsMobile = () => {
            if (typeof window !== "undefined") {
                setIsMobile(window.innerWidth <= 1023);
            }
        };

        checkIsMobile();

        // Add event listener to check for mobile resizing
        window.addEventListener('resize', checkIsMobile);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    if(isMobile) {
        return <VisitOnDesktopPage />;
    }

    if(cid) {
        return <PreviewPage cid={cid}/>;
    }
    return <CreatePage />;
};

export default Create;
