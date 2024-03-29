import { GLOBAL_STATUS } from "../../common/global.constant";

export const APPS_COLUMNS = [
  {
    key: "applicationId",
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
    key: "applicationName",
    header: "App Name",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "version",
    header: "Version",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
  },
  {
    key: "appType",
    header: "App Type",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "assignee",
    header: "Assignee",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
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

export const ANALYST_APPS_COLUMNS = [
  {
    key: "applicationId",
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
    key: "applicationName",
    header: "App Name",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "version",
    header: "Version",
    sorting: false,
    minWidth: "100px",
    maxWidth: "100px",
  },
  {
    key: "appType",
    header: "App Type",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
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

export const INVENTORY_QUERY_KEY = {
  ALL_APP: "get-all-apps",
  APP_LISTING: "get-apps-list",
  APP_VIEW: "get-single-app-info",
  PERMISSION: "get-permission-list",
  LIBRARY: "get-libaray-list",
  PUBLISHER: "get-publisher-list",
  EDIT_APP: "get-single-app-info",
  SUB_TYPE: "get-sub-types"
};

export const INDICATOR_VALUES = [
  {
    status: "In Approval",
    count: "08",
  },
  {
    status: "Approved",
    count: "09",
  },
  {
    status: "Rejected",
    count: "01",
  },
  {
    status: "In Progress",
    count: "03",
  },
];

export const SEVERITY_LEVEL = {
  LOW: "LOW",
  MODERATE: "MODERATE",
  MAJOR: "MAJOR",
  CRITICAL: "CRITICAL",
};
export const APP_TYPE_DATA = [
  {
    id: "Art and Design",
    label: "Art and Design",
  },
  {
    id: "Auto and Vehicles",
    label: "Auto and Vehicles",
  },
  {
    id: "Beauty",
    label: "Beauty",
  },
  {
    id: "Books and Reference",
    label: "Books and Reference",
  },
  {
    id: "Browser",
    label: "Browser",
  },
  {
    id: "Business",
    label: "Business",
  },
  {
    id: "Comics",
    label: "Comics",
  },
  {
    id: "Communications",
    label: "Communications",
  },
  {
    id: "Dating",
    label: "Dating",
  },
  {
    id: "Education",
    label: "Education",
  },
  {
    id: "Entertainment",
    label: "Entertainment",
  },
  {
    id: "Events",
    label: "Events",
  },
  {
    id: "Finance",
    label: "Finance",
  },
  {
    id: "Food and Drink",
    label: "Food and Drink",
  },
  {
    id: "Games",
    label: "Games",
  },
  {
    id: "Health and Fitness",
    label: "Health and Fitness",
  },
  {
    id: "House and Home",
    label: "House and Home",
  },
  {
    id: "Libraries and Demo",
    label: "Libraries and Demo",
  },
  {
    id: "Lifestyle",
    label: "Lifestyle",
  },
  {
    id: "Maps and Navigation",
    label: "Maps and Navigation",
  },
  {
    id: "Medical",
    label: "Medical",
  },
  {
    id: "Music and Audio",
    label: "Music and Audio",
  },
  {
    id: "News and Magazines",
    label: "News and Magazines",
  },
  {
    id: "Parenting",
    label: "Parenting",
  },
  {
    id: "Personalization",
    label: "Personalization",
  },
  {
    id: "Photography",
    label: "Photography",
  },
  {
    id: "Productivity",
    label: "Productivity",
  },
  {
    id: "Shopping",
    label: "Shopping",
  },
  {
    id: "Social",
    label: "Social",
  },
  {
    id: "Sports",
    label: "Sports",
  },
  {
    id: "Tools",
    label: "Tools",
  },
  {
    id: "Travel and Local",
    label: "Travel and Local",
  },
  {
    id: "Video Players and Editors",
    label: "Video Players and Editors",
  },
  {
    id: "Weather",
    label: "Weather",
  },
  {
    id: "Others",
    label: "Others",
  },
];
export const APP_SUB_TYPE_DATA = [
  {
    id: "GOVT_APP",
    label: "Govt App",
  },
  {
    id: "SCREEN_SHARING",
    label: "Screen Sharing",
  },
  {
    id: "FAKE_APP",
    label: "Fake App",
  },
  {
    id: "RBI_WHITELISTED",
    label: "RBI Whitelisted",
  },
  {
    id: "LEA_FLAGGED",
    label: "LEA Flagged",
  },
  {
    id: "RECOMMENDED_BROWSER",
    label: "Recommended Browser",
  },
  {
    id: "ANTI_VIRUS",
    label: "Anti Virus",
  },
  {
    id: "MALICIOUS_/_MALWARE",
    label: "Malicious / Malware",
  },
  {
    id: "PHONE_MAINTENANCE",
    label: "Phone Maintenance",
  },
];
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

export const APPROVAL_APP_QUERY_KEY = {
  LISTING_KEY: "get-approval-app-list",
};

export const OVERLAY_REJECT_DATA = { functionality: "reject", data: {} };

export const OVERLAY_APPROVAL_DATA = { functionality: "approval", data: {} };

export const statusAssigneeHandle = (status, approvedBy) => {
  if (status === GLOBAL_STATUS.ADVICE_A) {
    return approvedBy !== null
      ? GLOBAL_STATUS.REQ_UNPUBLISHED
      : GLOBAL_STATUS.SUBMITTED;
  }
  if (status === GLOBAL_STATUS.ADVICE_C) return GLOBAL_STATUS.DRAFT;
};
