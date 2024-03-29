export const NEWS_COLUMNS = [
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
    minWidth: "160px",
    maxWidth: "160px",
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

export const INFORMATION_QUERY_KEYS = {
  FETCH_INFORMATION: "get-all-information-list",
  FETCH_SINGLE_INFORMATION: "get-single-information",
};

export const QUERY_KEYS = {
  GET_ALL_ISSUES: "get-all-issues",
};
