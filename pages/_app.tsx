import "../styles/app.sass";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Layout layoutNoOverflow>
            <Component {...pageProps} />
        </Layout>
    )
    
    ;
}

export default MyApp;
