import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import DecorationFormComponent from '../TablesComponents/DecorationFormComponent';


export default class DecorationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            decorationid: this.props.data.decoration[0]._id,
            cream: this.props.data.decoration[0].cream,
            type: this.props.data.decoration[0].type,
            color: this.props.data.decoration[0].color,
            cost: this.props.data.decoration[0].cost
        }

    }



    updateData() {

        axios.post('/decorations/update', this.state
        )
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (data) => {
        this.setState(data)
    }

    handleDecorChange = (e) => {
        var decId = e.target.selectedOptions[0].id
        this.setState({
            decorationid: decId
        })

        Array.prototype.map.call(this.props.data.decoration, dec => {
            if (decId == dec._id)
                this.setState({
                    cream: dec.cream,
                    type: dec.type,
                    color: dec.color,
                    cost: dec.cost
                })
        })
    }


    render() {
        return (

            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Выберите декорацию</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleDecorChange.bind(this)}>
                                {Array.prototype.map.call(this.props.data.decoration, dec =>
                                    <option id={dec._id}>{dec.type + " и " + dec.cream + " крем, цвет: " + dec.color}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Декорации</Form.Label>
                            <Form.Text>{this.state.decorationid}</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <DecorationFormComponent data={this.state} callback={this.handleChange} />

                    <Button variant="primary" onClick={this.updateData.bind(this)}>Обновить</Button>

                </Form>
            </div >

        )
    }
}