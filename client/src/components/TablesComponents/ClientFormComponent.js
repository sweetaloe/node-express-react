import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';


export default class ClientForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tablename: "clients",
            firstname: this.props.data.firstname,
            lastname: this.props.data.lastname,
            email: this.props.data.email,
            phone: this.props.data.phone
        }
    }
    static defaultProps = {
        data: {
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
        }
    }
    
    componentDidMount = () => {
        if (this.props.data.firstname != "") {
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
    
    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.data.clientid !== newProps.data.clientid) {
            this.setState({
                firstname: newProps.data.firstname,
                lastname: newProps.data.lastname,
                email: newProps.data.email,
                phone: newProps.data.phone
            })
        }
    }
    render() {

        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="firstname">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control placeholder="Введите имя" onChange={this.handleChange} value={this.state.firstname} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="lastname">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control placeholder="Введите фамилию" onChange={this.handleChange} value={this.state.lastname} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Введите email" onChange={this.handleChange} value={this.state.email} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="phone">
                        <Form.Label>Номер телефона</Form.Label>
                        <Form.Control placeholder="89123456789" onChange={this.handleChange} value={this.state.phone} />
                    </Form.Group>
                </Form.Row>
            </div >

        )
    }
}