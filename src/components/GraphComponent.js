import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);

export default class GraphComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chartOptions: {
                title: {
                },

                chart: {
                    type: 'spline',
                    zoomType: 'xy'
                },
                xAxis: {
                    categories: [],
                },
                series: [
                    { data: [] }
                ],

                exporting: {
                    enabled: true,
                    buttons: {
                        contextButton: {
                            menuItems: [{
                                text: 'Скачать PNG',
                                onclick: function () {
                                    this.exportChart({
                                        type: 'image/png'
                                    });
                                }
                            }, {
                                text: 'Скачать JPEG',
                                onclick: function () {
                                    this.exportChart({
                                        type: 'image/png'
                                    });
                                }
                            },
                            { separator: true },
                            {
                                text: 'Скачать JSON',
                                style:{
                                    fontSize:'20px'
                                },
                                onclick: function () {
                                    this.exportChart({
                                        type: 'image/png'
                                    });
                                },
                            }],

                            text: 'Скачать',

                            style: {
                                'stroke-width': 1,
                                stroke: 'silver',
                                height: 20,
                                width: 70,
                                fontSize: 20
                            }

                        }
                    }


                },
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
                        title: {
                            text: res.data.title
                        },

                        xAxis: {
                            categories: res.data.x,
                        },
                        series: [
                            {
                                name: 'Sin',
                                data: res.data.y[0]
                            },
                            {
                                name: 'Cos',
                                data: res.data.y[1]
                            }
                        ]
                    }
                });

            })


    }



    render() {
        const { chartOptions } = this.state;

        return (

            <div>

                <h1 ></h1>
                <h4>Текст</h4>

                <div class="btn-group">
                    <button type="button" class="btn btn-success" onClick={this.updateSeries.bind(this)}>Построить график</button>

                </div>
                <h4 id="lol" align="center">Текст</h4>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />

            </div>

        )
    }
}