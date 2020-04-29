import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MainPage from "./components/MainPage"
import VisualisationPage from "./components/VisualisationPage"

function App() {
  return (
    <Router>
      <div className="container">
 
        <Navbar />
        <Route path="/" exact component={MainPage} />
        <Route path="/graph" exact component={VisualisationPage} />
        <Footer />
      </div>
    </Router>
  )
}

export default App;
