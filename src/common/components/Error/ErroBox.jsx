import React from "react";
import { useAuth } from "../../hooks/useAuth";
import "./ErrorBox.scss";

const ErrorBox = ({ title }) => {
  const { error } = useAuth();
  return error.title.includes(title) ? (
    <p className="custom-error-box">
      {error.message.filter((item) => item.title === title)[0].message}
    </p>
  ) : null;
};

export default ErrorBox;
