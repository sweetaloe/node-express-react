import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import ClientFormComponent from '../TablesComponents/ClientFormComponent';


export default class ClientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientid: this.props.clients[0]._id,
            firstname: this.props.clients[0].firstname,
            lastname: this.props.clients[0].lastname,
            email: this.props.clients[0].email,
            phone: this.props.clients[0].phone
        }

    }

    static defaultProps = {
        clients: {
            clientid: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: ""
        }
    }

    updateData() {

        axios.post('/clients/update', this.state
        )
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (data) => {
        this.setState(data)
    }

    handleClientChange = (e) => {
        var clientId = e.target.selectedOptions[0].id
        this.setState({
            clientid: clientId
        })

        Array.prototype.map.call(this.props.clients, client => {
            if (clientId == client._id)
                this.setState({
                    firstname: client.firstname,
                    lastname: client.lastname,
                    email: client.email,
                    phone: client.phone
                })
        })
    }



    render() {
        return (

            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Выберите клиента</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleClientChange.bind(this)}>
                                {Array.prototype.map.call(this.props.clients, client =>
                                    <option id={client._id}>{client.firstname + " " + client.lastname}</option>

                                )}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Клиента</Form.Label>
                            <Form.Text>{this.state.clientid}</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <ClientFormComponent data={this.state} callback={this.handleChange} />

                    <Button variant="primary" onClick={this.updateData.bind(this)}>Обновить</Button>

                </Form>
            </div >

        )
    }
}