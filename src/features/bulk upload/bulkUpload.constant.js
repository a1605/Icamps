import { GLOBAL_STATUS } from "../../common/global.constant";

export const DEVICES_COLUMN = [
  "Manufacturer",
  "Model Name",
  "Model No",
  "Device release date",
  "Model EOL Date",
  "AOSP version code (released)",
  "AOSP version code (latest)",
  "OEMOS version code (released)",
  "OEMOS version code (latest)",
  "Latest Security Update Dt",
  "LatestSecUpdateReleasedDt",
  "CPU Make & Model",
  "GPU Make & Model",
  "NCCS Approved",
  "Google Certified",
];
export const APP_COLUMN = [
  "App Name",
  "App Package Name",
  "Developer ID",
  "Publisher Name",
  "Version",
  "Version Code",
  "3rd Party Library",
  "Permissions",
  "Minimum Required OS",
  "App Last Version Update",
  "App Category Name",
  "App Sub Type",
];

export const OS_COLUMN = [
  "OS name",
  "OS code name",
  "OS Release Date",
  "EOL Date",
  "Android API Version",
  "Latest security update date",
  "LatestSecUpdateReleasedDt",
  "Latest OEM Security Update Date",
];

export const BLACKLISTED_NUMBER = [
  "MobFraudCat",
  "ScammerTitle",
  "Country Code",
  "Mobile No",
  "Source",
];

export const NETWORK_COLUMN = [
  "Manufacturer",
  "Brand",
  "Model",
  "OS",
  "Model no",
  "Firmware Version",
  "Hardware Version",
  "Home Page",
  "Default UserName",
  "Default Password",
];

export const CYBER_SECURITY_COLUMN = [
  "Regional Office",
  "Person name",
  "City",
  "State",
  "Thana/Office",
  "Designation",
  "AddressLine1",
  "AddressLine2",
  "Pincode",
  "Email",
  "Mobile",
  "Telephone",
  "Fax",
];

export const UPLOAD_QUERY = {
  UPLOAD_EXCEL_FILE: "upload-excel-file",
};

export const BULK_UPLOAD_FILTER = [
  { label: "In Progress", id: GLOBAL_STATUS.DRAFT },
  { label: "In Approval", id: GLOBAL_STATUS.SUBMITTED },
];
export const BULK_UPLOAD_FILTER_ALTER = [
  { label: "Approved", id: GLOBAL_STATUS.APPROVED },
];
