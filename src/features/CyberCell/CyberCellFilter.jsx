import { useMemo, useState } from "react";
import {
  useFetchCybercellFilterState,
  useFetchCybercellFilterCity,
} from "./hooks/useFetchCybercellFilter";
import SearchBar from "../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../common/components/MultipleSelect/DropdownMultiSelect";
import "./CyberCellFilter.scss";
import { transCityFilterData, transStateFilterData } from "./cyber-cell-helper";

function CyberCellFilter({ filterData, filterHandler }) {
  const [filterValues, setFilterValues] = useState({
    searchKeyword: "",
    states: [],
    cities: [],
  });

  const cyberCellFilterState = useFetchCybercellFilterState();
  const cyberCellFilterCity = useFetchCybercellFilterCity();
  const transCityData = useMemo(
    () =>
      !cyberCellFilterCity.isLoading && !cyberCellFilterCity.isError
        ? transCityFilterData(cyberCellFilterCity?.data?.data?.cityResponseDTOS)
        : [],
    [
      cyberCellFilterCity.isError,
      cyberCellFilterCity.isLoading,
      cyberCellFilterCity?.data?.data,
    ]
  );
  const transStateData = useMemo(
    () =>
      !cyberCellFilterState.isLoading && !cyberCellFilterState.isError
        ? transStateFilterData(
            cyberCellFilterState?.data?.data?.stateResponseDTOS
          )
        : [],
    [
      cyberCellFilterState.isError,
      cyberCellFilterState.isLoading,
      cyberCellFilterState?.data?.data,
    ]
  );
  return (
    <div className="cyber-filter-wrapper">
      <div className="cyber-search">
        <SearchBar
          value={filterValues.searchKeyword}
          onValueChange={(e) => {
            setFilterValues({
              ...filterValues,
              searchKeyword: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.target.value === "") {
              filterHandler(e.target.value, "searchKeyword");
            }
          }}
          clickHandler={() =>
            filterHandler(filterValues.searchKeyword, "searchKeyword")
          }
        />
      </div>
      <div className="cyber-dropdown">
        <div className="status-dropdown">
          <DropdownMultiSelect
            optionData={transStateData}
            placeholder="All State"
            selectedValues={filterValues?.states}
            setSelectedValues={(value) => {
              setFilterValues({
                ...filterValues,
                states: value,
              });
              filterHandler(value, "states");
            }}
            width={200}
            showChips={false}
            multiple={true}
            searchable={true}
          />
        </div>
        {/* <div className="status-dropdown">
          <DropdownMultiSelect
            optionData={transCityData}
            placeholder="All City"
            selectedValues={filterValues?.cities}
            setSelectedValues={(value) => {
              setFilterValues({
                ...filterValues,
                cities: value,
              });
              filterHandler(value, "cities");
            }}
            width={200}
            showChips={false}
            multiple={true}
          />
        </div> */}
      </div>
    </div>
  );
}

export default CyberCellFilter;
