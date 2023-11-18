import Layout from "@/components/Layout";
import Background from "@/components/Background";
import Profile from "./Profile";
import Footer from "@/components/Footer";

const PrfilePage = () => {
    return (
        <Layout layoutNoOverflow lightHeader footerHide>
            <Background image="/images/background-1.jpg" />
            <Profile />
            <Footer />
        </Layout>
    );
};

export default PrfilePage;
