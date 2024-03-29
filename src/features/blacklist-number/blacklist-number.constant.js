import { GLOBAL_STATUS } from "../../common/global.constant";

export const BLACKLIST_NUMBER_COLUMNS = [
  {
    key: "blackListedNumberId",
    header: "ID",
    sorting: false,
    minWidth: "80px",
    maxWidth: "80px",
  },
  {
    key: "sourceTicketId",
    header: "Source Ticket ID",
    sorting: false,
    minWidth: "140px",
    maxWidth: "140px",
  },
  {
    key: "scammerTitle",
    header: "Scammer Title",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "countryCode",
    header: "Country",
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    key: "mobileNumber",
    header: "Mobile No",
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    key: "mobileFraudCategory",
    header: "Fraud Category",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "assignee",
    header: "Assigne",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
  },
  {
    key: "source",
    header: "Source",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "updatedBy",
    header: "Updated By",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "updatedOn",
    header: "Updated On",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "status",
    header: "Status",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];

export const ANALYST_BLACKLIST_NUMBER_COLUMNS = [
  {
    key: "blackListedNumberId",
    header: "ID",
    sorting: false,
    minWidth: "80px",
    maxWidth: "80px",
  },
  {
    key: "sourceTicketId",
    header: "Source Ticket ID",
    sorting: false,
    minWidth: "140px",
    maxWidth: "140px",
  },
  {
    key: "scammerTitle",
    header: "Scammer Title",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "countryCode",
    header: "Country",
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    key: "mobileNumber",
    header: "Mobile No",
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
  {
    key: "mobileFraudCategory",
    header: "Fraud Category",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "assignee",
    header: "Assigne",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
  },
  {
    key: "source",
    header: "Source",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "requestedBy",
    header: "Requested By",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "requestedOn",
    header: "Requested On",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "status",
    header: "Status",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];
export const APPROVAL_BLACKLIST_QUERY_KEY = {
  LISTING_KEY: "get-approval-blacklist-list",
};
export const INVENTORY_QUERY_KEY = {
  BLACKLISTING_NUMBER_LISTING: "get-blacklist-number-list",
  BLACKLIST_SINGLE_VIEW: "get-single-blacklist",
  BLACKLIST_FILTER: "get-blacklist-filter",
  COUNTRY_LIST: "get-country",
};
export const APPROVAL_QUERY_KEY = {
  LISTING_KEY: "get-approval-device-list",
};
export const CHANGE_VALUE_REJECT = {
  IN_APPROVAL: "REJECTED",
  REQ_UNPUBLISHED: "APPROVED",
};
export const OVERLAY_CHECKBOX_DATA = [
  { label: "Duplicate content/Already published", id: "duplicate" },
  { label: "Revised / rewrite description etc.", id: "revisedDesc" },
  { label: "Revised /rewrite title", id: "revisedTitle" },
];

export const OVERLAY_REJECT_DATA = { functionality: "reject", data: {} };

export const OVERLAY_APPROVAL_DATA = { functionality: "approval", data: {} };
export const CHANGE_VALUE_APPROVAL = {
  IN_APPROVAL: "APPROVED",
  REQ_UNPUBLISHED: "UNPUBLISHED",
};
export const CHANGE_VALUE_ADVISOR = {
  ADVICE_A: "IN_APPROVAL",
  ADVICE_C: "IN_PROGRESS",
};
export const APPROVAL = "approval";

export const REJECT = "reject";
