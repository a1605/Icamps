export const CYBER_CELL_COLUMNS = [
  {
    key: "cyberCellId",
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
    key: "regionalOffice",
    header: "Regional Office",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "personName",
    header: "Person Name",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "state",
    header: "State",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "city",
    header: "City",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "pincode",
    header: "Pincode",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "email",
    header: "Email",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "mobile",
    header: "Mobile",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
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
    minWidth: "150px",
    maxWidth: "150px",
    maxWidth: "150px",
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
  CYBERCELL_NUMBER_LISTING: "get-cyber-security-number-list",
  CYBERCELL_SINGLE_VIEW: "get-single-cyber-security",
  CYBERCELL_FILTER_STATE: "get-cyber-security-filter-state",
  CYBERCELL_FILTER_CITY: "get-cyber-security-filter-city",
  STATE_LIST: "get-state",
  CITY_LIST: "get-city",
};
