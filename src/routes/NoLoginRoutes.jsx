import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Login = lazy(() => import("../features/login"));

const NoLoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default NoLoginRoutes;
