import React from "react";
import InputMask from "react-input-mask";
import { TextField } from "@material-ui/core";

function NpwpTextField(props) {
  return (
    <InputMask
      mask="99.999.999.9-999.999"
      value={props.value}
      onChange={props.onChange}
      maskChar=""
    >
      {inputProps => (
        <TextField {...inputProps} label="NPWP" variant="outlined"></TextField>
      )}
    </InputMask>
  );
}

export default NpwpTextField;
