import React, { Component } from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';


export default class TableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: "",
            data: ""
        }
    }
    componentDidMount = () => {
    }
    getElements = (elem) => {
        var list = [];
        for (var el in elem) {
            list.push(<td>{elem[el]}</td>);
        }
        return list;
    }
    render() {
        return (

            <div>
                <h5 class="text-center">Таблица {this.props.name}</h5>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            {Array.prototype.map.call(Object.keys(this.props.data[0]), el =>
                                <td>{el}</td>
                            )}

                        </tr>
                    </thead>
                    <tbody>
                        {Array.prototype.map.call(Object.values(this.props.data), elem =>
                            <tr>
                                {this.getElements(elem)}

                            </tr>

                        )}

                    </tbody>
                </Table>
            </div >

        )
    }
}