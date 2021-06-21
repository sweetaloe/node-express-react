import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import OrderFormComponent from '../TablesComponents/OrderFormComponent';


export default class OrderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderid: this.props.data.order[0]._id,
            clientid: this.props.data.order[0].clientid,
            orderDate: this.props.data.order[0].orderDate,
            deadlineDate: this.props.data.order[0].deadlineDate,
            cakeid: this.props.data.order[0].cakeid,
            cost: this.props.data.order[0].cost
        }

    }

    componentDidMount() {
        this.setState({
            orderid: this.props.data.order[0]._id,
            clientid: this.props.data.order[0].clientid,
            orderDate: this.props.data.order[0].orderDate,
            deadlineDate: this.props.data.order[0].deadlineDate,
            cakeid: this.props.data.order[0].cakeid,
            cost: this.props.data.order[0].cost
        })
    }
    updateData() {

        axios.post('/orders/update', this.state
        )
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (data) => {
        this.setState(data)
    }
    /*{
            clientid: data.clientid,
            orderDate: data.orderDate,
            deadlineDate: data.deadlineDate,
            cakeid: data.cakeid,
            cost: data.cost
        } */
    handleOrderChange = (e) => {
        var orderId = e.target.selectedOptions[0].id
        this.setState({
            orderid: orderId
        })

        Array.prototype.map.call(this.props.data.order, order => {
            if (orderId == order._id)
                this.setState({
                    clientid: order.clientid,
                    orderDate: order.orderDate,
                    deadlineDate: order.deadlineDate,
                    cakeid: order.cakeid,
                    cost: order.cost
                })
        })
    }


    getClient = (clientId) => {
        var result = ""
        Array.prototype.map.call(this.props.data.client, client => {
            if (clientId == client._id) result = client.firstname + " " + client.lastname
        })
        return result
    }


    render() {
        //const {  } = this.state;
        return (

            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Выберите заказ</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleOrderChange.bind(this)}>
                                {Array.prototype.map.call(this.props.data.order, order =>
                                    <option id={order._id}>{"клиент: " + this.getClient(order.clientid) + ", дата заказа: " + (order.orderDate).slice(0, 10)}</option>

                                )}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Заказа</Form.Label>
                            <Form.Text>{this.state.orderid}</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <OrderFormComponent callback={this.handleChange} data={this.state} cakes={this.props.data.cake} clients={this.props.data.client} decoration={this.props.data.decoration} filling={this.props.data.filling} />

                    <Button variant="primary" onClick={this.updateData.bind(this)}>Обновить</Button>

                </Form>
            </div >

        )
    }
}