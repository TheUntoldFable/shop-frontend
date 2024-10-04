import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "@material-tailwind/react";
import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { persistor, rootReducer } from "@/store/store";

import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Troyka Wear</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </Head>
      <ThemeProvider>
        <Provider store={rootReducer}>
          <PersistGate persistor={persistor}>
            <Layout component={Component} pageProps={pageProps} />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
