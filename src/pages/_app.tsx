import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/src/layout/layout';

import '@/src/styles/globals.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Head>
        <title>Events Line</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Find a lot of great events that allow you to be aware of events" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;