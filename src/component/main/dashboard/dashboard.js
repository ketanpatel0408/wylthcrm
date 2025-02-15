import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import MultiLevelRMSelect from "../MultiLevelRMSelect";
import AlertProvider from "../alert/AlertProvider";

const options = [
  { id: "17821", label: "JAYDEEP (ARN-3007)" },
  { id: "17822", label: "RAHUL (ARN-5001)" },
  { id: "17823", label: "PRIYA (ARN-2003)" },
];

const MultiSelectDropdown = () => {
  const [selectedValues, setSelectedValues] = useState(["17821"]);

  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-[20px] bg-gray-50 border-b-2">
      <div className="w-full lg:w-[300px]">
        <FormControl fullWidth>
          <InputLabel>Code (ARN/RIA)</InputLabel>
          <Select
            multiple
            value={selectedValues}
            onChange={handleChange}
            input={<OutlinedInput label="Code (ARN/RIA)" />}
            renderValue={(selected) =>
              selected
                .map((id) => options.find((option) => option.id === id)?.label)
                .join(", ")
            }
            className="bg-white"
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <AlertProvider>
        <MultiLevelRMSelect />
      </AlertProvider>
    </div>
  );
};

export default MultiSelectDropdown;