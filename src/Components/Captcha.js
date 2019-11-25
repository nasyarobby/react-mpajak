import React, { Component } from "react";
import axios from "axios";
import { withSnackbar } from "notistack";

class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = { key: "" };
    this.getSession = this.getSession.bind(this);
  }

  componentDidMount() {
    this.getSession();
  }

  getSession() {
    axios
      .put("http://localhost:3000/api/sse/sessions/")
      .then(resp => {
        this.setState({ key: resp.data.data.key });
        window.localStorage.setItem("key", resp.data.data.key);
      })
      .catch(error => {
        this.props.enqueueSnackbar("Server is offline", { variant: "error" });
      });
  }

  render() {
    const keyExists = !!this.state.key;
    return (
      keyExists && (
        <img
          alt="captcha"
          src={
            "http://localhost:3000/api/sse/sessions/captcha/" + this.state.key
          }
        ></img>
      )
    );
  }
}

export default withSnackbar(Captcha);
