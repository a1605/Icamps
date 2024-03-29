import React, { useMemo } from "react";
import DropdownMultiSelect from "../../../common/components/MultipleSelect/DropdownMultiSelect";
import "./NetworkFIlter.scss";
import {
  transBrandFilterData,
  transModelFilterData,
} from "../network-helper";
import { FILTER_VALUES_NETWORK } from "../network.constant";
import { useFetchNetworkFilter } from "../hooks/useFetchAllNetwork";

const NetworkFilter = ({ filterData, filterHandler }) => {
  const NetworkData = useFetchNetworkFilter();
  const transBrandData = useMemo(
    () =>
      !NetworkData.isLoading && !NetworkData.isError
        ? transBrandFilterData(NetworkData?.data?.data?.networkResponseDTOS)
        : [],
    [NetworkData.isError, NetworkData.isLoading, NetworkData?.data?.data]
  );
  const transModelData = useMemo(
    () =>
      !NetworkData.isLoading && !NetworkData.isError
        ? transModelFilterData(NetworkData?.data?.data?.networkResponseDTOS)
        : [],
    [NetworkData.isError, NetworkData.isLoading, NetworkData?.data?.data]
  );
  return (
    <div className="network-filter-wrapper">
      <div className="network-search"></div>
      <div className="dropdown">
        <DropdownMultiSelect
          optionData={transBrandData}
          placeholder="Select Brand"
          selectedValues={filterData.brand}
          setSelectedValues={(value) => filterHandler(value, "brands")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        <DropdownMultiSelect
          optionData={transModelData}
          placeholder="Select Model"
          selectedValues={filterData.model}
          setSelectedValues={(value) => filterHandler(value, "models")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
        <DropdownMultiSelect
          optionData={FILTER_VALUES_NETWORK}
          placeholder="Select Status"
          selectedValues={filterData.status}
          setSelectedValues={(value) => filterHandler(value, "status")}
          width={200}
          showChips={false}
          disableCloseOnSelect={true}
          searchable={true}
        />
      </div>
    </div>
  );
};

export default NetworkFilter;
