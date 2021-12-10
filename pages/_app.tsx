// import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'
import * as React from 'react';
import { useEffect } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { CacheProvider } from '@emotion/react';
import theme from '../src/theme';
// import Link from '../src/Link';
// import createEmotionCache from '../src/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

import type { AppProps /*, AppContext */ } from 'next/app';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  // emotionCache = clientSideEmotionCache,
}:AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, []);
  return (
    
      <SessionProvider session={session}>
        <Head>
          <title>My page</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
  
  )
}
