import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';


export default class OrderForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tablename: "orders",
            clientid: this.props.data.clientid,
            orderDate: this.props.data.orderDate,
            deadlineDate: this.props.data.deadlineDate,
            cakeid: this.props.data.cakeid,
            cost: this.props.data.cost

        }
    }
    static defaultProps = {
        data: {
            orderid: "",
            clientid: "",
            orderDate: "",
            deadlineDate: "",
            cakeid: "",
            cost: ""
        }
    }

    componentDidMount = () => {
        if (this.props.data.clientid == "") {
            this.setState({ clientid: Object.values(this.props.clients[0])[0] })
            this.setState({ cakeid: Object.values(this.props.cakes[0])[0] })
        }
        else {
            this.setState({
                clientid: this.props.data.clientid,
                orderDate: this.props.data.orderDate,
                deadlineDate: this.props.data.deadlineDate,
                cakeid: this.props.data.cakeid,
                cost: this.props.data.cost
            })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value }, () => {
            if (this.props.callback) {
                this.props.callback(this.state)
            }
        })
    }

    handleClientChange = (e) => {
        this.setState({ clientid: e.target.selectedOptions[0].id })
    }

    handleCakeChange = (e) => {
        this.setState({ cakeid: e.target.selectedOptions[0].id })
    }


    getDefaultClient = () => {
        var res = []
        Array.prototype.map.call(this.props.clients, client => {
            if (client._id == this.props.data.clientid) {
                res.push(<option id={client._id} selected>{client.firstname + " " + client.lastname}</option>)

            }
            else {
                res.push(<option id={client._id}>{client.firstname + " " + client.lastname}</option>)
            }
        }
        )
        return res
    }

    getDefaultDecoration = () => {
        var res = []


        Array.prototype.map.call(this.props.cakes, cake => {
            if (cake._id == this.props.data.cakeid) {
                res.push(<option id={cake._id} selected>{"декор: " + this.getDecor(cake.decoration) + ", начинка: " + this.getFilling(cake.filling) + ", слоёв: " + cake.amount + ", размеры: " + cake.sizeLength + " - " + cake.sizeWidth + " - " + cake.sizeHeight + ""}</option>)

            }
            else {
                res.push(<option id={cake._id} >{"декор: " + this.getDecor(cake.decoration) + ", начинка: " + this.getFilling(cake.filling) + ", слоёв: " + cake.amount + ", размеры: " + cake.sizeLength + " - " + cake.sizeWidth + " - " + cake.sizeHeight + ""}</option>)
            }
        }
        )
        return res
    }


    getDecor = (decId) => {
        var result = ""
        Array.prototype.map.call(this.props.decoration, dec => {
            if (decId == dec._id) result = dec.type
        })
        return result
    }
    getFilling = (filId) => {
        var result = ""
        Array.prototype.map.call(this.props.filling, fil => {
            if (filId == fil._id) {
                result = fil.type
            }
        })

        return result
    }
    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.data.orderid !== newProps.data.orderid) {
            this.setState({
                clientid: newProps.data.clientid,
                orderDate: newProps.data.orderDate,
                deadlineDate: newProps.data.deadlineDate,
                cakeid: newProps.data.cakeid,
                cost: newProps.data.cost
            })
        }
    }


    render() {
        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="clents">
                        <Form.Label>Выберите клиента</Form.Label>
                        <Form.Control as="select" custom onChange={this.handleClientChange.bind(this)}>
                            {
                                this.getDefaultClient()
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="clientid">
                        <Form.Label>ID Клиента</Form.Label>
                        <Form.Text >{this.state.clientid}</Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="orderDate">
                        <Form.Label>Дата оформления заказа</Form.Label>
                        <Form.Control type="date" placeholder="" onChange={this.handleChange} value={(this.state.orderDate).slice(0, 10)} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="deadlineDate">
                        <Form.Label>Дата выполнения заказа</Form.Label>
                        <Form.Control type="date" placeholder="" onChange={this.handleChange} value={(this.state.deadlineDate).slice(0, 10)} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Выберите торт</Form.Label>
                        <Form.Control as="select" custom onChange={this.handleCakeChange.bind(this)}>
                            {this.getDefaultDecoration()}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="cakeid">
                        <Form.Label>ID Торта</Form.Label>
                        <Form.Text>{this.state.cakeid}</Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Col sm={4}>
                        <Form.Group controlId="cost">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control type="number" placeholder="Enter price" onChange={this.handleChange} value={this.state.cost} />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </div >

        )
    }
}