import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

const Dropdown = ({ id, title, placeholder, names, handleSelect }) => {
  const [selectedNames, setSelectedNames] = useState([]);

  const handleChange = (event) => {
    setSelectedNames(event.target.value);
    handleSelect(event.target.value, id);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 150,
      },
    },
  };

  const handleRenderValue = (selected) => {
    if (selected.length === 0) {
      return <span>{placeholder}</span>;
    } else if (selected.length === 1) {
      return <span>{selected}</span>;
    } else {
      return (
        <span>
          {selected[0]} + {selected.length - 1}
        </span>
      );
    }
  };

  return (
    <div>
      <FormControl sx={{ width: 150 }}>
        <label>
          <strong>{title}</strong>
        </label>
        <Select
          sx={{
            p: 0,
            fontSize: "13px",
            fontWeight: "500",
            backgroundColor: "white",
            height: "40px",
            border: "1px solid #D8D5D5",
          }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          displayEmpty
          value={selectedNames}
          onChange={handleChange}
          renderValue={handleRenderValue}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem sx={{ m: 0, p: 0 }} key={name} value={name}>
              <Checkbox checked={selectedNames.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
