import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';

const cream = ["масленный", "заварной", "творожный", "сметанный"]
const colors = ["красный", "синий", "черный", "желтый", "розовый", "заленый"]

export default class DecorationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tablename: "decorations",
            cream: this.props.data.cream,
            type: this.props.data.type,
            color: this.props.data.color,
            cost: this.props.data.cost
        }
    }
    static defaultProps = {
        data: {
            cream: "",
            type: "",
            color: "",
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
        if (this.props.data.decorationid == "")
            this.setState({
                cream: cream[0],
                color: colors[0]
            })
        else
            this.setState({
                cream: this.props.data.cream,
                type: this.props.data.type,
                color: this.props.data.color,
                cost: this.props.data.cost
            })
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.data.decorationid !== newProps.data.decorationid) {
            this.setState({
                cream: newProps.data.cream,
                type: newProps.data.type,
                color: newProps.data.color,
                cost: newProps.data.cost
            })
        }
    }

    render() {

        return (
            <div>

                <Form.Row>
                    <Form.Group as={Col} controlId="cream">
                        <Form.Label>Выберите крем</Form.Label>
                        <Form.Control as="select" custom onChange={this.handleChange} value={this.state.cream}>
                            {cream.map(n =>
                                <option>{n}</option>)}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="type">
                        <Form.Label>Тип декорации</Form.Label>
                        <Form.Control type="" placeholder="" onChange={this.handleChange} value={this.state.type}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="color">
                        <Form.Label>Цвет</Form.Label>
                        <Form.Control as="select" custom onChange={this.handleChange} value={this.state.color}>
                            {colors.map(n =>
                                <option>{n}</option>)}

                        </Form.Control>
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