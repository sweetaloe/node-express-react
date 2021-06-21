import React, { Component } from 'react'
import TableComponent from './Show/TableComponent';
import { Tab, Spinner, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios'

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: this.props.data.client,
            order: this.props.data.order,
            cake: this.props.data.cake,
            decoration: this.props.data.decoration,
            filling: this.props.data.filling,
            isready: true
        }
    }

    componentDidMount() {
        this.setState({
            client: this.props.data.client,
            order: this.props.data.order,
            cake: this.props.data.cake,
            decoration: this.props.data.decoration,
            filling: this.props.data.filling,
            isready: true
        })
    }
    
    render() {
        return (

            <div>
                <h1 ></h1>
                <h4 class="mt-4 text-center">База данных</h4>
                <div class="mt-5">
                    <Tab.Container defaultActiveKey="#clients" >
                        <Row>
                            <Col sm={2}>
                                <ListGroup>
                                    <ListGroup.Item action href="#clients" >Клиенты</ListGroup.Item>
                                    <ListGroup.Item action href="#orders" >Заказы</ListGroup.Item>
                                    <ListGroup.Item action href="#cakes" >Торты</ListGroup.Item>
                                    <ListGroup.Item action href="#decorations" >Декорации</ListGroup.Item>
                                    <ListGroup.Item action href="#filling" >Начинка</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col sm={10}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="#clients" >
                                        <TableComponent name="Клиенты" data={this.state.client} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#orders">
                                        <TableComponent name="Заказы" data={this.state.order} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#cakes">
                                        <TableComponent name="Торты" data={this.state.cake} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#decorations">
                                        <TableComponent name="Декорации" data={this.state.decoration} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#filling">
                                        <TableComponent name="Наполнение" data={this.state.filling} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div >
        )
    }
}
