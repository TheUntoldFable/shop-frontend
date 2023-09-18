import "@/styles/globals.css";
import Head from "next/head";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Provider } from "react-redux";
import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { rootReducer } from "@/store/store";
import Layout from "@/components/Layout";
import Banner from "@/components/Banner";
import { appWithTranslation } from "next-i18next";

config.autoAddCss = false;

function App({ Component, pageProps }) {
  const isReleased = process.env.IS_REALEASED;
  return (
    <>
      <Head>
        <title>Troyka Wear</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://use.fontawesome.com/releases/vVERSION/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider store={rootReducer}>
        <PersistGate persistor={persistor}>
          {isReleased === "true" && <Banner />}
          <Layout component={Component} pageProps={pageProps}/>
        </PersistGate>
      </Provider>
    </>
  );
};

export default appWithTranslation(App);
