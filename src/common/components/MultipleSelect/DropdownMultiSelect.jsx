import React, { useRef, useState } from "react";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./DropdownMultiSelect.scss";
import ChipsDetails from "../../chipsDetails/ChipsDetails";
import { useAuth } from "../../hooks/useAuth";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DropdownMultiSelect = ({
  optionData,
  selectedValues,
  setSelectedValues,
  width,
  deleteHandler,
  showChips = true,
  placeholder = "",
  multiple = true,
  chipsCount,
  tableColumn,
  tableData,
  tableHeading,
  disabled = false,
  showSelect = true,
  title,
  disableCloseOnSelect = false,
  searchable = false,
  extraLabel = false,
}) => {
  const { error } = useAuth();
  const [inputValue, setInputValue] = useState("");
  const [isSearch, setSearch] = useState(searchable);
  const [allSelected, setAllSelected] = useState(false);
  const filterRef = useRef([]);

  const placeholderValue =
    selectedValues && selectedValues?.length > 0 ? "" : placeholder;

  const Chipsdrawer =
    showChips &&
    selectedValues.map((option, index) => {
      const label = option.label || option;
      return (
        index <= chipsCount - 1 && (
          <Chip
            key={option.id}
            label={label}
            deleteIcon={<CloseIcon />}
            {...(showSelect && { onDelete: () => deleteHandler(option) })}
          />
        )
      );
    });

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedValues(
        filterRef.current.length ? filterRef.current : optionData
      );
      setAllSelected(true);
    } else {
      setSelectedValues([]);
      setAllSelected(false);
    }
  };

  const handleOnChange = (e, options, reason) => {
    // for non searchable
    if (!searchable) {
      setInputValue(options?.label ? options.label : "");
    }

    // for searchable
    if (reason === "selectOption" || reason === "removeOption") {
      if (
        options.length > 0 &&
        options?.find((option) => option.id === "select-all")
      ) {
        handleSelectAll(!allSelected);
        let result = [];
        result = optionData.filter((el) => el.id !== "select-all");
        // return handleOnChange(result);
      } else {
        setSelectedValues(options);
        //   return handleOnChange(options);
      }
    } else if (reason === "clear") {
      setSelectedValues([]);
    }
  };

  // to get filter prop which give filter data func
  const filter = createFilterOptions();

  return (
    <div className="app-multiselect">
      {showSelect && (
        <Autocomplete
          disabled={disabled}
          multiple={multiple}
          inputValue={isSearch ? inputValue : selectedValues?.label}
          options={optionData}
          filterOptions={(options, params) => {
            // give filterdata and add extra label on them
            const filtered = filter(options, params);
            filterRef.current = filtered;
            return [extraLabel, ...filtered];
          }}
          onChange={handleOnChange}
          getOptionLabel={(option) => option.label || ""}
          value={selectedValues}
          size="small"
          sx={{
            width: { width },
            backgroundColor: "white",
          }}
          disableClearable={!isSearch}
          disableCloseOnSelect={disableCloseOnSelect}
          clearOnBlur={false}
          renderInput={(selectedValues) => {
            return (
              <TextField
                {...selectedValues}
                onChange={(e) => {
                  setSearch(true);
                  setInputValue(e.target.value);
                }}
                placeholder={placeholderValue}
                error={error.title.includes(title)}
              />
            );
          }}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderTags={(selected) => {
            return multiple ? (
              <div className="selected-values-container">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div className="label-select">{selected[0].label}</div>
                  <div>
                    {selected.length > 1 ? ` + ${selected.length - 1}` : null}
                  </div>
                </div>
              </div>
            ) : (
              <div>{selected.label}</div>
            );
          }}
          renderOption={(optionData, option, { selected }) => {
            // selectAllProp - to get tick mark in select all
            const selectAllProps =
              option.id === "select-all" ? { checked: allSelected } : {};
            return (
              option.id && (
                <div key={option.id}>
                  <li {...optionData}>
                    {multiple ? (
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        size="sm"
                        {...selectAllProps}
                      />
                    ) : (
                      ""
                    )}
                    <span
                      style={{ fontSize: "14px", textTransform: "capitalize" }}
                    >
                      {option.label}
                    </span>
                  </li>
                </div>
              )
            );
          }}
        />
      )}
      {showChips && (
        <div className="selectedTags">
          <div className="chips-drawer">{Chipsdrawer}</div>
          {chipsCount && chipsCount > 0 && selectedValues.length > 0 && (
            <ChipsDetails
              plusExtra={selectedValues.length - chipsCount}
              tableHeading={tableHeading}
              tableColumns={tableColumn}
              data={tableData}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default DropdownMultiSelect;
