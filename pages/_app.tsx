import { AppProps } from "next/app";
import Head from "next/head";

import { CacheProvider, EmotionCache, Global } from "@emotion/react";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import StoreHydration from "@/shared/components/StoreHydration";
import createEmotionCache from "@/shared/lib/createEmotionCache";
import globalStyles from "@/shared/styles/globalStyles";
import theme from "@/shared/styles/theme";

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
    },
  },
});

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session: _session, ...pageProps },
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Base Template</title>
        <meta name="description" content="Base Template" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Global styles={globalStyles} />
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <StoreHydration />
            <Component {...pageProps} />
          </HydrationBoundary>

          <ReactQueryDevtools initialIsOpen={false} position="right" />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
