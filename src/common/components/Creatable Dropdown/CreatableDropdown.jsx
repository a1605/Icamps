import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function CreatableDropdown({
  placeholder,
  disabled,
  optionData,
  selectedValues,
  setSelectedValues,
  title,
  error,
}) {
  const [options, setOptions] = React.useState();
  React.useEffect(() => setOptions(optionData), [optionData]);
  const handleInputChange = (event, newInputValue) => {
    setSelectedValues(event.target.value);
  };
  const handleAddOption = (newValue) => {
    const newOption = { id: "", label: newValue };
    setOptions([...options, newOption]);
    setSelectedValues(newOption);
  };
  return (
    <>
      <Autocomplete
        disabled={disabled}
        value={selectedValues}
        error={true}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            setSelectedValues({
              id: "",
              label: newValue,
            });
          } else if (newValue && newValue.id) {
            handleAddOption(newValue.id);
          } else {
            setSelectedValues(newValue);
          }
        }}
        filterOptions={(options, optionData) => {
          const filtered = filter(options, optionData);
          const { inputValue } = optionData;
          const isExisting = options.some(
            (option) => inputValue === option.label
          );
          if (inputValue !== "" || !isExisting) {
            filtered.push({
              id: inputValue,
              label: `Add ${inputValue}`,
            });
          }
          return filtered;
        }}
        selectOnFocus
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={options}
        option
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => {
          if (typeof option === "string") {
            return option;
          }
          if (option.label) {
            return option.label;
          }
          return option.label;
        }}
        renderOption={(optionData, option) =>
          option.id && (
            <div key={option.id}>
              <li {...optionData}>{option.label}</li>
            </div>
          )
        }
        sx={{ width: 300 }}
        freeSolo
        renderInput={(selectedValues) => (
          <TextField
            {...selectedValues}
            placeholder={placeholder}
            error={error?.title.includes(title)}
          />
        )}
      />
    </>
  );
}
