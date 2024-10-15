import { config } from "@fortawesome/fontawesome-svg-core";
import { ThemeProvider } from "@material-tailwind/react";
import { AppProps } from "next/app";
import localFont from "next/font/local";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import "@/styles/globals.css";

// eslint-disable-next-line import/order
import Layout from "@/components/Layout";

import "@fortawesome/fontawesome-svg-core/styles.css";

import { UIProvider } from "@/store/contexts/ui";
import { persistor, rootReducer } from "@/store/store";

config.autoAddCss = false;

const Euclid = localFont({
  src: [
    {
      path: "./../public/fonts/Euclid.ttf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./../public/fonts/Euclid_SemiBold.ttf",
      style: "semibold",
      weight: "700",
    },
    {
      path: "./../public/fonts/Euclid_Bold.ttf",
      style: "bold",
      weight: "900",
    },
  ],
});

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Troyka Wear</title>
        <meta
          name="p:domain_verify"
          content="f7520b69448e23b11a83c47c55fce461"
        />
        <meta name="description" content="Omne Trium Perfectum" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <ThemeProvider>
        <Provider store={rootReducer}>
          <PersistGate persistor={persistor}>
            <UIProvider>
              <main className={Euclid.className}>
                <Layout component={Component} pageProps={pageProps} />
              </main>
            </UIProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default appWithTranslation(App);
