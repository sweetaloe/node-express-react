import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import CakeFormComponent from '../TablesComponents/CakeFormComponent';


export default class CakeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cakeid: this.props.data.cake[0]._id,
            amount: this.props.data.cake[0].amount,
            sizeWidth: this.props.data.cake[0].sizeWidth,
            sizeHeight: this.props.data.cake[0].sizeHeight,
            sizeLength: this.props.data.cake[0].sizeLength,
            decoration: this.props.data.cake[0].decoration,
            filling: this.props.data.cake[0].filling,
            cost: this.props.data.cake[0].cost
        }

    }
    componentDidMount() {
        this.setState({
            cakeid: this.props.data.cake[0]._id,
            amount: this.props.data.cake[0].amount,
            sizeWidth: this.props.data.cake[0].sizeWidth,
            sizeHeight: this.props.data.cake[0].sizeHeight,
            sizeLength: this.props.data.cake[0].sizeLength,
            decoration: this.props.data.cake[0].decoration,
            filling: this.props.data.cake[0].filling,
            cost: this.props.data.cake[0].cost
        })
    }


    updateData() {

        axios.post('/cakes/update', this.state
        )
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (data) => {
        this.setState(data)
    }

    handleCakeChange = (e) => {
        var cakeId = e.target.selectedOptions[0].id
        this.setState({
            cakeid: cakeId
        })

        Array.prototype.map.call(this.props.data.cake, cake => {
            if (cakeId == cake._id)
                this.setState({
                    amount: cake.amount,
                    sizeWidth: cake.sizeWidth,
                    sizeHeight: cake.sizeHeight,
                    sizeLength: cake.sizeLength,
                    decoration: cake.decoration,
                    filling: cake.filling,
                    cost: cake.cost
                })
        })
    }

    getDec = (decId) => {
        var result = ""
        Array.prototype.map.call(this.props.data.decoration, dec => {
            if (decId == dec._id) result = dec.type + " и " + dec.cream+" крем"
        })
        return result
    }
    getFil = (filId) => {
        var result = ""
        Array.prototype.map.call(this.props.data.filling, fil => {
            if (filId == fil._id) result = fil.type + " (" + fil.weight+" кг)"
        })
        return result
    }

    render() {
        return (

            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Выберите торт</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleCakeChange.bind(this)}>
                                {Array.prototype.map.call(this.props.data.cake, cake =>
                                    <option id={cake._id}>{"декор: "+this.getDec(cake.decoration) + ", начинка: " + this.getFil(cake.filling) + ", размеры: " + cake.sizeLength + "-" + cake.sizeWidth + "-" + cake.sizeHeight}</option>
                                )}

                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID торта</Form.Label>
                            <Form.Text>{this.state.cakeid}</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <CakeFormComponent data={this.state} callback={this.handleChange} data={this.state} decoration={this.props.data.decoration} filling={this.props.data.filling} />

                    <Button variant="primary" onClick={this.updateData.bind(this)}>Обновить</Button>

                </Form>
            </div >

        )
    }
}