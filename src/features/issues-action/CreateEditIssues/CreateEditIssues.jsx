import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// Image assets
import { crossIcon } from "../../../assets/images";

// Hooks
import { useAuth } from "../../../common/hooks/useAuth";
import { useGetSingleIssue } from "../hooks/useGetSingleIssue";
import { useGetSingleAction } from "../hooks/useGetSingleAction";

// Constant File
import {
  ISSUE_ACTION_SCREEN_TYPE,
  ISSUE_QUERY_KEY,
  ISSUE_SEVERITY_LEVEL_DROPDOWN,
} from "../issuesAction.constant";
import {
  GLOBAL_STATUS,
  PAGE_TYPE,
  PRIMARY_INVENTORY,
  PRIMARY_INVENTORY_FILTER,
  SEVERITY_LEVEL,
} from "../../../common/global.constant";

// Components
import CircularLoader from "../../../common/components/CircularLoader/CircularLoader";
import RelatedAction from "../components/RelatedAction/RelatedAction";
import Button from "../../../common/components/Button/Button";

// Services
import {
  createSingleAction,
  createSingleIssue,
  updateSingleAction,
  updateSingleIssue,
} from "../services/issuesServices";

// Helper
import { dateTransform } from "../../../common/helperFunction/dateTransform";
import {
  actionHeadingName,
  isDataValidAction,
  isDataValidIssue,
  issueHeadingName,
} from "../issuesAction.helper";

// CSS
import "./CreateEditIssues.scss";

import ErrorBox from "../../../common/components/Error/ErroBox";
import InputBox from "../../../common/components/InputBox/InputBox";
import TextArea from "../../../common/components/Textarea/TextArea";

import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";

