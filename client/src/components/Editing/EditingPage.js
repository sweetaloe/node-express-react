import React, { Component } from 'react'
import axios from 'axios'
import { Tab, Spinner, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import ClientComponent from './ClientComponent'
import CakeComponent from './CakeComponent'
import OrderComponent from './OrderComponent'
import FillingComponent from './FillingComponent'
import DecorationComponent from './DecorationComponent'

export default class EditingPage extends Component {
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

    handleChange = (data) => {
        this.setState({ data })
    }

    render() {
        return (
            <div>
                <h1 ></h1>
                <h4 class="mt-5 text-center">Редактирование базы</h4>
                <Tab.Container id="list-group-tabs-example" defaultActiveKey="#clients">
                    <Row>
                        <Col sm={2}>
                            <ListGroup>
                                <ListGroup.Item action href="#clients">Клиенты</ListGroup.Item>
                                <ListGroup.Item action href="#orders">Заказы</ListGroup.Item>
                                <ListGroup.Item action href="#cakes">Торты</ListGroup.Item>
                                <ListGroup.Item action href="#decorations">Декорации</ListGroup.Item>
                                <ListGroup.Item action href="#filling">Начинка</ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="#clients">
                                    <ClientComponent clients={this.state.client} callback={this.handleChange} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#orders">
                                    <OrderComponent data={this.state} callback={this.handleChange} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#cakes">
                                    <CakeComponent data={this.state} callback={this.handleChange} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#decorations">
                                    <DecorationComponent data={this.state} callback={this.handleChange} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="#filling">
                                    <FillingComponent data={this.state} callback={this.handleChange} />
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

            </div >

        )
    }
}