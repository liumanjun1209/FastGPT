import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import QueryClientContext from '@/web/context/QueryClient';
import ChakraUIContext from '@/web/context/ChakraUI';
import '@/web/styles/reset.scss';
import { type ReactElement } from 'react';
import { type NextPage } from 'next';

type NextPageWithLayout = NextPage & {
  setLayout?: (page: ReactElement) => JSX.Element;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const setLayout = Component.setLayout || ((page) => <>{page}</>);

  return (
    <QueryClientContext>
      <ChakraUIContext>{setLayout(<Component {...pageProps} />)}</ChakraUIContext>
    </QueryClientContext>
  );
}

export default appWithTranslation(App);
