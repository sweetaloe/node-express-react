import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';


export default class GraphComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartOptions: {
                chart: {
                    type: 'spline'
                },
                xAxis: {
                    categories: [],
                },
                series: [
                    { data: [] }
                ],
                plotOptions: {
                    series: {
                        marker: {
                            enabled: false,
                            states: {
                                hover: {
                                    enabled: true,
                                    radius: 3
                                }
                            }
                        },
                        point: {
                            events: {
                                mouseOver: this.setHoverData.bind(this)
                            }
                        }
                    }
                }
            }
        };
    }

    setHoverData = (e) => {

        this.setState({ hoverData: e.target.category })
    }

    updateSeries = () => {


        axios.get('http://localhost:5000/graph', {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000/graph'
            }
        })
            .then(res => {
               
                this.setState({
                    chartOptions: {
                        xAxis: {
                            categories: res.data.x,
                        },
                        series: [
                            { 
                                name: 'Sin',
                                data: res.data.y[0] },
                            { 
                                name: 'Cos',
                                data: res.data.y[1] }
                        ]
                    }
                });

            })


    }


    render() {
        const { chartOptions } = this.state;

        return (
            <div>
                <h1 align="center"></h1>
                <h4 id="lol" align="center">Текст</h4>
                <div align="center"><button type="button" class="btn btn-success" onClick={this.updateSeries.bind(this)}>Выполнить скрипт</button></div>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />
            </div>
        )
    }
}