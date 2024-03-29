export const FAQ_COLUMNS = [
  {
    key: "category",
    header: "Category",
    sorting: true,
    minWidth: "80px",
    maxWidth: "80px",
  },
  {
    key: "questionSequence",
    header: "Question Sequence",
    sorting: true,
    minWidth: "180px",
    maxWidth: "180px",
  },
  {
    key: "question",
    header: "Question",
    sorting: false,
    minWidth: "250px",
    maxWidth: "250px",
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "more"],
    sorting: false,
    minWidth: "50px",
    maxWidth: "50px",
  },
];
export const INVENTORY_FAQ_QUERY_KEY = {
  FAQ_LISTING: "get-faq-list",
  FAQ_VIEW: "get-single-faq",
  DELETE_FAQ: "delete-single-faq",
};

export const FAQ_CATEGORY_DROPDOWN = [
  {
    id: "General",
    label: "General",
  },
  {
    id: "Privacy",
    label: "Privacy",
  },
  {
    id: "Feature",
    label: "Feature",
  },
  {
    id: "Transparency",
    label: "Transparency",
  },
];
