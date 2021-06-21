import React, { Component } from 'react'
import { Tab, Spinner, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios'

import ClientFormComponent from '../TablesComponents/ClientFormComponent';
import OrderFormComponent from '../TablesComponents/OrderFormComponent';
import CakeFormComponent from '../TablesComponents/CakeFormComponent';
import DecorationFormComponent from '../TablesComponents/DecorationFormComponent'
import FillingFormComponent from '../TablesComponents/FillingFormComponent'

export default class AddPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            client: this.props.data.client,
            order: this.props.data.order,
            cake: this.props.data.cake,
            decoration: this.props.data.decoration,
            filling: this.props.data.filling      
        }
    }

    handleClientChange = (data) => {
        this.setState({ data })
    }

    handleButtonClick = (event) => {

        event.preventDefault()
        let address = '/' + this.state.data.tablename + '/add'

        axios.post(address, this.state
        )
        
            .then(res => {
                console.log(res.data)
            })
    }

    render() {
            return (
                <div>
                    <h1 ></h1>
                    <h4 class="mt-5 text-center">Добавление в базу</h4>
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
                                        <Form>
                                            <ClientFormComponent callback={this.handleClientChange} />
                                            <Button variant="primary" type="submit" onClick={this.handleButtonClick.bind(this)} >Добавить</Button>
                                        </Form>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#orders">
                                        <Form>
                                            <OrderFormComponent clients={this.state.client} cakes={this.state.cake} decoration={this.state.decoration} filling={this.state.filling} callback={this.handleClientChange} />
                                            <Button variant="primary" type="submit" onClick={this.handleButtonClick.bind(this)} >Добавить</Button>
                                        </Form>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#cakes">
                                        <Form>
                                            <CakeFormComponent decoration={this.state.decoration} filling={this.state.filling} callback={this.handleClientChange} />
                                            <Button variant="primary" type="submit" onClick={this.handleButtonClick.bind(this)} >Добавить</Button>
                                        </Form>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#decorations">
                                        <Form>
                                            <DecorationFormComponent callback={this.handleClientChange} />
                                            <Button variant="primary" type="submit" onClick={this.handleButtonClick.bind(this)} >Добавить</Button>
                                        </Form>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="#filling">
                                        <Form>
                                            <FillingFormComponent callback={this.handleClientChange} />
                                            <Button variant="primary" type="submit" onClick={this.handleButtonClick.bind(this)} >Добавить</Button>
                                        </Form>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div >
            )
    }
}
