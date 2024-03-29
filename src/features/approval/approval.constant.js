import { GLOBAL_STATUS } from "../../common/global.constant";

export const APPROVAL_COLUMNS = [
  {
    key: "informationId",
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
    key: "infoNotification",
    header: "Notification",
    sorting: false,
    minWidth: "140px",
    maxWidth: "140px",
  },
  {
    key: "type",
    header: "Type",
    sorting: false,
    minWidth: "140px",
    maxWidth: "140px",
  },
  {
    key: "title",
    header: "Title",
    sorting: false,
    minWidth: "400px",
    maxWidth: "400px",
  },
  {
    key: "primaryInventory",
    header: "Primary Inventory",
    sorting: false,
    minWidth: "140px",
    maxWidth: "140px",
  },
  {
    key: "assignee",
    header: "Assignee",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
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
    type: ["view", "reject", "approval"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];

export const FILTER_VALUES = [
  { id: "", label: "" },
  { label: "In Approval", id: GLOBAL_STATUS.SUBMITTED },
  {
    label: "Request Unpublish",
    id: GLOBAL_STATUS.REQ_UNPUBLISHED,
  },
];

export const APPROVAL_QUERY_KEY = {
  LISTING_KEY: "get-approval-list",
};

export const CHANGE_VALUE_APPROVAL = {
  IN_APPROVAL: "APPROVED",
  REQ_UNPUBLISHED: "UNPUBLISHED",
};

export const CHANGE_VALUE_REJECT = {
  IN_APPROVAL: "REJECTED",
  REQ_UNPUBLISHED: "APPROVED",
};

export const CHANGE_VALUE_ADVISOR = {
  ADVICE_A: "IN_APPROVAL",
  ADVICE_C: "IN_PROGRESS",
};
export const ADVISOR_DEVICE_QUERY_KEY = {
  LISTING_KEY: "get-advisor-os-list",
};
export const OVERLAY_CHECKBOX_DATA = [
  {
    label: "Duplicate content/Already published",
    id: "Duplicate content/Already published",
  },
  {
    label: "Revised / rewrite description etc.",
    id: "Revised / rewrite description etc.",
  },
  { label: "Revised /rewrite title", id: "Revised /rewrite title" },
];

export const OVERLAY_REJECT_DATA = { functionality: "reject", data: {} };

export const OVERLAY_APPROVAL_DATA = { functionality: "approval", data: {} };

export const APPROVAL = "approval";

export const REJECT = "reject";
