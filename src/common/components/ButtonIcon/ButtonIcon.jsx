import React from "react";
import Button from "@mui/material/Button";
import "./ButtonIcon.scss";
import { useAuth } from "../../hooks/useAuth";
import { CircularProgress } from "@mui/material";

const ButtonIcon = ({ className, variant, startIcon, onClick, src, text }) => {
  const { loading } = useAuth();
  return (
    <div className="icon-container">
      <Button
        className={className}
        variant={variant}
        startIcon={startIcon}
        type="button"
        onClick={onClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress
            color="inherit"
            size="18px"
            variant="indeterminate"
          />
        ) : (
          <>
            {" "}
            {src && <img src={src} className="icon-image" />}
            {text}
          </>
        )}
      </Button>
    </div>
  );
};

export default ButtonIcon;
