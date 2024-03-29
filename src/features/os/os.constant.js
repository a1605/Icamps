export const OS_COLUMNS = [
  {
    key: "osId",
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
    key: "osName",
    header: "OS Name",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "codeName",
    header: "AOSP Codename",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
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

export const ANALYST_OS_COLUMNS = [
  {
    key: "osId",
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
    key: "osName",
    header: "OS Name",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "codeName",
    header: "AOSP Codename",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
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
    type: ["edit", "view", "menu"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];

export const OS_QUERY_KEY = {
  LISTING_KEY: "get-os-list",
  LIST_OS: "get-os",
  GET_SINGLE_OS: "get-single-os-info",
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
