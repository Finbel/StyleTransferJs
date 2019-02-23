import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import ComputerVision from "./componenets/ComputerVision";
import Nlp from "./componenets/Nlp";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="Header-Container">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/cv">Computer Vision</Link>
              </div>
              <div>
                <Link to="/nlp">NLP</Link>
              </div>
            </div>

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
