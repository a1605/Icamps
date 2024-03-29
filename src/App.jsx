import React from "react";
import QueryWrapper from "./services/QueryWrapper";
import AuthProvider from "./context/UserContext";
import AppRoutes from "./routes/Routes";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <QueryWrapper>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryWrapper>
    </div>
  );
};

export default App;
