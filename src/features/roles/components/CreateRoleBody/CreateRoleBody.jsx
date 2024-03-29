import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

// Components
import MultiCheckbox from "../multiCheckbox/MultiCheckbox";

// Constant
import { PERMISSION_NAME, ROLE_PERMISSION_VALUES } from "../../roles.constant";
import { PAGE_TYPE } from "../../../../common/global.constant";

// Hooks
import { useFetchPermissions } from "../../hooks/useFetchPermissions";

// Helper
import {
  autoSelectPermission,
  transformPermissionData,
} from "../../roles.helpers";

// SCSS
import "./CreateRoleBody.scss";
import InputBox from "../../../../common/components/InputBox/InputBox";

const CreateRoleBody = ({ roleBody, setRoleBody, setError }) => {
  const { pageType } = useParams();

  // Hooks Call
  const { data, isLoading, isError } = useFetchPermissions();

  const permissionData = useMemo(
    () => !isLoading && !isError && transformPermissionData(data?.data),
    [data, isLoading, isError]
  );

  const handleChange = (event) => {
    setError({
      title: [],
      message: [],
    });
    setRoleBody({ ...roleBody, [event.target.name]: event.target.value });
  };
  const handleSelectedPermissions = (event, allValues) => {
    let arr = [];

    if (event.target.checked)
      if (event.target.value === "all") {
        PERMISSION_NAME.map((item) => {
          if (
            allValues[item] &&
            !roleBody.permissions.includes(allValues[item])
          ) {
            arr.push(allValues[item]);
          }
        });
        setRoleBody({
          ...roleBody,
          permissions: [...roleBody.permissions, ...arr],
        });
      } else
        autoSelectPermission(
          event.target.value,
          allValues,
          setRoleBody,
          roleBody
        );
    else if (event.target.value === "all") {
      const valueToRemove = PERMISSION_NAME.map((item) => allValues[item]);
      arr = roleBody.permissions.filter(
        (item) => !valueToRemove.includes(item)
      );
      setRoleBody({
        ...roleBody,
        permissions: [...arr],
      });
    } else
      setRoleBody({
        ...roleBody,
        permissions: roleBody.permissions.filter(
          (item) => item != event.target.value
        ),
      });
  };

  const permissionSection = (item, indexes) => (
    <div className="create-role-permissions-section" key={indexes}>
      <h4>{item.title}</h4>
      {item.sections.map((obj, index) => {
        const givenPermission = permissionData[obj.sectionHeading];

        // Rough Work
        let permissionMapping = {};
        givenPermission.map((item) => {
          permissionMapping[item.name] = item.permissionId;
        });

        if (givenPermission)
          return (
            <div key={`${index}-${indexes}`}>
              {obj.sectionHeading === "os" && <label>OS</label>}
              {obj.sectionHeading === "issue" && <label>issue & action</label>}
              {obj.sectionHeading === "about icamps" && <label>About</label>}
              {obj.sectionHeading === "cyber cell" && (
                <label>Cyber Security</label>
              )}
                {obj.sectionHeading === "sms" && <label>SMS</label>}
              {obj.sectionHeading !== "os" &&
                obj.sectionHeading !== "issue" &&
                obj.sectionHeading !== "sms" &&
                obj.sectionHeading !== "cyber cell" &&
                obj.sectionHeading !== "about icamps" && (
                  <label>{obj.sectionHeading}</label>
                )}

              <div className="checkbox-section">
                {obj.checkboxSection.map((itm, idx) => (
                  <MultiCheckbox
                    key={idx}
                    title={item.title}
                    sectionHeading={obj.sectionHeading}
                    sectionIdx={idx}
                    handleSelectedPermissions={handleSelectedPermissions}
                    choices={itm}
                    givenPermission={givenPermission}
                    selectedValues={roleBody}
                  />
                ))}
              </div>
            </div>
          );
      })}
    </div>
  );

  return (
    <div
      className={`create-role-body ${
        pageType === PAGE_TYPE.VIEW && "view-role"
      }`}
    >
      <h3>Role Info</h3>
      <div className="create-role-info-wrapper">
        <div className="create-role-name">
          <label>Role Name{pageType !== PAGE_TYPE.VIEW && "*"}</label>
          <InputBox
            size="small"
            name="name"
            title={"roleName"}
            onChange={handleChange}
            value={roleBody.name}
            placeholder="Enter Role Name"
            disabled={pageType === PAGE_TYPE.VIEW}
          />
        </div>
        <hr></hr>
        <div className="create-role-description">
          <label>Description</label>
          <InputBox
            size="small"
            name="description"
            onChange={handleChange}
            value={roleBody.description}
            placeholder="Enter Role Name"
            disabled={pageType === PAGE_TYPE.VIEW}
            title="rolesDescription"
          />
        </div>
      </div>
      <h3>Permissions</h3>
      <div className="create-role-permissions-wrapper">
        {!isLoading &&
          !isError &&
          data.data.length > 0 &&
          ROLE_PERMISSION_VALUES.map((item, index) =>
            permissionSection(item, index)
          )}
      </div>
    </div>
  );
};

export default CreateRoleBody;
