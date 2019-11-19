import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      type="tel"
    />
  );
}

export default function MonthSelect(props) {
  const { helperText, value, onChange } = props;
  return (
    <TextField
      label="Nominal Pembayaran"
      onChange={onChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        inputComponent: NumberFormatCustom
      }}
      value={value}
      helperText={helperText}
    ></TextField>
  );
}
