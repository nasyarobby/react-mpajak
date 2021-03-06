import { Component } from "react";
import { withSnackbar } from "notistack";

class NetworkDetector extends Component {
  state = {
    isDisconnected: false
  };

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener("online", this.handleConnectionChange);
    window.addEventListener("offline", this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleConnectionChange);
    window.removeEventListener("offline", this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? "online" : "offline";
    if (condition === "online") {
      const webPing = setInterval(() => {
        fetch("//google.com", {
          mode: "no-cors"
        })
          .then(() => {
            this.setState({ isDisconnected: false }, () => {
              this.props.closeSnackbar(this.offlineMsgKey);
              this.props.enqueueSnackbar("Terhubung ke server!", {
                variant: "success"
              });
              return clearInterval(webPing);
            });
          })
          .catch(() =>
            this.setState({ isDisconnected: true }, () => {
              if (!this.offlineMsgKey)
                this.offlineMsgKey = this.props.enqueueSnackbar(
                  "Sepertinya kamu offline. Cek koneksi kamu.",
                  { persist: true }
                );
            })
          );
      }, 2000);
      return;
    }

    return this.setState({ isDisconnected: true }, () => {
      if (!this.offlineMsgKey)
        this.offlineMsgKey = this.props.enqueueSnackbar(
          "Sepertinya kamu offline. Cek koneksi kamu.",
          { persist: true, variant: "error" }
        );
    });
  };

  render() {
    return null;
  }
}

export default withSnackbar(NetworkDetector);
