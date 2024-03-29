import React from "react";
import "./UsersHeader.scss";
import AddIcon from "@mui/icons-material/Add";
import ButtonIcon from "../../../../common/components/ButtonIcon/ButtonIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../common/hooks/useAuth";
import {
  PAGE_TYPE,
  PERMISSION_MAPPING,
} from "../../../../common/global.constant";

export const UsersHeader = () => {
  const navigate = useNavigate();

  const { auth } = useAuth();
  return (
    <header className="news-header">
      <div className="news-title-wrapper">
        <div className="news-title">Users</div>
      </div>
      {auth.screens.user?.includes(PERMISSION_MAPPING.CREATE) && (
        <ButtonIcon
          className="MuiButton-contained"
          text="Create New User"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/users/user/${PAGE_TYPE.CREATE}`)}
          color="white"
        />
      )}
    </header>
  );
};
