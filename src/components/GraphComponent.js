import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);
//onClick={this.updateSeries.bind(this)}>Построить график</but
export default class GraphComponent extends Component {


    constructor(props) {
        super(props);

       

        this.state = {


            chartOptions: {
                title: "",

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
                                style: {
                                    fontSize: '20px'
                                },
                                onclick: function () {

                                    axios.get('http://localhost:5000/graph', {
                                        headers: {
                                            'Access-Control-Allow-Origin': 'http://localhost:3000/graph'
                                        }
                                    })
                                        .then(res => {

                                            // 2. Create blob link to download
                                            const url = window.URL.createObjectURL(new Blob([JSON.stringify(res)]));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', `${res.data.title}.json`);  // 3. Append to html page
                                            document.body.appendChild(link);  // 4. Force download
                                            link.click();  // 5. Clean up and remove the link
                                            link.parentNode.removeChild(link);
                                        })
                                }
                            }
                            ],

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

    showVariant = () => {
        this.setState({
            chartOptions: {
                title: {
                    text: ""
                },
            }
        })
    }

    handleSelectChange = (e) => {
        

    }

    render() {
        const { chartOptions } = this.state;

        return (

            <div>

                <h1 ></h1>
                <h4>Графики какой то странной активности солнца или чего то ещё</h4>

                <div id="chooseDataForm">
                    <label for="exampleFormControlSelect1">Выберите данные</label>
                    <div class="form-row">
                        <div class="col-5">
                            <div class="form-group">
                                <select class="form-control" id="exampleFormControlSelect1" onChange={this.handleSelectChange.bind(this)} >
                                    <option value="1">Monthly mean total sunspot number</option>
                                    <option value="2">13-month smoothed monthly total sunspot number</option>
                                    <option value="3">Standard method prediction (Kalman)</option>
                                    <option value="4">Combined method prediction (Kalman)</option>
                                    <option value="5">McNish & Lincoln method prediction (Kalman)</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <button id="startButton" type="button" class="btn btn-success" onClick={this.showVariant.bind(this)}>Построить график</button>
                        </div>
                    </div>
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