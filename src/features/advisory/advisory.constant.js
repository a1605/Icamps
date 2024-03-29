export const ADVISORY_COLUMNS = [
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
    key: "updatedOn",
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
    type: ["view"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];

export const ADVISORY_QUERY_KEY = {
  LISTING_KEY: "get-advisory-list",
};
export const ADVISORY_QUERY_OS_KEY = {
  LISTING_KEY: "get-advisory-os-list",
};
