import { SEVERITY_LEVEL } from "../../common/global.constant";

export const TABLE_COLUMNS = [
  {
    key: "name",
    header: "Issue Name",
    sorting: false,
  },

  {
    key: "issueType",
    header: "Issue Type",
    sorting: false,
  },
  {
    key: "issueIdentifier",
    header: "Issue Identifier",
    sorting: false,
  },
  {
    key: "updatedBy",
    header: "Updated By",
    sorting: true,
  },
  {
    key: "updatedOn",
    header: "Updated On",
    sorting: true,
  },

 
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
    maxWidth: "10%",
    minWidth: "10%",
  },
];

export const ACTION_TABLE_COLUMN = [
  {
    key: "name",
    header: "Action Name",
    sorting: false,
  },
  {
    key: "identifier",
    header: "Action Identifier",
    sorting: false,
  },
  {
    key: "updatedBy",
    header: "Updated By",
    sorting: true,
  },
  {
    key: "updatedOn",
    header: "Updated On",
    sorting: true,
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
  },
];

export const ISSUE_QUERY_KEY = {
  GET_ISSUE_LIST: "get-issue-list",
  GET_SINGLE_ISSUE: "get-single-issue",
  GET_ACTION_LIST: "get-action-list",
  GET_ACTIONS_FOR_ISSUE: "get-action-for-issue",
  GET_SINGLE_ACTION: "get-single-action",
};

export const ISSUE_ACTION_SCREEN_TYPE = {
  ISSUE: "issues",
  ACTION: "action",
};

export const ISSUE_SEVERITY_LEVEL_DROPDOWN = [
  { id: "LEVEL_1", label: "Level-1" },
  { id: "LEVEL_2", label: "Level-2" },
  { id: "LEVEL_3", label: "Level-3" },
  { id: "LEVEL_4", label: "Level-4" },
  { id: "LEVEL_5", label: "Level-5" },
  { id: "LEVEL_6", label: "Level-6" },
  { id: "LEVEL_7", label: "Level-7" },
  { id: "LEVEL_8", label: "Level-8" },
  { id: "LEVEL_9", label: "Level-9" },
  { id: "LEVEL_10", label: "Level-10" },
];
