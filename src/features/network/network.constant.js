import { GLOBAL_STATUS } from "../../common/global.constant";

export const NETWORK_COLUMNS = [
  {
    key: "networkId",
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
    maxWidth: "180px",
  },
  {
    key: "manufacturer",
    header: "Manufacturer",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "brand",
    header: "Brand",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "model",
    header: "Model",
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
    minWidth: "180px",
    maxWidth: "180px",
  },
  {
    key: "action",
    header: "Action",
    type: ["edit", "view", "menu"],
    sorting: false,
  },
];

export const INVENTORY_QUERY_KEY = {
  NETWORK_NUMBER_LISTING: "get-network-number-list",
  NETWORK_SINGLE_VIEW: "get-single-network",
  NETWORK_FILTER: "get-network-filter",
  ALL_NETWORK: "get-all-networks",
};

export const FILTER_VALUES_NETWORK = [
  { label: "Approved", id: GLOBAL_STATUS.APPROVED },
  { label: "Deleted", id: GLOBAL_STATUS.DELETED },
];
