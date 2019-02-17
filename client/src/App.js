import React, { Component, Fragment } from "react";
import * as ml5 from "ml5";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import { ClipLoader } from "react-spinners";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
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

class ComputerVision extends Component {
  render() {
    return (
      <WhatsInThisImage
        renderImage={({ ref }) => (
          <img
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

class Nlp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.loadWordVector();
  };

  loadWordVector = () => {
    // Create a new word2vec method
    const wordVectors = ml5.word2vec(
      "https://raw.githubusercontent.com/ml5js/ml5-examples/master/p5js/Word2Vec/data/wordvecs10000.json",
      modelLoaded
    );

    // When the model is loaded
    const modelLoaded = () => {
      console.log("Model Loaded!");
    };

    // Find the closest word to 'rainbow'
    wordVectors.nearest("rainbow", (err, results) => {
      console.log(results);
      this.setState({ wordVectors: results, isLoading: false });
    });
  };

  render() {
    return (
      <Fragment>
        <h2>Word model</h2>
        <h3>Similar words to rainbow</h3>

        <ClipLoader
          sizeUnit={"px"}
          size={150}
          color={"#123abc"}
          loading={this.state.isLoading}
        />

        {this.state.wordVectors &&
          !this.state.isLoading &&
          this.state.wordVectors.map(item => (
            <li key={item.distance}>{item.word}</li>
          ))}
      </Fragment>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/cv">Computer Vision</Link>
              </li>
              <li>
                <Link to="/nlp">NLP</Link>
              </li>
            </ul>

            <hr />
            <h2>Ml models</h2>

            <Route exact path="/" component={ComputerVision} />
            <Route path="/cv" component={ComputerVision} />
            <Route path="/nlp" component={Nlp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
