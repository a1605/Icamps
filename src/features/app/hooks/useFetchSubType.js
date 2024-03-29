import { useQuery } from "@tanstack/react-query";
import {  getSubTypeList } from "../Services/appServices";
import { toast } from "react-hot-toast";
import { INVENTORY_QUERY_KEY } from "../app.constant";

const useFetchSubTypeData = (filter) => {
  return useQuery([INVENTORY_QUERY_KEY.SUB_TYPE, filter], () =>
    getSubTypeList(filter)
  );
};

export { useFetchSubTypeData };
