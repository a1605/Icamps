import React, { useEffect } from "react";
import CreateRoleBody from "../components/CreateRoleBody/CreateRoleBody";
import CreateRoleHeader from "../components/CreateRoleHeader/CreateRoleHeader";
import { createRole, updateRole } from "../services/rolesServices";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../common/hooks/useAuth";
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import { PAGE_TYPE } from "../../../common/global.constant";
import useFetchSingleRole from "../hooks/useFetchSingleRole";
import CircularLoader from "../../../common/components/CircularLoader/CircularLoader";
import { isDataValidRoles } from "../roles.helpers";

const CreateRole = () => {
  const navigate = useNavigate();

  const { auth, error, setError, loading, setLoading } = useAuth();

  const { pageType, id } = useParams();

  const [roleBody, setRoleBody] = React.useState({
    name: "",
    description: "",
    permissions: [],
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
    updatedOn: dateTransform(new Date()),
  });

  const { data, isLoading, isError, ...rolesError } = useFetchSingleRole(id);

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    if (pageType === PAGE_TYPE.EDIT || pageType === PAGE_TYPE.VIEW) {
      setRoleBody({
        ...roleBody,
        ...data?.data,
        permissions: data?.data?.permissions?.map((item) => item.permissionId),
      });
    }
    if (
      rolesError?.error?.response?.status === 404 ||
      rolesError?.error?.response?.status === 400
    ) {
      toast.error("Data Not found");
      navigate("/roles");
    }
  }, [data?.data, rolesError?.error]);

  const handleSave = async () => {
    if (isDataValidRoles(roleBody, error, setError)) return;
    try {
      setLoading(true);
      if (roleBody.permissions?.length === 0) {
        return toast.error("Select atleast one permission");
      }
      await createRole(roleBody);
      toast.success("Role created successfully");
      setLoading(false);
      navigate("/roles");
    } catch (error) {
      setLoading(false);
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (isDataValidRoles(roleBody, error, setError)) return;
    try {
      setLoading(true);
      if (roleBody.permissions.length === 0)
        return toast.error("Select atleast one permission");
      await updateRole({
        ...roleBody,
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
        updatedOn: dateTransform(new Date()),
      });
      toast.success("Role updated successfully.");
      navigate("/roles");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-role-wrapper">
        <CreateRoleHeader
          handleSave={handleSave}
          handleUpdate={handleUpdate}
          handleEdit={() => navigate("/roles/edit/" + id)}
        />
        {pageType === PAGE_TYPE.CREATE && (
          <CreateRoleBody
            roleBody={roleBody}
            setRoleBody={setRoleBody}
            setError={setError}
          />
        )}
        {pageType !== PAGE_TYPE.CREATE &&
          (!isLoading && !isError && roleBody?.permissions?.length > 0 ? (
            <CreateRoleBody
              roleBody={roleBody}
              setRoleBody={setRoleBody}
              setError={setError}
            />
          ) : (
            <CircularLoader />
          ))}
      </div>
    </>
  );
};

export default CreateRole;
