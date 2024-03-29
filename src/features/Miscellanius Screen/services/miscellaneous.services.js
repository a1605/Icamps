import { filledInputClasses } from "@mui/material";
import { http } from "../../../services/httpServices";

//Manufacturer
export const getManufacturer = async (page, col, order, filterData) =>
  await http.post(
    `/manufacturer/filter?page=${page - 1}&pageSize=15`,
    {
      manufacturer: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
export const createManufacturer = async (data) =>
  await http.post(`/manufacturer`, data);

export const singleManufacturer = async ({
  manufacturerId,
  name,
  updatedBy,
  updatedOn,
}) =>
  await http.put(`/manufacturer/${manufacturerId}`, {
    name: name,
    manufacturerId: manufacturerId,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });

export const getSingleManufacturer = async (id) =>
  await http.get(`/manufacturer/${id}`);

export const deleteSingleManufacturer = async (id) =>
  await http.delete(`/manufacturer/${id}`);

//Permissions

export const getPermissions = async (page, col, order, filterData) =>
  await http.post(
    `/inventory/permission/required/filter?page=${page - 1}&pageSize=15`,
    {
      permission: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );

export const createPermissions = async (data) =>
  await http.post(`/inventory/permission/required`, data);

export const singlePermissions = async ({
  permissionRequiredId,
  permissionRequire,
  updatedBy,
  updatedOn,
}) =>
  await http.put(`/inventory/permission/required/${permissionRequiredId}`, {
    permissionRequire: permissionRequire,
    permissionRequiredId: permissionRequiredId,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });

export const getSinglePermissions = async (id) =>
  await http.get(`/inventory/permission/required/${id}`);

export const deleteSinglePermissions = async (id) =>
  await http.delete(`/inventory/permission/required/${id}`);

// Third Party Library
export const getThirdParty = async (page, col, order, filterData) =>
  await http.post(
    `/inventory/libraries/filter?page=${page - 1}&pageSize=15`,
    {
      thirdpartylibrary: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
export const createThirdParty = async (data) =>
  await http.post(`/inventory/libraries`, data);
export const singleThirdParty = async ({
  id,
  thirdPartyLibrary,
  updatedBy,
  updatedOn,
}) =>
  await http.put(`/inventory/libraries/${id}`, {
    thirdPartyLibrary: thirdPartyLibrary,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });
export const getSingleThirdParty = async (id) =>
  await http.get(`/inventory/libraries/${id}`);
export const deleteSingleThirdParty = async (id) =>
  await http.delete(`/inventory/libraries/${id}`);

//APP Publisher

export const getAppPublisher = async (page, col, order, filterData) =>
  await http.post(
    `/inventory/publisher/filter?page=${page - 1}&pageSize=15`,
    {
      apppublisher: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
export const createAppPublisher = async (data) =>
  await http.post(`/inventory/publisher`, data);
export const singleAppPublisher = async ({
  id,
  publisher,
  updatedBy,
  updatedOn,
}) =>
  await http.put(`/inventory/publisher/${id}`, {
    publisher: publisher,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });

export const getSingleAppPublisher = async (id) =>
  await http.get(`/inventory/publisher/${id}`);

export const deleteSingleAppPublisher = async (id) =>
  await http.delete(`/inventory/publisher/${id}`);

//CPU
export const getCPU = async (page, col, order, filterData) =>
  await http.post(
    `/cpu/filter?page=${page - 1}&pageSize=15`,
    {
      cpu: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
export const createCPU = async (data) => await http.post(`/cpu`, data);
export const singleCPU = async ({ id, cpuModelNo, updatedBy, updatedOn }) =>
  await http.put(`/cpu/${id}`, {
    cpuModelNo: cpuModelNo,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });
export const getSingleCPU = async (id) => await http.get(`/cpu/${id}`);
export const deleteSingleCPU = async (id) => await http.delete(`/cpu/${id}`);

//GPU
export const getGPU = async (page, col, order, filterData) =>
  await http.post(
    `/gpu/filter?page=${page - 1}&pageSize=15`,
    {
      gpu: [],
      pagination: true,
      ...filterData,
    },
    {
      headers: {
        order: order,
        col: col,
      },
    }
  );
export const createGPU = async (data) => await http.post(`/gpu`, data);
export const singleGPU = async ({ id, gupModelNo, updatedBy, updatedOn }) =>
  await http.put(`/gpu/${id}`, {
    gupModelNo: gupModelNo,
    updatedBy: updatedBy,
    updatedOn: updatedOn,
  });
export const getSingleGPU = async (id) => await http.get(`/gpu/${id}`);
export const deleteSingleGPU = async (id) => await http.delete(`/gpu/${id}`);
