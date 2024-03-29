import React, { useMemo } from "react";
import "./UpsertUserPermission.scss";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import {
  transformPermissionsData,
  transformRolesFilterData,
} from "../../users.helper";
import { useFetchRoles } from "../../hooks";
import { PAGE_TYPE } from "../../../../common/global.constant";

export const UpsertUserPermission = ({
  type,
  setPayload,
  userRolesPermissions,
  screenType,
}) => {
  const { data: allRolesData, isLoading, isError } = useFetchRoles();

  const totalAvailableRoles = useMemo(
    () =>
      !isLoading && !isError
        ? transformRolesFilterData(allRolesData?.data)
        : [],
    [isLoading, isError, allRolesData?.data]
  );

  const [selectedRoles, setSelectedRoles] = React.useState([]);
  const [currentSelectedRoleId, setCurrentSelectedRoleId] = React.useState("");
  const [selectedRolePermissions, setSelectedRolePermissions] = React.useState(
    {}
  );

  // Roles DATA Handling
  React.useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      mobileNo: "",
      ...userRolesPermissions?.data,
      roles: userRolesPermissions?.data?.roles.map((item) => item.roleId) || [],
    }));

    const userAssignedRoles = transformRolesFilterData(
      userRolesPermissions?.data?.roles
    );
    setSelectedRoles(userAssignedRoles);
    userAssignedRoles[0] && setCurrentSelectedRoleId(userAssignedRoles[0].id);
    setSelectedRolePermissions(
      transformPermissionsData(
        userRolesPermissions?.data?.roles[0]?.permissions
      )
    );
  }, [allRolesData, userRolesPermissions]);

  const handleRoleDeletion = (roleId) => {
    const newRoles = selectedRoles?.filter((role) => role?.id !== roleId);
    setSelectedRoles(newRoles);
    setPayload((prev) => ({
      ...prev,
      roles: newRoles?.map((role) => role.id),
    }));
    setCurrentSelectedRoleId(newRoles[0]?.id);
    setSelectedRolePermissions(() => {
      return transformPermissionsData(
        allRolesData?.data?.find((item) => item.roleId === newRoles[0]?.id)
          ?.permissions
      );
    });
  };

  const handleDropDownSelectedRoles = (value) => {
    setSelectedRoles(value);
    setCurrentSelectedRoleId(value[0]?.id || "");
    setPayload((prev) => {
      return { ...prev, roles: value?.map((role) => role.id) };
    });
    setSelectedRolePermissions(() => {
      return transformPermissionsData(
        allRolesData?.data?.find((item) => item?.roleId === value[0]?.id)
          ?.permissions
      );
    });
  };

  return (
    <div className="user-permissions-container">
      {/* Roles Container */}
      <div className="roles-container">
        <div className="roles-header">
          <h2>Roles</h2>
          <div
            className={`dropdown ${
              type === PAGE_TYPE.PROFILE || screenType === PAGE_TYPE.VIEW
                ? "hidden"
                : "none"
            }`}
          >
            <DropdownMultiSelect
              optionData={totalAvailableRoles}
              placeholder="All Roles"
              selectedValues={selectedRoles}
              setSelectedValues={handleDropDownSelectedRoles}
              width={200}
              showChips={false}
              disabled={screenType === PAGE_TYPE.VIEW ? true : false}
              disableCloseOnSelect={true}
              searchable={true}
            />
          </div>
        </div>
        <ul className="roles-body">
          {selectedRoles.length > 0
            ? selectedRoles.map((role) => (
                <li
                  className={`role-item ${
                    currentSelectedRoleId === role?.id ? "active" : ""
                  }`}
                  key={role?.id}
                >
                  <span
                    onClick={() => {
                      setCurrentSelectedRoleId(role?.id);
                      setSelectedRolePermissions(() => {
                        return transformPermissionsData(
                          allRolesData?.data?.find(
                            (item) => item.roleId === +role?.id
                          )?.permissions
                        );
                      });
                    }}
                    className="role-label"
                  >
                    {role?.label}
                  </span>
                  {screenType !== PAGE_TYPE.VIEW &&
                    type !== PAGE_TYPE.PROFILE && (
                      <span onClick={() => handleRoleDeletion(role?.id)}>
                        x
                      </span>
                    )}
                </li>
              ))
            : (screenType === PAGE_TYPE.CREATE && (
                <p>Please Select a Role !</p>
              )) ||
              ((screenType === PAGE_TYPE.EDIT ||
                screenType === PAGE_TYPE.VIEW) && <p>No Roles Assigned !</p>)}
        </ul>
      </div>
      {/* Permissions Container */}
      <div className="permissions-container">
        <div className="permissions-header">
          <h2>Permissions</h2>
        </div>
        <ul className="permissions-body">
          {Array.isArray(Object.keys(selectedRolePermissions)) &&
            Object.keys(selectedRolePermissions)?.map(
              (category, indexValue) => (
                <li className="permission-category" key={indexValue}>
                  <div className="permission-category-header">
                    <h3>{category}</h3>
                  </div>
                  <ul className="permission-category-body">
                    {selectedRolePermissions[category]?.length > 0 &&
                      selectedRolePermissions[category]?.map((permission) => (
                        <li key={permission?.permissionId}>
                          <span className="dot"></span>
                          <span className="permission-name">
                            {permission?.name}
                          </span>
                        </li>
                      ))}
                  </ul>
                </li>
              )
            )}
        </ul>
      </div>
    </div>
  );
};
