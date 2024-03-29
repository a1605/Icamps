export const USERS_COLUMNS = [
  {
    key: "firstName",
    header: "First Name",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "lastName",
    header: "Last Name",
    sorting: true,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "email",
    header: "Email",
    sorting: false,
    minWidth: "300px",
    maxWidth: "300px",
  },
  {
    key: "mobileNo",
    header: "Mobile number",
    sorting: false,
    minWidth: "200px",
    maxWidth: "200px",
  },
  {
    key: "roles",
    header: "Roles",
    sorting: false,
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
    type: ["edit", "view"],
    sorting: false,
    minWidth: "150px",
    maxWidth: "150px",
  },
];

export const QUERY_KEYS = {
  GET_USERS_LIST: "get-users-list",
  GET_SINGLE_USER_ROLES: "get-single-user-roles",
  GET_ALL_ROLES: "get-all-roles",
  CREATE_USER: "create-user",
  UPDATE_USER: "update-user",
};
export const CRUD_TYPES = {
  CREATE: "create",
  EDIT: "edit",
  VIEW: "view",
  DELETE: "delete",
  PROFILE: "profile",
};
