import '../styles/global.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { CLIENT_ROUTES, KITCHEN_ROUTES } from '../constants/routes';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) router.push(CLIENT_ROUTES.LOGIN);

    if (user?.role === 'kitchen' && router.pathname !== KITCHEN_ROUTES.KITCHEN)
      router.push(KITCHEN_ROUTES.KITCHEN);

    if (user?.role === 'client') router.push(CLIENT_ROUTES.ORDER);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
