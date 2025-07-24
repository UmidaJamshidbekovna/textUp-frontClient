import "@/styles/globals.scss";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/services/queryClient";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import NextAdapterPages from "next-query-params/pages";
import { QueryParamProvider } from "use-query-params";
import { AnimatePresence } from "framer-motion";
import { SidebarProvider } from "@/Providers/SidebarProvider";
import { useRouter } from "next/router";
import 'react-calendar/dist/Calendar.css';
import { ModalProvider } from "@/Providers/ModalContext";
import { OldStateProvider } from "@/Providers/GlobalStatesProvider";
import Head from "next/head";
import { ImageModalProvider } from "@/Providers/ImageModalContext";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{'Textup'}</title>
      </Head>
      <OldStateProvider>
        <ModalProvider>
          <SidebarProvider>
            <AnimatePresence exitBeforeEnter={false}>
              <ImageModalProvider>
                <QueryParamProvider adapter={NextAdapterPages}>
                  <QueryClientProvider client={queryClient}>
                    <ChakraProvider theme={theme}>
                      {/* <AppModal /> */}
                      <NextNProgress color="var(--primary-bg)" options={{ showSpinner: false }} />
                      <Component {...pageProps} key={router.route} />
                      {/* <ImageModal /> */}
                    </ChakraProvider>
                  </QueryClientProvider>
                </QueryParamProvider>
              </ImageModalProvider>
            </AnimatePresence>
          </SidebarProvider>
        </ModalProvider>
      </OldStateProvider>
    </>
  );
}

export default MyApp;
