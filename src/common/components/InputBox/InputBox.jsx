import { OutlinedInput } from "@mui/material";
import React from "react";
import ErrorBox from "../Error/ErroBox";
import { useAuth } from "../../hooks/useAuth";
import "./InputBox.scss";

const InputBox = ({
  placeholder,
  className,
  value,
  onChange,
  name,
  sx,
  title,
  variant = "outlined",
  disabled,
}) => {
  const { error } = useAuth();
  return (
    <div className="common-input-box-container">
      <OutlinedInput
        variant={variant}
        placeholder={placeholder}
        size="small"
        className={`common-input-box ${className}`}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        sx={{
          ...(sx ? sx : {}),
          opacity: (theme) =>
            disabled ? theme.palette.action.disabledOpacity : 1,
        }}
        autoComplete="off"
        error={error.title.includes(title)}
      />
      <ErrorBox title={title} />
    </div>
  );
};

export default InputBox;
