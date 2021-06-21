import React, { Component } from 'react'
import axios from 'axios'
import { Tab, TabContainer, ListGroup, ListGroupItem, Col, Row, Form, Button } from 'react-bootstrap';


export default class CakeForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tablename: "cakes",
            amount: this.props.data.amount,
            sizeWidth: this.props.data.sizeWidth,
            sizeHeight: this.props.data.sizeHeight,
            sizeLength: this.props.data.sizeLength,
            decoration: this.props.data.decoration,
            filling: this.props.data.filling,
            cost: this.props.data.cost
        }
    }
    static defaultProps = {
        data: {
            amount: "",
            sizeWidth: "",
            sizeHeight: "",
            sizeLength: "",
            decoration: "",
            filling: "",
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
        if (this.props.data.cakeid == "")
            this.setState({
                decoration: Object.values(this.props.decoration[0])[0],
                filling: Object.values(this.props.filling[0])[0]
            })
        else {
            this.setState({
                amount: this.props.data.amount,
                sizeWidth: this.props.data.sizeWidth,
                sizeHeight: this.props.data.sizeHeight,
                sizeLength: this.props.data.sizeLength,
                decoration: this.props.data.decoration,
                filling: this.props.data.filling,
                cost: this.props.data.cost
            })
        }

    }
    getDefaultDecoration = () => {
        var res = []
        Array.prototype.map.call(this.props.decoration, dec => {
            if (dec._id == this.props.data.decoration) {
                res.push(<option id={dec._id} selected>{dec.type + ", крем: " + dec.cream + ", цвет: " + dec.color}</option>)

            }
            else {
                res.push(<option id={dec._id} >{dec.type + ", крем: " + dec.cream + ", цвет: " + dec.color}</option>)
            }
        }
        )
        return res
    }
    getDefaultFilling = () => {
        var res = []
        Array.prototype.map.call(this.props.filling, fil => {
            if (fil._id == this.props.data.filling) {
                res.push(<option id={fil._id} selected>{fil.type + ", вес: " + fil.weight}</option>)

            }
            else {
                res.push(<option id={fil._id}>{fil.type + ", вес: " + fil.weight}</option>)
            }
        }
        )
        return res
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.data.cakeid !== newProps.data.cakeid) {
            this.setState({
                amount: newProps.data.amount,
                sizeWidth: newProps.data.sizeWidth,
                sizeHeight: newProps.data.sizeHeight,
                sizeLength: newProps.data.sizeLength,
                decoration: newProps.data.decoration,
                filling: newProps.data.filling,
                cost: newProps.data.cost
            })
        }
    }

    decorationSelectChange = (e) => {
        this.setState({ decoration: e.target.selectedOptions[0].id })
    }
    fillingSelectChange = (e) => {
        this.setState({ filling: e.target.selectedOptions[0].id })
    }
    render() {


        return (
            <div>
                <Form.Row>
                    <Form.Group as={Col} controlId="amount">
                        <Form.Label>Кол-во слоёв</Form.Label>
                        <Form.Control type="number" placeholder="" onChange={this.handleChange} value={this.state.amount} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="sizeLength">
                        <Form.Label>Размер: длина(мм)</Form.Label>
                        <Form.Control type="number" placeholder="" onChange={this.handleChange} value={this.state.sizeLength} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="sizeWidth">
                        <Form.Label>Размер: ширина(мм)</Form.Label>
                        <Form.Control type="number" placeholder="" onChange={this.handleChange} value={this.state.sizeWidth} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="sizeHeight">
                        <Form.Label>Размер: высота(мм)</Form.Label>
                        <Form.Control type="number" placeholder="" onChange={this.handleChange} value={this.state.sizeHeight} />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Выберите декорации</Form.Label>
                        <Form.Control as="select" custom onChange={this.decorationSelectChange.bind(this)}>
                            {this.getDefaultDecoration()}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="decoration">
                        <Form.Label>ID Декорации</Form.Label>
                        <Form.Text>{this.state.decoration}</Form.Text>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="">
                        <Form.Label>Выберите начинку</Form.Label>
                        <Form.Control as="select" custom onChange={this.fillingSelectChange.bind(this)}>
                            {this.getDefaultFilling()}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="filling">
                        <Form.Label>ID Начинки</Form.Label>
                        <Form.Text>{this.state.filling}</Form.Text>
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Col sm={4}>
                        <Form.Group controlId="cost">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control type="number" placeholder="Введите цену" onChange={this.handleChange.bind(this)} value={this.state.cost} />
                        </Form.Group>
                    </Col>
                </Form.Row>
            </div >

        )
    }
}