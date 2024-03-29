import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowDropDownRounded } from "@mui/icons-material";

// Component
import Button from "../../../common/components/Button/Button";

// Constant
import { PERMISSION_MAPPING } from "../../../common/global.constant";
import { useAuth } from "../../../common/hooks/useAuth";

// CSS
import "./BulkUploadListingHeader.scss";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import InputBox from "../../../common/components/InputBox/InputBox";
import ErrorBox from "../../../common/components/Error/ErroBox";
import {
  BULK_UPLOAD_FILTER,
  BULK_UPLOAD_FILTER_ALTER,
} from "../bulkUpload.constant";
import { useFetchAssigneeList } from "../../../hooks/useFetchAssigneeList";

const BulkUploadListingHeader = ({
  title,
  screenType = "",
  permissionTitle,
  bulkUploadTitle,
  bulkNavigate,
  handleSubmit,
  disabled = false,
  filterHandler,
  filterData,
  assigneeData,
  setAssigneeData,
}) => {
  const navigate = useNavigate();
  const handleBulkNavigate = () => navigate(bulkNavigate);

  const { auth } = useAuth();

  const { data, isLoading, isError } = useFetchAssigneeList(
    assigneeData?.permissionData
  );

  const [status, setStatus] = useState({ id: "", label: "" });
  const handleDropData = (screenType) => {
    switch (screenType) {
      case "network":
      case "cyber-security":
        return BULK_UPLOAD_FILTER_ALTER;
      default:
        return BULK_UPLOAD_FILTER;
    }
  };
  return (
    <div className="content-bulk-header-container">
      <header className="header-container">
        <div className="header-title-wrapper">
          <div className="header-title">{title}</div>
          <div
            style={{
              fontSize: 12,
            }}
          >
            <InputBox
              onChange={(e) => filterHandler(e.target.value, "sourceTicketId")}
              value={filterData.sourceTicketId}
              placeholder={"Source Ticket Id*"}
              title={"bulkSource"}
            />
          </div>
          <div>
            <InputBox
              onChange={(e) => filterHandler(e.target.value, "count")}
              value={filterData.count}
              placeholder={"Enter row count*"}
              title={"bulkrowcount"}
            />
          </div>
          <div>
            <DropdownMultiSelect
              optionData={handleDropData(screenType)}
              placeholder="All Status*"
              selectedValues={status}
              setSelectedValues={(value) => {
                setStatus(value);
                filterHandler(value, "status");
              }}
              width={200}
              showChips={false}
              disableCloseOnSelect={false}
              multiple={false}
              title={"statusBulkDropDown"}
            />
            <ErrorBox title="statusBulkDropDown" />
          </div>

          <div className="select-container-header">
            <select
              name="bulkAssignee"
              id="assignee"
              onChange={(e) =>
                setAssigneeData({
                  ...assigneeData,
                  assignee: e.target.value,
                })
              }
              {...((isError) && {
                className: "error-select",
              })}
              disabled={
                isError ||
                data?.data.length === 0 ||
                status?.id === "IN_PROGRESS"
              }
              placeholder="Select Assignee"
              value={assigneeData?.assignee}
            >
              <option value="">Select Assignee</option>
              {data?.data.length > 0 &&
                data?.data.map((item) => (
                  <option value={item.email} key={item.email}>
                    {item.email}
                  </option>
                ))}
            </select>
            <ArrowDropDownRounded className="select-dropdown-icon" />
          </div>
        </div>
        <div className="button-section">
          <Button
            clickHandler={handleBulkNavigate}
            text="Cancel"
            variant="outlined"
          />

          {screenType !== "approval" &&
            screenType !== "advisor" &&
            bulkUploadTitle &&
            bulkUploadTitle !== "" &&
            auth.screens[permissionTitle]?.includes(
              PERMISSION_MAPPING.CREATE
            ) && <Button clickHandler={handleSubmit} text="Submit" />}
        </div>
      </header>
    </div>
  );
};

export default BulkUploadListingHeader;
