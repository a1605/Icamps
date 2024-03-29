export const FEEDBACK_COLUMNS = [
  {
    key: "feedbackReceivedDate",
    header: "Date",
    sorting: false,
  },
  {
    key: "topic",
    header: "Category",
    sorting: false,
    minWidth: "500px",
    maxWidth: "500px",

  },
  {
    key: "contactName",
    header: "Submitted By",
    sorting: true,
  },
  {
    key: "contactEmail",
    header: "Email",
    sorting: false,
  },
  {
    key: "contactPhone",
    header: "Phone",
    sorting: false,
  },
  {
    key: "action",
    header: "Action",
    sorting: false,
  },
];

export const INVENTORY_QUERY_KEY = {
  FEEDBACK_LISTING: "get-feedback-number-list",
  GET_SINGLE_FEEDBACK: "get-single-feedback",

};
