import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
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
                <Link to="/onlineml/">Home</Link>
              </div>
              <div>
                <Link to="/onlineml/cv">Computer Vision</Link>
              </div>
              <div>
                <Link to="/onlineml/nlp">NLP</Link>
              </div>
            </div>

            <h2>Ml models</h2>

            <Route exact path="/" render={() => <Redirect to="/onlineml" />} />
            <Route exact path="/onlineml/" component={ComputerVision} />
            <Route path="/onlineml/cv" component={ComputerVision} />
            <Route path="/onlineml/nlp" component={Nlp} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
