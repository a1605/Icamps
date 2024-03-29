import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// Component Import
import Button from "../../../../common/components/Button/Button";

// SCSS
import "./CreateRoleHeader.scss";
import { PAGE_TYPE } from "../../../../common/global.constant";

const CreateRoleHeader = ({ handleSave, handleUpdate, handleEdit }) => {
  const navigate = useNavigate();

  const { pageType } = useParams();

  const handleCancel = () => navigate("/roles");

  const headingValue = () => {
    switch (pageType) {
      case PAGE_TYPE.CREATE:
        return PAGE_TYPE.CREATE;
      case PAGE_TYPE.VIEW:
        return PAGE_TYPE.VIEW;
      case PAGE_TYPE.EDIT:
        return PAGE_TYPE.EDIT;
    }
  };

  return (
    <header className="create-role-header">
      <h3 className="create-role-title">{`${headingValue()} Role`}</h3>
      <div>
        <Button
          variant={"outlined"}
          text={"Cancel"}
          clickHandler={handleCancel}
        />
        &nbsp;
        {headingValue().toLowerCase() === PAGE_TYPE.CREATE && (
          <Button text={"Save"} clickHandler={handleSave} />
        )}
        {headingValue().toLowerCase() === PAGE_TYPE.EDIT && (
          <Button text={"Save"} clickHandler={handleUpdate} />
        )}
        {headingValue().toLowerCase() === PAGE_TYPE.VIEW && (
          <Button text={"Edit"} clickHandler={handleEdit} />
        )}
      </div>
    </header>
  );
};

export default CreateRoleHeader;
