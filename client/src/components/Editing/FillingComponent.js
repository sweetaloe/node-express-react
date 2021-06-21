import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';
import FillingFormComponent from '../TablesComponents/FillingFormComponent';


export default class FillingComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fillingid: this.props.data.filling[0]._id,
            type: this.props.data.filling[0].type,
            weight: this.props.data.filling[0].weight,
            cost: this.props.data.filling[0].cost
        }

    }



    updateData() {

        axios.post('/filling/update', this.state
        )
            .then(res => {
                console.log(res.data)
            })
    }

    handleChange = (data) => {
        this.setState(data)
    }

    handleFillingChange = (e) => {
        var filId = e.target.selectedOptions[0].id
        this.setState({
            fillingid: filId
        })

        Array.prototype.map.call(this.props.data.filling, fil => {
            if (filId == fil._id)
                this.setState({
                    type: fil.type,
                    weight: fil.weight,
                    cost: fil.cost
                })
        })
    }


    render() {
        return (

            <div>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                            <Form.Label>Выберите начинку</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleFillingChange.bind(this)}>
                                {Array.prototype.map.call(this.props.data.filling, fil =>
                                    <option id={fil._id}>{fil.type + ", вес: " + fil.weight + " кг, цена: " + fil.cost}</option>
                                )}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>ID Начинки</Form.Label>
                            <Form.Text>{this.state.fillingid}</Form.Text>
                        </Form.Group>
                    </Form.Row>
                    <FillingFormComponent data={this.state} callback={this.handleChange} />

                    <Button variant="primary" onClick={this.updateData.bind(this)}>Обновить</Button>

                </Form>
            </div >

        )
    }
}