import React from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function LoginButtonSse(props) {
  let { npwp, secret, captcha, apikey } = props;
  const onClickHandler = function(e) {
    e.preventDefault();
    console.log(npwp, secret, captcha, apikey);
    axios
      .post("http://localhost:3000/api/sse/sessions/login", {
        npwp,
        pin: secret,
        captcha,
        key: apikey
      })
      .then(response => {
        console.log(response.data);
      });
  };
  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      onClick={onClickHandler}
    >
      Login
    </Button>
  );
}
