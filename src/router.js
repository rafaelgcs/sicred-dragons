import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
// import { PartialRouteObject } from "react-router";

//
import BaseLayout from "./layouts/base.layout";
import SidebarLayout from "./layouts/sidebar.layout";

import SuspenseLoader from "./components/default/suspense_loader";

import { isAuthenticated } from "./services/auth";
import Signin from "./pages/auth/signin";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Dragons Page

const ListDragonsPage = Loader(lazy(() => import("./pages/dragons/list")));
const DragonCreatePage = Loader(lazy(() => import("./pages/dragons/create")));
const DragonDetailPage = Loader(lazy(() => import("./pages/dragons/details")));
const DragonEditPage = Loader(lazy(() => import("./pages/dragons/edit")));

// AUTHs

const AuthenticatedPage = ({ component: Component, initial }) =>
  isAuthenticated() ? (
    <>
      <Component />
    </>
  ) : (
    <Navigate to={{ pathname: `/${initial}/signin` }} />
  );

// Status

// const Status404 = Loader(lazy(() => import("./pages/status/status_404")));
// const Status500 = Loader(lazy(() => import("./pages/status/status_500")));
// const StatusComingSoon = Loader(
//   lazy(() => import("./pages/status/comming_soon"))
// );
// const StatusMaintenance = Loader(
//   lazy(() => import("./pages/status/maintenance"))
// );

const routes = [
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: (
          <AuthenticatedPage component={ListDragonsPage} initial={"auth"} />
        ),
      },
    ],
  },
  {
    path: "/dragon",
    element: <SidebarLayout />,
    children: [
      {
        path: "/dragon",
        element: <Navigate to={"/"} />,
      },
      {
        path: "/dragon/create",
        element: (
          <AuthenticatedPage component={DragonCreatePage} initial="auth" />
        ),
      },
      {
        path: "/dragon/:id",
        element: (
          <AuthenticatedPage component={DragonDetailPage} initial="auth" />
        ),
      },
      {
        path: "/dragon/edit/:id",
        element: (
          <AuthenticatedPage component={DragonEditPage} initial="auth" />
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <BaseLayout />,
    children: [
      {
        path: "/auth",
        element: <Navigate to={"/auth/signin"} />,
      },
      {
        path: "/auth/signin",
        element: <Signin />,
      },
    ],
  },
];

// const routes = [
//   // Website
//   {
//     path: "/",
//     element: <BaseLayout />,
//     children: [
//       {
//         path: "/",
//         element: <LandingPage />,
//       },
//     ],
//   },
//   {
//     path: "/status",
//     children: [
//       {
//         path: "/status",
//         element: <Navigate to="404" replace />,
//       },
//       {
//         path: "404",
//         element: <Status404 />,
//       },
//       {
//         path: "500",
//         element: <Status500 />,
//       },
//       {
//         path: "maintenance",
//         element: <StatusMaintenance />,
//       },
//       {
//         path: "coming-soon",
//         element: <StatusComingSoon />,
//       },
//     ],
//   },
//   {
//     path: "*",
//     element: <Status404 />,
//   },
// ];

export default routes;
