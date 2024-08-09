import React, {lazy, Suspense} from 'react';
import {RouteObject, useRoutes} from "react-router-dom";
import {Loader} from "./components/loader/loader";

const HomePage = lazy(() => import('./pages/home-page/home-page'));
const HeroPage = lazy(() => import('./pages/hero-page/hero-page'));
const ErrorPage = lazy(() => import('./pages/error-page/error-page'));

const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/:heroId',
    element: <HeroPage />,
  },
  {
    path: 'not-found-page',
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];

const App: React.FC = () => {
  const routes = useRoutes(routesConfig);

  return (
    <Suspense fallback={<Loader />}>
      {routes}
    </Suspense>
  );
};

export default App;
