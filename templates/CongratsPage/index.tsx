import styles from "./CongratsPage.module.sass";
import Layout from "@/components/Layout";
import Congrats from "@/components/Congrats";

const CongratsPage = () => {
    return (
        <>
            <Congrats
                title="Awesome"
                content="Congratulations! You successfully purchased Escape NFT."
            />
        </>
    );
};

export default CongratsPage;
