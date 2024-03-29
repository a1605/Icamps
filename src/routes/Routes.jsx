import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import NoLoginRoutes from "./NoLoginRoutes";
import Layout from "../layouts/Layout";
import LoginRoutes from "./LoginRoutes";
import { useAuth } from "../common/hooks/useAuth";
import { Toaster } from "react-hot-toast";

TopBarProgress.config({
  barColors: {
    0: "#0E7AFE",
  },
  shadowBlur: 5,
});

const AppRoutes = () => {
  const { auth } = useAuth();

  return (
    <BrowserRouter>
      {!auth.isLogin ? (
        <Suspense fallback={<TopBarProgress />}>
          <Toaster position="top-right" />
          <NoLoginRoutes />
        </Suspense>
      ) : (
        <Layout>
          <Suspense fallback={<TopBarProgress />}>
            <Toaster position="top-right" />
            <LoginRoutes />
          </Suspense>
        </Layout>
      )}
    </BrowserRouter>
  );
};

export default AppRoutes;
