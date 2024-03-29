import React, { useEffect } from "react";
import "./UsersFilter.scss";
import SearchBar from "../../../../common/components/searchBar/SearchBar";
import DropdownMultiSelect from "../../../../common/components/MultipleSelect/DropdownMultiSelect";
import { STATUS_FILTER } from "../../../../common/global.constant";
import { useFetchRoles } from "../../hooks";
import { transformRolesFilterData } from "../../users.helper";

export const UsersFilter = ({ filterHandler, filterData }) => {
  const [filterValues, setFilterValues] = React.useState({
    roles: [],
    status: { id: "ALL", label: "All" },
    searchKeyword: "",
  });
  const { data } = useFetchRoles();

  return (
    <div className="news-filter-wrapper">
      <div className="new-search">
        <SearchBar
          value={filterValues.searchKeyword}
          onValueChange={(e) => {
            setFilterValues({
              ...filterValues,
              searchKeyword: e.target.value,
            });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFilterValues({
                ...filterValues,
                roles: [],
                status: { id: "ALL", label: "All" },
              });
              filterHandler(e.target.value, "searchKeyword");
            }
          }}
          clickHandler={() =>
            filterHandler(filterValues.searchKeyword, "searchKeyword")
          }
        />
      </div>
      <div className="dropdown">
        {data?.data && (
          <div>
            <DropdownMultiSelect
              optionData={transformRolesFilterData(data?.data)}
              placeholder="All Roles"
              selectedValues={filterValues?.roles}
              setSelectedValues={(value) => {
                setFilterValues({
                  ...filterValues,
                  searchKeyword: "",
                  roles: value,
                });
                filterHandler(value, "roles");
              }}
              width={200}
              showChips={false}
              disableCloseOnSelect={true}
              searchable={true}
            />
          </div>
        )}
        <div>
          <DropdownMultiSelect
            optionData={STATUS_FILTER}
            placeholder="All Status"
            selectedValues={filterValues.status}
            setSelectedValues={(value) => {
              if (value) {
                setFilterValues({
                  ...filterValues,
                  searchKeyword: "",
                  status: value,
                });
                filterHandler(value, "status");
              } else {
                setFilterValues({
                  searchKeyword: "",
                  ...filterValues,
                  status: { id: "ALL", label: "All" },
                });
                filterHandler({ id: "ALL", label: "All" }, "status");
              }
            }}
            width={200}
            multiple={false}
            disableCloseOnSelect={false}
            showChips={false}
          />
        </div>
      </div>
    </div>
  );
};
