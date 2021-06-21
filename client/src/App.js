
import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Tab, Spinner, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MainPage from "./components/MainPage"

import AddPage from "./components/Add/AddPage"
import EditingPage from './components/Editing/EditingPage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        client: "",
        order: "",
        cake: "",
        decoration: "",
        filling: "",
      },
      isready: false
    }
  }

  componentDidMount() {
    var promises = []
    var result = []
    var list = ["client", "cake", "decoration", "filling", "order"]
    list.map(element => {
      console.log(element)
      promises.push(
        axios.get('/main/get', { params: element })
          .then(res => {
            console.log(res.headers)

            if (res.config.params == "client")
              result[0] = res.data;
            if (res.config.params == "cake")
              result[1] = res.data;
            if (res.config.params == "decoration")
              result[2] = res.data;
            if (res.config.params == "filling")
              result[3] = res.data;
            if (res.config.params == "order")
              result[4] = res.data;
            console.log(res.config.params)
            console.log(res.data)
          })
      )
    })
    Promise.all(promises).then(() => {
      
      this.setState({
        data: {
          client: result[0],
          cake: result[1],
          decoration: result[2],
          filling: result[3],
          order: result[4]
        },
        isready: true
      })
    })
  }

  render() {
    if (this.state.isready == false)
      return (
        <div class="mt-5">
          <center>
            <Spinner animation="border" role="status" >
              <span className="sr-only">Loading...</span>
            </Spinner>
            <div class="mt-5">Подождите, загружается информация из базы данных</div>
          </center>
        </div>
      )
    else
      return (
        <Router>
          <div class="container">
            <Navbar />
            <Route exact path="/" render={(props) => (<MainPage {...props} data={this.state.data} />)} />
            <Route path="/add" render={(props) => (<AddPage {...props} data={this.state.data} />)} />
            <Route path="/redact" render={(props) => (<EditingPage {...props} data={this.state.data} />)} />
            <Footer />
          </div>
        </Router>
      )
  }
}
