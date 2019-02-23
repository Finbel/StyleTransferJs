import React, { Component } from "react";
import WhatsInThisImage from "./WhatsInThisImage";

class ComputerVision extends Component {
  render() {
    const catpath =
      window.location.hostname === "localhost"
        ? "/cat.jpeg"
        : "onlineml/cat.jpeg";

    return (
      <WhatsInThisImage
        renderImage={({ ref }) => (
          <img
            alt="cat"
            ref={ref}
            crossOrigin="anonymous"
            src={catpath}
            id="image"
            width="400"
          />
        )}
      />
    );
  }
}

export default ComputerVision;
