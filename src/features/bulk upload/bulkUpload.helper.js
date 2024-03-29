import {
  APP_COLUMN,
  BLACKLISTED_NUMBER,
  CYBER_SECURITY_COLUMN,
  DEVICES_COLUMN,
  NETWORK_COLUMN,
  OS_COLUMN,
} from "./bulkUpload.constant";

export const checkDevicesColumn = (array) => {
  let flag = false;
  DEVICES_COLUMN.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};
export const checkAppsColumn = (array) => {
  let flag = false;
  APP_COLUMN.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

export const checkOSColumn = (array) => {
  let flag = false;
  OS_COLUMN.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

export const checkBlacklistedNumberColumn = (array) => {
  let flag = false;
  BLACKLISTED_NUMBER.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

export const checkNetworkColumn = (array) => {
  let flag = false;
  NETWORK_COLUMN.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

export const checkCyberSecurityColumn = (array) => {
  let flag = false;
  CYBER_SECURITY_COLUMN.forEach((item) => {
    if (!array.includes(item)) {
      flag = true;
    }
  });
  return flag;
};

export const cancelHelper = (type) => {
  switch (type) {
    case "os":
      return "/inventory/os";
    case "devices":
      return "/inventory/devices";
    case "cyber-security":
      return "/inventory/cyber-security";
    case "blacklistedNumber":
      return "/inventory/blacklistedNumber";
    case "network":
      return "/inventory/network";
    case "apps":
      return "/inventory/apps";
  }
};

export const apiURL = (type) => {
  switch (type) {
    case "os":
      return "/inventory/os/upload";
    case "devices":
      return "/inventory/device/upload";
    case "cyber-security":
      return "/inventory/cyber/security/upload";
    case "blacklistedNumber":
      return "/inventory/blacklisted/number/upload";
    case "network":
      return "/inventory/network/upload";
    case "apps":
      return "/inventory/application/upload";
  }
};

export const checkColums = (type) => {
  switch (type) {
    case "os":
      return checkOSColumn;
    case "devices":
      return checkDevicesColumn;
    case "blacklistedNumber":
      return checkBlacklistedNumberColumn;
    case "network":
      return checkNetworkColumn;
    case "apps":
      return checkAppsColumn;
    case "cyber-security":
      return checkCyberSecurityColumn;
  }
};

export const fileName = (type) => {
  switch (type) {
    case "os":
      return "Master Sample OS.xlsx";
    case "devices":
      return "Master Sample Devices.xlsx";
    case "cyber-security":
      return "Master Sample Cyber Security.xlsx";
    case "blacklistedNumber":
      return "Master Sample Blacklisted Number.xlsx";
    case "network":
      return "Master Sample Network.xlsx";
    case "apps":
      return "Master Sample Apps.xlsx";
  }
};

export const handleDownload = (nameFile) => {
  const fileUrl = `/sampleFile/${nameFile}`;

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = nameFile;
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const saveAsExcelFile = (buffer, fileName) => {
  const data = new Blob([buffer], { type: "application/octet-stream" });
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
