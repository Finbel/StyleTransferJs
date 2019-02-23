import React, { Component } from "react";
import WhatsInThisImage from "./WhatsInThisImage";

class ComputerVision extends Component {
  render() {
    return (
      <WhatsInThisImage
        renderImage={({ ref }) => (
          <img
            alt="cat"
            ref={ref}
            crossOrigin="anonymous"
            src="/cat.jpeg"
            id="image"
            width="400"
          />
        )}
      />
    );
  }
}

export default ComputerVision;
