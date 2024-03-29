export const APPROVAL_OS_QUERY_KEY = {
  LISTING_KEY: "get-approval-os-list",
};

export const ADVISOR_OS_QUERY_KEY = {
  LISTING_KEY: "get-advisor-os-list",
};

export const CHANGE_VALUE_APPROVAL = {
  IN_APPROVAL: "APPROVED",
  REQ_UNPUBLISHED: "UNPUBLISHED",
};

export const CHANGE_VALUE_ADVISOR = {
  ADVICE_A: "IN_APPROVAL",
  ADVICE_C: "IN_PROGRESS",
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
