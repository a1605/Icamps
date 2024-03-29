import React from "react";
import "./UpsertHeader.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FEATURE_MAPPING,
  PAGE_TYPE,
  PERMISSION_MAPPING,
} from "../../../../common/global.constant";
import { CreateUser, UpdateUser } from "../../services/userServices";
import { isDataValid } from "../../users.helper";
import { useAuth } from "../../../../common/hooks/useAuth";
import Button from "../../../../common/components/Button/Button";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../users.constant";

export const UpsertHeader = ({ userId, type, payload, screenType }) => {
  const navigate = useNavigate();

  const { setError, loading, setLoading, auth } = useAuth();

  const queryClient = useQueryClient();

  const handleSaveUserInfo = async () => {
    try {
      setLoading(true);
      if (isDataValid(payload, setError)) return;

      if (screenType === PAGE_TYPE.CREATE) {
        await CreateUser(payload);
      } else if (screenType === PAGE_TYPE.EDIT || type === PAGE_TYPE.PROFILE) {
        await UpdateUser(payload);
      }
      if (type === PAGE_TYPE.PROFILE) {
        navigate(`/users/profile/view/${userId}`);
        queryClient.invalidateQueries(QUERY_KEYS.GET_SINGLE_USER_ROLES, userId);
      } else navigate("/users");
    } catch (error) {
      if (error.request.status === 403) {
        toast.error("Access Denied!");
      } else toast.error(JSON.parse(error.request.response)?.message);
    } finally {
      setLoading(false);
    }
  };

  const buttonAccess = () => {
    if (type === PAGE_TYPE.PROFILE) return true;
    else if (
      (screenType === PAGE_TYPE.VIEW || screenType === PAGE_TYPE.EDIT) &&
      auth.screens[FEATURE_MAPPING["USER"]]?.includes(PERMISSION_MAPPING.UPDATE)
    )
      return true;
    else if (
      screenType === PAGE_TYPE.CREATE &&
      auth.screens[FEATURE_MAPPING["USER"]]?.includes(PERMISSION_MAPPING.CREATE)
    )
      return true;
    return false;
  };

  const headerTitle = () => {
    if (type === PAGE_TYPE.PROFILE) {
      return "Profile Setting";
    } else if (screenType === PAGE_TYPE.CREATE) {
      return "Create User";
    } else if (screenType === PAGE_TYPE.EDIT) {
      return "Edit User";
    } else return "User Details";
  };

  return (
    <div className="upsert-header">
      <h1>{headerTitle()}</h1>

      <div className="control-buttons">
        {!(type === PAGE_TYPE.PROFILE && screenType === PAGE_TYPE.VIEW) && (
          <Button
            variant="outlined"
            clickHandler={() => {
              setError({
                title: [],
                message: [],
              });
              if (type === PAGE_TYPE.PROFILE)
                navigate(`/users/profile/view/${userId}`);
              else navigate(`/users`);
            }}
            className="cancel-button"
            text="Cancel"
          />
        )}

        {buttonAccess() && (
          <Button
            clickHandler={
              screenType === PAGE_TYPE.CREATE || screenType === PAGE_TYPE.EDIT
                ? handleSaveUserInfo
                : () => {
                    setError({
                      title: [],
                      message: [],
                    });
                    navigate(`/users/${type}/${PAGE_TYPE.EDIT}/${userId}`);
                  }
            }
            className="btn"
            text={
              screenType === PAGE_TYPE.CREATE || screenType === PAGE_TYPE.EDIT
                ? "Save"
                : "Edit"
            }
          />
        )}
      </div>
    </div>
  );
};
