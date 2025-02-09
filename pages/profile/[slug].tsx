import type { NextPage } from "next";
import ProfilePage from "@/templates/ProfilePage";
import Error404Page from "@/templates/Error404Page";
import { useRouter } from 'next/router';
import { artistAddresses } from "@/constants/details";

const Profile: NextPage = () => {
    const router = useRouter();
    const slug = Array.isArray(router.query.slug) ? router.query.slug[0] : router.query.slug;

    if (!slug) {
        return <></>
    }

    return (
        <ProfilePage userAddress={slug} />
    )
};

export default Profile;
