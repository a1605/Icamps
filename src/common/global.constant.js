import {
  approvalIcon,
  deleteActionButtonIcon,
  rejectIcon,
  CancelIcon,
  UnpublishIcon,
  openedMsg,
  unOpenedMsg,
} from "../assets/icons";

export const GLOBAL_STATUS = {
  DRAFT: "IN_PROGRESS",
  REJECTED: "REJECTED",
  APPROVED: "APPROVED",
  SUBMITTED: "IN_APPROVAL",
  DELETED: "DELETED",
  ADVICE_C: "ADVICE_C",
  ADVICE_A: "ADVICE_A",
  UNPUBLISHED: "UNPUBLISHED",
  REQ_UNPUBLISHED: "REQ_UNPUBLISHED",
  ACTIVE: true,
  INACTIVE: false,
};
export const FILTER_VALUES = [
  { label: "In Progress", id: GLOBAL_STATUS.DRAFT },
  { label: "In Approval", id: GLOBAL_STATUS.SUBMITTED },
  { label: "Approved", id: GLOBAL_STATUS.APPROVED },
  { label: "Rejected", id: GLOBAL_STATUS.REJECTED },
  { label: "Advice(C)", id: GLOBAL_STATUS.ADVICE_C },
  { label: "Advice(A)", id: GLOBAL_STATUS.ADVICE_A },
  { label: "Unpublished", id: GLOBAL_STATUS.UNPUBLISHED },
  { label: "Request Unpublish", id: GLOBAL_STATUS.REQ_UNPUBLISHED },
  { label: "Deleted", id: GLOBAL_STATUS.DELETED },
];

export const SEVERITY_LEVEL = {
  LOW: "LOW",
  MODERATE: "MODERATE",
  MAJOR: "MAJOR",
  CRITICAL: "CRITICAL",
};

export const PRIMARY_INVENTORY = {
  DEVICES: "DEVICES",
  APP: "APPS",
  OS: "OS",
  NETWORK: "NETWORK",
  BLOCKED_NUMBERS: "BLOCKED_NUMBERS",
  USER_SETTINGS: "USER_SETTINGS",
  SERVICES: "SERVICES",
  OTHERS: "OTHERS",
};

export const PRIMARY_INVENTORY_FILTER = [
  { id: PRIMARY_INVENTORY.DEVICES, label: "DEVICES" },
  { id: PRIMARY_INVENTORY.APP, label: "APPS" },
  { id: PRIMARY_INVENTORY.OS, label: "OS" },
  { id: PRIMARY_INVENTORY.NETWORK, label: "NETWORK" },
  { id: PRIMARY_INVENTORY.USER_SETTINGS, label: "USER SETTINGS" },
  { id: PRIMARY_INVENTORY.SERVICES, label: "SERVICES" },
  { id: PRIMARY_INVENTORY.OTHERS, label: "OTHERS" },
];
export const INFO_NOTIFICATION = [{ id: "PUSH", label: "PUSH" }];
export const INFORMATION_TYPE_FILTER = [
  { id: "", label: "" },
  { label: "NEWS", id: "NEWS" },
  { label: "ADVISORY", id: "ADVISORY" },
  { label: "VULNERABILITY", id: "VULNERABILITY" },
  { label: "ALERT", id: "ALERT" },
];

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

export const ROLES_FILTER = [
  { id: "All", label: "All" },
  { id: "Admin", label: "Admin" },
  { id: "Approver", label: "Approver" },
  { id: "Analyst", label: "Analyst" },
  { id: "Advisor", label: "Advisor" },
  { id: "Uploader", label: "Uploader" },
];

export const STATUS_FILTER = [
  { id: "ALL", label: "All" },
  { id: "ACTIVE", label: "Active" },
  { id: "IN-ACTIVE", label: "In-active" },
];

export const PAGE_TYPE = {
  CREATE: "create",
  EDIT: "edit",
  VIEW: "view",
  DELETE: "delete",
  PROFILE: "profile",
};

