import styles from "./CreateCongratsPage.module.sass";
import Layout from "@/components/Layout";
import Congrats from "@/components/Congrats";

const CreatPage = () => {
    return (
        <>
            <Congrats
                title="Congrats"
                content={
                    <>
                        You’ve now deployed your very own smart contract!{" "}
                        <br></br>This is an important first step for all
                        creators to make as you share your work and mint NFTs in
                        web3.
                    </>
                }
            />
        </>
    );
};

export default CreatPage;
