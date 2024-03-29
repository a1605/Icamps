export const APPROVAL_DEVICE_COLUMNS = [
  {
    key: "informationId",
    header: "ID",
    sorting: false,
  },
  {
    key: "sourceTicketId",
    header: "Source Ticket ID",
    sorting: false,
  },
  {
    key: "type",
    header: "Type",
    sorting: false,
  },
  {
    key: "title",
    header: "Title",
    sorting: false,
  },
  {
    key: "primaryInventory",
    header: "Primary Inventory",
    sorting: false,
  },
  {
    key: "assignee",
    header: "Assignee",
    sorting: false,
  },
  {
    key: "updatedBy",
    header: "Requested By",
    sorting: true,
  },
  {
    key: "updatedOn",
    header: "Requested On",
    sorting: true,
  },
  {
    key: "status",
    header: "Status",
    sorting: false,
  },
  {
    key: "action",
    header: "Action",
    type: ["view", "reject", "approval"],
    sorting: false,
  },
];

export const APPROVAL_DEVICE_QUERY_KEY = {
  LISTING_KEY: "get-approval-device-list",
};

export const CHANGE_VALUE_APPROVAL = {
  IN_APPROVAL: "APPROVED",
  REQ_UNPUBLISHED: "UNPUBLISHED",
  UNPUBLISHED: "UNPUBLISHED",
  APPROVED: "APPROVED",
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

export const APPROVAL = "approval";

export const REJECT = "reject";
