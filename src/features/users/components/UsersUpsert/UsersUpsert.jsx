import React, { useEffect } from "react";
import "./UsersUpsert.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpsertHeader,
  UpsertUserPermission,
  UpsertUserProfile,
} from "../index";
import { useFetchSingleUserRoles } from "../../hooks";
import { useAuth } from "../../../../common/hooks/useAuth";
import { dateTransform } from "../../../../common/helperFunction/dateTransform";
import { toast } from "react-hot-toast";

export const UsersUpsert = () => {
  const { type, id, screenType } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [payload, setPayload] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    status: true,
    updatedBy: auth.userDetails.email,
    updatedOn: dateTransform(new Date()),
    roles: [],
  });
  const { data, ...userError } = useFetchSingleUserRoles(id);
  useEffect(() => {
    if (userError?.error?.response?.status === 404) {
      toast.error("Data Not found");
      navigate("/users");
    }
  }, [userError]);

  return (
    <div className="upsert-container">
      <UpsertHeader
        userId={id}
        type={type}
        payload={payload}
        screenType={screenType}
      />
      <div className="upsert-action-area page-  background">
        <h3 className="section">Profile</h3>
        <UpsertUserProfile
          type={type}
          payload={payload}
          setPayload={setPayload}
          screenType={screenType}
        />
        <h3 className="section">Role & permissions details preview</h3>
        <UpsertUserPermission
          type={type}
          setPayload={setPayload}
          userRolesPermissions={data}
          screenType={screenType}
        />
      </div>
    </div>
  );
};

export default UsersUpsert;
