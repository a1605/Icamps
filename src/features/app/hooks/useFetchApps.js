import { useQuery } from "@tanstack/react-query";
import { getAppList, getAppWithStatus } from "../Services/appServices";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchApps = (page, filterData, status) => {
  return useQuery([INVENTORY_QUERY_KEY.APP_LISTING, page, status], () =>
    getAppList(page, status)
  );
};

const useFetchAppWithStatus = (page, filterData, status, col, order) => {
  return useQuery(
    [INVENTORY_QUERY_KEY.APP_LISTING, page, filterData, status, col, order],
    () => getAppWithStatus(page, filterData, status, col, order)
  );
};

export { useFetchApps, useFetchAppWithStatus };
