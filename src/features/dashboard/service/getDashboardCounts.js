import { http } from "../../../services/httpServices";


//table for all
const getInventoryInformationCount = async () =>
  await http.get(`/inventory/count`);

  //info of all
const getInformationCount = async () => await http.get(`/information/count`);


//table for assinee
const getInventoryAssignedCount = async () =>
  await http.get(`/inventory/count/email`);

  //info of asiignee
const getInformationAssignedCount = async () =>
  await http.get(`/information/count/email`);

export {
  getInformationCount,
  getInventoryAssignedCount,
  getInventoryInformationCount,
  getInformationAssignedCount,
};
