import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';

const types = ["ягодная", "шоколадная", "сгущёнка", "творожная", "фруктовая"]

export default class FillingForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tablename: "filling",
            type: this.props.data.type,
            weight: this.props.data.weight,
            cost: this.props.data.cost
        }
    }
    static defaultProps = {
        data: {
            type: "",
            weight: "",
            cost: ""
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value }, () => {
            if (this.props.callback) {
                this.props.callback(this.state)
            }
        })
    }

    componentDidMount = () => {
        if (this.props.data.fillingid == "")
            this.setState({
                type: types[0]
            })
        else
            this.setState({
                type: this.props.data.type,
                weight: this.props.data.weight,
                cost: this.props.data.cost
            })
    }
    
    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.data.fillingid !== newProps.data.fillingid) {
            this.setState({
                type: newProps.data.type,
                weight: newProps.data.weight,
                cost: newProps.data.cost
            })
        }
    }

    render() {

        return (
            <div>

                <Form.Row>
                    <Col sm={6}>
                        <Form.Group controlId="type">
                            <Form.Label>Начинка</Form.Label>
                            <Form.Control as="select" custom onChange={this.handleChange} value={this.state.type}>
                                {types.map(n =>
                                    <option>{n}</option>)}

                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="weight">
                        <Form.Label>Вес</Form.Label>
                        <Form.Control type="" placeholder="" onChange={this.handleChange} value={this.state.weight} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="cost">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control type="number" placeholder="" onChange={this.handleChange} value={this.state.cost} />
                    </Form.Group>

                </Form.Row>

            </div >

        )
    }
}