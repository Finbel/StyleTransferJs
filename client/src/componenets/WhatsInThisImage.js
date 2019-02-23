import React from "react";
import { ClipLoader } from "react-spinners";
import * as ml5 from "ml5";

class WhatsInThisImage extends React.Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      prediction: {
        className: "",
        probability: ""
      },
      isLoading: false,
      error: null
    };
    this.predict = this.predict.bind(this);
  }
  async predict() {
    if (!this.imageRef.current) return;
    this.setState(s => ({ ...s, isLoading: true }));
    console.log("HIII");
    // hack for slow connections
    // await delay(2000)
    console.log("Hiyein");
    try {
      const classifier = await ml5.imageClassifier("MobileNet");
      const results = await classifier.predict(this.imageRef.current);
      console.log("Hiyein 3");
      if (results.length === 0) {
        this.setState({ error: new Error("NO_PREDICTIONS"), isLoading: false });
        return;
      } else {
        this.setState({
          isLoading: false,
          prediction: {
            className: results[0].className,
            probability: results[0].probability
          }
        });
      }
    } catch (error) {
      console.log("Hiyein 4");
      this.setState({ error, isLoading: false });
    }
  }
  async componentDidMount() {
    if (this.props.renderImage) {
      await this.predict();
    }
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.renderImage !== this.props.renderImage) {
      await this.predict();
    }
  }
  render() {
    return (
      <div>
        <div>
          The MobileNet model labeled this as{" "}
          <pre>{this.state.prediction.className}</pre>
          with a confidence of <pre>{this.state.prediction.probability}</pre>
        </div>

        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.isLoading}
        />

        <pre>
          error : {JSON.stringify(this.state.error, null, 2)}{" "}
          {this.state.error !== null && this.state.error.message}
        </pre>
        {this.props.renderImage !== null &&
          this.props.renderImage({ ref: this.imageRef })}
      </div>
    );
  }
}

export default WhatsInThisImage;
