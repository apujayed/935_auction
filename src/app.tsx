// @ts-nocheck

import { Suspense, lazy, ComponentType, useEffect, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import useSWR from 'swr';
import CheckConnection from './components/connection/CheckConnection';
import Loading from './components/loading/loading';
import store from './store';
import Layout from './pages/layout';
import './devtooldetector.js'
import { Toaster } from 'react-hot-toast';

import PocketBase from 'pocketbase';
import { serverURL, secretKey } from "./config";
import encryptData from './security/encryption';

const pb = new PocketBase(serverURL);

const App = () => {
  const Dashboard = lazy(() => import("./pages/dashboard"));
  const Login = lazy(() => import("./pages/login"));
  const NotFound = lazy(() => import("./pages/404"));
  const Create = lazy(() => import("./pages/create"));
  const Report = lazy(() => import("./pages/report"));
  const Settings = lazy(() => import("./pages/settings"));
  const Unsold = lazy(() => import("./pages/unsold"));

  // const fetchCatalogs = async () => {
  //   const catalogs = await pb.collection('catalog').getFullList();
  //   return catalogs;
  // };

  // const { data, error } = useSWR('catalogs', fetchCatalogs, {
  //   revalidateIfStale: false,
  //   revalidateOnFocus: false,
  //   revalidateOnReconnect: false
  // });

  // useEffect(() => {
  //   (async () => {
  //     encryptData(data, `${secretKey}`, 'catalogs');
  //   })();
  // }, [data]);

  const withLayout = (Component: ComponentType) => (
    <Layout>
      <Component />
      <Toaster position="top-center" />
    </Layout>
  );

  // Memoize the router element
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: "/dashboard",
        element: withLayout(Dashboard),
      },
      {
        path: "/report",
        element: withLayout(Report),
      },
      {
        path: "/create",
        element: withLayout(Create),
      },
      {
        path: "/settings",
        element: withLayout(Settings),
      },
      {
        path: "/unsold",
        element: withLayout(Unsold),
      },
      {
        path: "*",
        element: withLayout(NotFound),
      },
    ]);
  }, []); // Empty dependency array to memoize once

  return (
    <CheckConnection>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        {pb.authStore.isValid ? <RouterProvider router={router} /> : <Login />}
      </Provider>
    </Suspense>
    </CheckConnection>
  );
};

export default App;
