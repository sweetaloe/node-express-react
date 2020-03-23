import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"


import Navbar from "./components/Navbar"
import MainComponent from "./components/MainComponent"
import GraphComponent from "./components/GraphComponent"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={MainComponent} />
        <Route path="/graph" exact component={GraphComponent} />
      </div>
    </Router>
  )
}

export default App;
