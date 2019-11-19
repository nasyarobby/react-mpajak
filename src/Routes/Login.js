import React from "react";
import { TextField, Box, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputMask from "react-input-mask";

export default function Login(props) {
  const [state, saveState] = React.useState({
    npwp: "",
    pin: ""
  });

  const ls = window.localStorage;
  let npwp = ls.getItem("npwp");

  const npwpOnChangeHandler = e => {
    saveState({ ...state, npwp: e.target.value });
  };

  function formatNpwp(text) {
    return `${text.slice(0, 2)}.${text.slice(2, 5)}.${text.slice(
      5,
      8
    )}.${text.slice(8, 9)}-${text.slice(9, 12)}.${text.slice(12, 15)}`;
  }

  let NpwpComponent = npwp ? (
    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize" textAlign="center">
      {formatNpwp(npwp)}
    </Box>
  ) : (
    <FormControl fullWidth>
      <InputMask
        mask="99.999.999.9-999.999"
        value={state.npwp}
        onChange={npwpOnChangeHandler}
        maskChar=""
      >
        {inputProps => (
          <TextField
            {...inputProps}
            label="NPWP"
            variant="outlined"
          ></TextField>
        )}
      </InputMask>
    </FormControl>
  );

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Box px={5} my={1}>
            {NpwpComponent}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box px={5} my={1}>
            <FormControl fullWidth>
              <TextField
                type="password"
                label="PIN"
                variant="outlined"
              ></TextField>{" "}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box px={5} my={1}>
            <FormControl fullWidth>
              <TextField
                type="password"
                label="Captcha"
                variant="outlined"
              ></TextField>{" "}
            </FormControl>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <img
              alt="captcha"
              src="https://sse3.pajak.go.id/captcha-image"
            ></img>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box px={5} my={1}>
            <Button variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
