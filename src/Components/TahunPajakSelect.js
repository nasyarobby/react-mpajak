import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function MonthSelect(props) {
  let minYear = props.min || 1980;
  let maxYear = props.max || 2020;
  let years = [];
  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }
  if (props.reversed) years.reverse();
  return (
    <Select autoWidth value={props.value} onChange={props.onChangeHandler}>
      {years.map(year => (
        <MenuItem value={year} key={year}>
          {year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </MenuItem>
      ))}
    </Select>
  );
}