export const SCREEN_TYPE = {
  INVENTORY: "inventory",
  APPROVAL: "approval",
  ADVISOR: "advisor",
};

export const PERMISSION_MAPPING = {
  ADVISOR: "advice/comment",
  APPROVER: "approve/reject",
  VIEW: "view",
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  BULK_UPLOAD: "bulkupload",
  BROADCAST: "broadcast",
};

export const FEATURE_MAPPING = {
  NEWS: "news",
  ADVISORY: "advisory",
  ALERT: "alert",
  USER: "user",
  ROLES: "roles",
  CYBER_CELL: "cyber cell",
  APPS: "apps",
  VULNERABILITY: "vulnerability",
  DEVICES: "devices",
  OS: "os",
 FRAUD: "fraud",
  NEWTWORK: "network",
  BLACKLISTED_NUMBER: "blacklisted number",
  BEST_PRACTICES: "best practices",
  LINKS: "links",
  EMAIL: "email",
  ISSUE: "issue",
  "about icamps": "about icamps",
  FAQ: "FAQ",
};
export const APPROAVAL_FILTER = [
  { label: "In Approval", id: GLOBAL_STATUS.SUBMITTED },
  { label: "Request Unpublish", id: GLOBAL_STATUS.REQ_UNPUBLISHED },
];

export const ADVISOR_FILTER = [
  { label: "Advice(c)", id: GLOBAL_STATUS.ADVICE_C },
  { label: "Advice(A)", id: GLOBAL_STATUS.ADVICE_A },
];
export const KPI_KEY = {
  NEWS: "get-kpi",
  DEVICE: "get-kpi-device",
  OS: "get-kpi-os",
  APP: "get-kpi-app",
  BLACKLIST: "get-kpi-blacklist",
  CYBERCELL: "get-kpi-cyber-security",
  NETWORK: "get-kpi-network",
};

export const ICONMAPPER = {
  "Request Unpublish": UnpublishIcon,
  "Cancel Request": CancelIcon,
  Delete: deleteActionButtonIcon,
  Unpublished: UnpublishIcon,
  approvalIcon: approvalIcon,
  rejectIcon: rejectIcon,
  deleteActionButtonIcon: deleteActionButtonIcon,
  openBox: openedMsg,
  closeBox: unOpenedMsg,
};

export const order = (sortingStatus) => {
  if (Object.values(sortingStatus)[0] === 1) {
    return "ASC";
  } else return "DESC";
};

export const AssigneeStatus = {
  ACTIVE: "Active",
  IN_ACTIVE: "InActive",
};

export const FEILDS_NAME = {
  FIRSTNAME: "firstName",
  LASTNAME: "lastName",
  MOBILENO: "mobileNo",
  EMAILID: "email",
  ROLENAME: "name",
  DESCRIPTION: "description",
  TITLE: "title",
  INFORMATIONDESCRIPTION: "informationDescription",
  SOURCELINKURL: "sourceUrlLink",
};

export const MANDATORY_FIELDS = {
  issues: ["issueName", "relatedAction"],
  action: {
    actionName: true,
    actionSteps: true,
  },
};

export const BULK_UPLOAD_MAPPING = {
  devices: "devices",
  apps: "apps",
  os: "os",
  blacklistedNumber: "blacklisted number",
  "cyber-security": "cyber cell",
  network: "network",
};

export const STATUS_COMMENT = {
  ADVICE_C: "Assigned for Advice",
  IN_PROGRESS: "Assigned to work",
  ADVICE_A: "Assigned for Advice",
  IN_APPROVAL: "Assigned for Approval",
  CANCEL_REQUEST: "Cancel Request",
  REJECTED: "Rejected",
  APPROVED: "Approved/Published",
  REQ_UNPUBLISHED: "Unpublish Request",
  DELETE: "Deleted",
  UNPUBLISHED: "Unpublished",
};
