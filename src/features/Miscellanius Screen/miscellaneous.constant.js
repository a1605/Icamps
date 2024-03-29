export const MANUFACTURER_TABLE_COLUMNS = [
  {
    key: "name",
    header: "Manufacturer",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];
export const PERMISSION_TABLE_COLUMNS = [
  {
    key: "permissionRequire",
    header: "Permissions",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];
export const THIRD_PARTY_TABLE_COLUMNS = [
  {
    key: "thirdPartyLibrary",
    header: "Third Party Library",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];
export const APP_PUBLISHER_TABLE_COLUMNS = [
  {
    key: "publisher",
    header: "App Publisher",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];
export const CPU_TABLE_COLUMNS = [
  {
    key: "cpuModelNo",
    header: "CPU",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];
export const GPU_TABLE_COLUMNS = [
  {
    key: "gupModelNo",
    header: "GPU",
    sorting: false,
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
    key: "action",
    header: "Action",
    type: ["edit", "delete"],
    sorting: false,
  },
];

export const MISELLANEOUS_SCREEN_TYPE = {
  PERMISSION: "permission",
  THIRD_PARTY_LIBRARY: "libraries",
  MANUFACTURER: "manufacturer",
  APP_PUBLISHER: "publisher",
  CPU: "cpu",
  GPU: "gpu",
};
export const MANUFACTURE_KEY = {
  LISTING_KEY: "get-all-manufacturer",
  SINGLE_KEY: "get-single-manufacturer",
};

export const PERMISSIONS_KEY = {
  LISTING_KEY: "get-all-permission",
  SINGLE_KEY: "get-single-permission",
};

export const THIRD_PARTY_KEY = {
  LISTING_KEY: "get-all-libraries",
  SINGLE_KEY: "get-single-libraries",
};

export const APP_PUBLISHER_KEY = {
  LISTING_KEY: "get-all-publisher",
  SINGLE_KEY: "get-single-publisher",
};

export const CPU_KEY = {
  LISTING_KEY: "get-all-cpu",
  SINGLE_KEY: "get-single-cpu",
};

export const GPU_KEY = {
  LISTING_KEY: "get-all-Gpu",
  SINGLE_KEY: "get-single-gpu",
};
