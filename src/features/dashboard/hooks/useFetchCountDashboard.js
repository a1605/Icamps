import { useQuery } from "@tanstack/react-query";
import {
  getInformationAssignedCount,
  getInformationCount,
  getInventoryAssignedCount,
  getInventoryInformationCount,
} from "../service/getDashboardCounts";
export const useFetchInventoryInformationCount = () => {
  return useQuery(["fetch-inventory-info"], () =>
    getInventoryInformationCount()
  );
};
export const useFetchInventoryAssignedCount = () => {
  return useQuery(["fetch-inventory-assist"], () =>
    getInventoryAssignedCount()
  );
};

export const useFetchInformationCount = () => {
  return useQuery(["fetch-info"], () => getInformationCount());
};

export const useFetchInformationAssignedCount = () => {
  return useQuery(["fetch-info-assignee"], () => getInformationAssignedCount());
};
