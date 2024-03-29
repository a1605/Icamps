import { CircularProgress } from "@mui/material";
import "./Button.scss";
import { useAuth } from "../../hooks/useAuth";

const Button = ({ text, variant = "solid", clickHandler }) => {
  const { loading } = useAuth();
  return (
    <button
      className={`app-button ${variant} ${loading ? "disabled-button" : ""}`}
      type="button"
      onClick={clickHandler}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress color="inherit" size="18px" variant="indeterminate" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
