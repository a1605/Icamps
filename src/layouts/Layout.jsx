import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="main-content">
        <Sidebar />
        <div className="main-body">{children}</div>
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export default Layout;
