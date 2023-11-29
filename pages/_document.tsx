import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta
                        content="Create Anything"
                        name="MRKT- NFT Marketplace. Create Anything.
                            Powered by Celestia"
                    />
                    <meta
                        content="MRKT- NFT Marketplace. Create Anything.
                                Powered by Celestia"
                        property="og:title"
                    />
                    <meta
                        content="Create Anything"
                        property="og:description"
                    />
                    <meta
                        content="%PUBLIC_URL%/fb-og-image.png"
                        property="og:image"
                    />
                    <meta
                        property="og:url"
                        content="https://ui8.net/ui8/products/crypter-v2-nft-marketplace-ui-kit"
                    />
                    <meta
                        property="og:site_name"
                        content="MRKT- NFT Marketplace. Create Anything.
                            Powered by Celestia"
                    />
                    <meta
                        content="MRKT- NFT Marketplace. Create Anything.
                            Powered by Celestia"
                        property="twitter:title"
                    />
                    <meta
                        content="Create Anything"
                        property="twitter:description"
                    />
                    <meta
                        content="%PUBLIC_URL%/twitter-card.png"
                        property="twitter:image"
                    />
                    <meta property="og:type" content="Article" />
                    <meta content="summary" name="twitter:card" />
                    <meta name="twitter:site" content="@ui8" />
                    <meta name="twitter:creator" content="@ui8" />
                    <meta property="fb:admins" content="132951670226590" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta name="theme-color" content="#000000" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
                        rel="stylesheet"
                    />
                    <link href="https://fonts.cdnfonts.com/css/ibm-plex-mono-3" rel="stylesheet"/>
                </Head>
                <body className="app">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