const CreateEditIssues = ({ page }) => {
  const { auth, error, setError, setLoading, loading } = useAuth();
  const { pageType, id, screenType } = useParams();
  const { data, isLoading, isError, ...singleIssueData } = useGetSingleIssue(
    id,
    screenType
  );
  const SingleActionData = useGetSingleAction(id, screenType);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (SingleActionData?.error?.response?.status === 404) {
      toast.error("Data Not found");
      navigate("/issues-action/action");
    }
    if (singleIssueData?.error?.response?.status === 404) {
      toast.error("Data Not found");
      navigate("/issues-action/issues");
    }
  }, [SingleActionData, singleIssueData]);

  const [issueData, setIssueData] = useState({
    name: "",
    description: "",
    status: GLOBAL_STATUS.APPROVED,
    sourceUrl: "",
    actionsId: [],
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
    updatedOn: dateTransform(new Date()),
    information: [],
    issueType: PRIMARY_INVENTORY.DEVICES,
    recommendedAction: "",
    severity: "",
    issueLevel: SEVERITY_LEVEL["Level-1"],
    issueIdentifier: "",
  });

  const [severityLevel, setSeverityLevel] = useState({
    id: "",
    label: "",
  });
  const [issueType, setIssueType] = useState(PRIMARY_INVENTORY_FILTER[0]);

  const [actionData, setActionData] = useState({
    name: "",
    description: "",
    identifier: "",
    actionSteps: "",
    updatedBy: `${auth.userDetails.email.toLowerCase()}`,
    updatedOn: dateTransform(new Date()),
  });

  const changeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });
    setIssueData({
      ...issueData,
      [e.target.name]: e.target.value,
    });
  };

  const actionChangeHandler = (e) => {
    setError({
      title: [],
      message: [],
    });
    setActionData({
      ...actionData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async () => {
    if (isDataValidIssue(issueData, error, setError)) return;
    try {
      setLoading(true);
      const body = {
        ...issueData,
        status: GLOBAL_STATUS.APPROVED,
        actionsId: issueData.actionsId.map((item) => item.id),
      };
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleIssue(body);
      } else {
        await updateSingleIssue(body);
      }
      navigate("/issues-action/issues");
      queryClient.invalidateQueries(
        ISSUE_QUERY_KEY.GET_ISSUE_LIST,
        page,
        { issueType: [], pagination: true, searchKeyword: "" },
        "ASC",
        "updatedOn"
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  const actionSubmitHandler = async () => {
    if (isDataValidAction(actionData, error, setError)) return;
    try {
      setLoading(true);
      if (pageType === PAGE_TYPE.CREATE) {
        await createSingleAction(actionData);
      } else {
        await updateSingleAction(actionData);
      }
      navigate("/issues-action/action");
      queryClient.invalidateQueries(
        ISSUE_QUERY_KEY.GET_ACTION_LIST,
        {
          searchKeyword: "",
        },
        0,
        "updatedOn",
        "DESC"
      );
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError({
      title: [],
      message: [],
    });
    if (
      (!pageType || pageType === PAGE_TYPE.CREATE) &&
      screenType === ISSUE_ACTION_SCREEN_TYPE.ISSUE
    ) {
      setIssueData({
        ...issueData,
        name: "",
        description: "",
        sourceUrl: "",
        actionsId: [],
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
        updatedOn: dateTransform(new Date()),
        severity: SEVERITY_LEVEL.Level_1,
        issueType: PRIMARY_INVENTORY.DEVICES,
        issueLevel: severityLevel.id,
        issueIdentifier: "",
        recommendedAction: "",
      });
      setIssueType(PRIMARY_INVENTORY_FILTER[0]);
      setSeverityLevel({
        id: "LEVEL_1",
        label: "Level-1",
      });
    } else if (
      pageType === PAGE_TYPE.CREATE &&
      screenType === ISSUE_ACTION_SCREEN_TYPE.ACTION
    ) {
      setActionData({
        name: "",
        description: "",
        identifier: "",
        actionSteps: "",
        updatedBy: `${auth.userDetails.email.toLowerCase()}`,
        updatedOn: dateTransform(new Date()),
      });
    } else if (
      (pageType === PAGE_TYPE.VIEW || pageType === PAGE_TYPE.EDIT) &&
      screenType === ISSUE_ACTION_SCREEN_TYPE.ISSUE &&
      !isLoading &&
      !isError
    ) {
      setIssueData({
        ...issueData,
        ...data?.data,
        id: data?.data?.issueId,
        actionsId:
          data?.data?.action.map((item) => ({
            id: item.actionId,
            label: item.name,
          })) || [],
        updatedOn: dateTransform(new Date()),
      });

      const issuetype = PRIMARY_INVENTORY_FILTER.find(
        (item) => item.id === data?.data?.issueType
      );
      setIssueType(issuetype);
      setSeverityLevel({
        id: data?.data?.issueLevel,
        label: data?.data?.issueLevel?.replace("_", "-"),
      });
    } else if (
      (pageType === PAGE_TYPE.VIEW || pageType === PAGE_TYPE.EDIT) &&
      screenType === ISSUE_ACTION_SCREEN_TYPE.ACTION
    )
      setActionData({
        ...actionData,
        ...SingleActionData?.data?.data,
        updatedOn: dateTransform(new Date()),
      });
  }, [data?.data, pageType, SingleActionData?.data?.data]);

  return (
    <div
      className={`create-container-overlay ${
        pageType &&
        pageType !== ISSUE_ACTION_SCREEN_TYPE.ISSUE &&
        pageType !== "actions"
          ? "open-create"
          : ""
      }`}
    >
      {screenType === ISSUE_ACTION_SCREEN_TYPE.ISSUE ? (
        <div className="create-container-section">
          <div className="header">
            <h3>{issueHeadingName(pageType)}</h3>
            <Link to="/issues-action/issues" className="close-link">
              <img src={crossIcon} alt="close-icon" />
            </Link>
          </div>
          {!isLoading && !isError ? (
            <div className="form-container">
              <div>
                <h4>
                  Issue name{pageType === PAGE_TYPE.CREATE && <span>*</span>}
                </h4>
                <InputBox
                  type="text"
                  name="name"
                  sx={{ width: "100%" }}
                  value={issueData.name}
                  className={`create-issue-input  ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  placeholder="Issue Name"
                  onChange={changeHandler}
                  title="issueName"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div>
                <h4>Issue Description</h4>

                <TextArea
                  name="description"
                  id="description"
                  cols="10"
                  value={issueData.description}
                  className={`create-issue-input  ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  placeholder="Issue Description"
                  onChange={changeHandler}
                  disabled={pageType === PAGE_TYPE.VIEW}
                  {...(pageType !== PAGE_TYPE.VIEW && { rows: "6" })}
                  draggable={false}
                  title={"issueDescription"}
                />
              </div>
              <div>
                <h4>Issue Identifier</h4>
                <InputBox
                  type="text"
                  name="issueIdentifier"
                  sx={{ width: "100%" }}
                  value={issueData.issueIdentifier}
                  className={`create-issue-input  ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  placeholder="Issue Identifier"
                  onChange={changeHandler}
                  title="issueIdentifier"
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div>
                <h4>
                  Issue Type{pageType === PAGE_TYPE.CREATE && <span>*</span>}
                </h4>
                {issueType !== undefined && (
                  <DropdownMultiSelect
                    optionData={PRIMARY_INVENTORY_FILTER}
                    selectedValues={issueType}
                    setSelectedValues={(value) => {
                      setIssueType(value);
                      setIssueData({
                        ...issueData,
                        issueType: value.id,
                      });
                    }}
                    showChips={false}
                    placeholder="Select Issue Type"
                    multiple={false}
                    disableCloseOnSelect={false}
                    disabled={pageType === PAGE_TYPE.VIEW}
                    title="issueType"
                  />
                )}
                <ErrorBox title="issueType" />
              </div>
              <div className="severity-level-dropdown">
                <h4>
                  Severity Level
                  {pageType === PAGE_TYPE.CREATE && <span>*</span>}
                </h4>
                <DropdownMultiSelect
                  optionData={ISSUE_SEVERITY_LEVEL_DROPDOWN}
                  selectedValues={severityLevel}
                  setSelectedValues={(value) => {
                    setSeverityLevel(value);
                    setIssueData({
                      ...issueData,
                      issueLevel: value.id,
                    });
                  }}
                  showChips={false}
                  placeholder="Select Severity Level"
                  multiple={false}
                  disableCloseOnSelect={false}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div>
                <h4>
                  Related Action
                  {pageType === PAGE_TYPE.CREATE && <span>*</span>}
                </h4>
                {!isLoading && !isError && (
                  <RelatedAction
                    setIssueData={setIssueData}
                    issueData={issueData}
                    pageType={pageType}
                  />
                )}
              </div>

              {pageType !== PAGE_TYPE.VIEW && (
                <div className="action-button">
                  <Button
                    text="Submit"
                    variant="solid"
                    clickHandler={submitHandler}
                  />
                </div>
              )}
            </div>
          ) : (
            <CircularLoader />
          )}
        </div>
      ) : (
        <div className="create-container-section">
          <div className="header">
            <h3>{actionHeadingName(pageType)}</h3>
            <Link to="/issues-action/action" className="close-link">
              <img src={crossIcon} alt="close-icon" />
            </Link>
          </div>
          {!SingleActionData.isLoading && !SingleActionData.isError ? (
            <div className="form-container">
              <div>
                <h4>
                  Action name{pageType === PAGE_TYPE.CREATE && <span>*</span>}
                </h4>
                <InputBox
                  placeholder="Action Name"
                  sx={{ width: "100%" }}
                  className={`create-issue-input ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  title="actionName"
                  value={actionData.name}
                  onChange={actionChangeHandler}
                  name="name"
                  disabled={pageType === PAGE_TYPE.VIEW}
                  type="text"
                />
              </div>
              <div>
                <h4>Action Description</h4>
                <TextArea
                  title="actionDescription"
                  name="description"
                  id="description"
                  cols="15"
                  value={actionData.description}
                  className={`create-issue-input ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  placeholder="Action Description"
                  onChange={actionChangeHandler}
                  disabled={pageType === PAGE_TYPE.VIEW}
                  {...(pageType !== PAGE_TYPE.VIEW && { rows: "6" })}
                />
              </div>
              <div>
                <h4>Action Identifier</h4>

                <InputBox
                  type="text"
                  name="identifier"
                  sx={{ width: "100%" }}
                  value={actionData.identifier}
                  className={`create-issue-input ${
                    pageType === PAGE_TYPE.VIEW ? "view-issue" : "no-view-issue"
                  }`}
                  placeholder="Action Identifier"
                  onChange={actionChangeHandler}
                  disabled={pageType === PAGE_TYPE.VIEW}
                />
              </div>
              <div>
                <h4>
                  Action Step
                  {(pageType === PAGE_TYPE.CREATE ||
                    pageType === PAGE_TYPE.EDIT) && <span>*</span>}{" "}
                  {pageType !== PAGE_TYPE.VIEW && (
                    <p className="helper-text">
                      (For multiple steps, seperate it with semi-colon(;))
                    </p>
                  )}
                </h4>

                {pageType !== PAGE_TYPE.VIEW && (
                  <InputBox
                    type="text"
                    title="actionSteps"
                    sx={{ width: "100%" }}
                    name="actionSteps"
                    value={actionData.actionSteps}
                    className={`create-issue-input no-view-issue`}
                    placeholder="Action Step"
                    onChange={actionChangeHandler}
                    disabled={pageType === PAGE_TYPE.VIEW}
                  />
                )}

                {pageType === PAGE_TYPE.VIEW && (
                  <ol>
                    {actionData.actionSteps
                      ?.split(";")
                      .map(
                        (item, index) =>
                          item !== "" && <li key={index}>{item.trim(" ")}</li>
                      )}
                  </ol>
                )}
              </div>

              {pageType !== PAGE_TYPE.VIEW && (
                <div className="action-button">
                  <Button
                    text="Submit"
                    variant="solid"
                    clickHandler={actionSubmitHandler}
                  />
                </div>
              )}
            </div>
          ) : (
            <CircularLoader />
          )}
        </div>
      )}
    </div>
  );
};

export default CreateEditIssues;
