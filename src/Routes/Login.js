import React from "react";
import { TextField, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import NpwpTextField from "../Components/NpwpTextField";
import Captcha from "../Components/Captcha";
import LoginButtonSse from "../Components/LoginButtonSse";

function formatNpwp(text) {
  return (
    `${text.slice(0, 2)}.` +
    `${text.slice(2, 5)}.` +
    `${text.slice(5, 8)}.` +
    `${text.slice(8, 9)}-` +
    `${text.slice(9, 12)}.` +
    `${text.slice(12, 15)}`
  );
}

export default function Login(props) {
  const [npwp, saveNpwp] = React.useState("");
  const [pin, savePin] = React.useState("");
  const [captcha, saveCaptcha] = React.useState("");

  const ls = window.localStorage;
  let npwpLocalStorage = ls.getItem("npwp");

  const npwpOnChangeHandler = e => {
    saveNpwp(e.target.value);
  };

  const pinOnchangeHandler = e => {
    let val = e.target.value.slice(0, 6);
    savePin(val);
  };

  const captchaOnChangeHandler = e => {
    saveCaptcha(e.target.value);
  };

  let NpwpComponent = npwpLocalStorage ? (
    <Box fontWeight="fontWeightBold" fontSize="h6.fontSize" textAlign="center">
      {formatNpwp(npwp)}
    </Box>
  ) : (
    <FormControl fullWidth>
      <NpwpTextField onChange={npwpOnChangeHandler} value={npwp} />
    </FormControl>
  );

  const wrapInsideGridAndBox = function(component) {
    return (
      <Grid item xs={12}>
        <Box px={5} my={1}>
          {component}
        </Box>
      </Grid>
    );
  };

  return (
    <div>
      <Grid container direction="row" justify="center" alignItems="center">
        {wrapInsideGridAndBox(NpwpComponent)}

        {wrapInsideGridAndBox(
          <FormControl fullWidth>
            <TextField
              type="password"
              label="PIN"
              variant="outlined"
              value={pin}
              onChange={pinOnchangeHandler}
            ></TextField>{" "}
          </FormControl>
        )}

        {wrapInsideGridAndBox(
          <FormControl fullWidth>
            <TextField
              type="password"
              label="Captcha"
              variant="outlined"
              value={captcha}
              onChange={captchaOnChangeHandler}
            ></TextField>{" "}
          </FormControl>
        )}

        <Grid item xs={12}>
          <Box textAlign="center">
            <Captcha />
          </Box>
        </Grid>
        {wrapInsideGridAndBox(
          <LoginButtonSse
            variant="contained"
            color="primary"
            fullWidth
            npwp={npwp}
            secret={pin}
            captcha={captcha}
            apikey={window.localStorage.getItem("key")}
          />
        )}
      </Grid>
    </div>
  );
}
