import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import $ from 'jquery'
import Popper from 'popper.js'



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
