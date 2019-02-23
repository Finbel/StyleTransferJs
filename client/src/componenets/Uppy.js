import React from "react";
import Uppy from "@uppy/core";
import DashboardModal from "@uppy/react/lib/DashboardModal";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.uppy = Uppy();

    this.uppy.on("complete", result => {
      const url = result.successful[0].uploadURL;
      console.log(result);
    });
  }

  componentWillUnmount() {
    this.uppy.close();
  }

  render() {
    return (
      <DashboardModal
        close={this.props.handleClose}
        open={this.props.open}
        uppy={this.uppy}
      />
    );
  }
}

export default Uploader;
