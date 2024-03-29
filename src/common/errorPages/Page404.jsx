import React from "react";
import { Page404img } from "../../assets/images";
import "../../App.scss";
import "./Page404.scss";
const Page404 = () => {
  return (
    <div className="error404-page-wrapper">
      <div className="error-page-container">
        <img className="image-align" src={Page404img} alt="404-error" />
        <label className="error-type">Error 404</label>
        <label className="error-sub-heading">Page Not Found</label>
        <span className="error-description">
          We are sorry, the page you requested could not be found.
        </span>
      </div>
    </div>
  );
};

export default Page404;
