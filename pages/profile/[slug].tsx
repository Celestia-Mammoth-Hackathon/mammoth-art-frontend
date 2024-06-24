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

    
    const artist = artistAddresses.find(a => a.slug === slug?.toLowerCase());

    if (!artist) {
        const user = {
            address: slug,
            bannerPic: "/images/gloverinterface_header_1800x500_.jpg",
            bio: "",
            collections: [],
            links: [],
            name: "Dash",
            profilePic: "/images/users/avatar-3.jpg",
            slug: ""
        }
        return <ProfilePage artist={user} />
    }

    return (
        <ProfilePage artist={artist} />
    )
};

export default Profile;
