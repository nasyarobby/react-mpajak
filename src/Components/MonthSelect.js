import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function MonthSelect(props) {
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  let start = props.start ? props.start - 1 : 0;

  return (
    <Select
      disabled={props.disabled}
      value={props.value}
      onChange={props.onChangeHandler}
    >
      {months.slice(start, 12).map((m, index) => {
        return (
          <MenuItem key={m} value={index + start + 1}>
            {m}
          </MenuItem>
        );
      })}
    </Select>
  );
}
