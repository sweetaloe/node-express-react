import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);
//onClick={this.updateSeries.bind(this)}>Построить график</but
export default class GraphComponent extends Component {


    constructor(props) {
        super(props);


        this.state = {
            dataType: "1",

            chartOptions: {

                title: {
                    text: "График пока что пуст"
                },

                chart: {
                    type: 'spline',
                    zoomType: 'xy',
                    borderColor: '#222C35',
                    borderWidth: 4,
                    type: 'line',
                    spacingLeft: 20,
                    spacingRight: 20,
                    spacingTop: 20,
                    spacingBottom: 20
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
                                    radius: 2
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
        var link = 'http://localhost:5000/graph/plot'
        var link2 = 'http://localhost:3000/graph/plot'
        axios.get(link, {
            headers: {
                'Access-Control-Allow-Origin': link2
            },
            params: { 'a': this.state.dataType }
        })
            .then(res => {

                if (this.state.dataType == "1" || this.state.dataType == "2")
                    this.setState({

                        chartOptions: {
                            title: {
                                text: res.data.title
                            },
                            xAxis: {
                                categories: res.data.yearmonth
                            },
                            yAxis: {
                                title: {
                                    text: 'Sunspot number'
                                }
                            },
                            tooltip: {
                                crosshairs: true,
                                shared: true
                            },
                            series: [
                                {
                                    name: 'Total Sunspot Number',
                                    zIndex: 1,
                                    data: res.data.value,
                                }
                            ]
                        }
                    });
                else
                    this.setState({
                        chartOptions: {
                            title: {
                                text: res.data.title
                            },
                            xAxis: {
                                categories: res.data.yearmonth
                            },
                            yAxis: {
                                title: {
                                    text: 'Sunspot number'
                                }
                            },
                            tooltip: {
                                crosshairs: true,
                                shared: true
                            },
                            series: [
                                {
                                    name: 'Forecasted Value',
                                    zIndex: 1,
                                    data: res.data.value,
                                },
                                {
                                    type: 'arearange',
                                    name: 'Uncertainty',
                                    linkedTo: ':previous',
                                    lineWidth: 0,
                                    fillOpacity: 0.3,
                                    zIndex: 0,
                                    data: res.data.ranges
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
                    text: this.state.dataType.toString()
                },
            }
        })
    }

    handleSelectChange = (e) => {
        this.setState({
            dataType: (e.target.value)
        })
    }
    handleToggleChange = (e) => {
        var select = document.getElementById("exampleFormControlSelect1")
        if (e.target.checked) {
            select.disabled = true
            this.setState({
                dataType: ''
            })
        }
        else {
            select.disabled = false
            this.setState({
                dataType: select.value
            })
        }

    }
    handleCheckboxClick = (e) => {
        if (e.target.checked)
            this.setState({
                dataType: this.state.dataType + e.target.value
            })
        else {
            var a = this.state.dataType.replace(e.target.value, '')
            this.setState({
                dataType: a
            })
        }
    }

    render() {
        const { chartOptions } = this.state;

        return (

            <div>

                <h1 ></h1>
                <h4 class="mt-5 text-center">Визуализация данных</h4>

                <div id="chooseDataForm" class="mt-3">
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
                            <button id="startButton" type="button" class="btn btn-success" onClick={this.updateSeries.bind(this)}>Построить график</button>
                        </div>
                    </div>


                    <div class="custom-control custom-switch">
                        <input type="checkbox" class="custom-control-input" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" id="customSwitch1" onClick={this.handleToggleChange.bind(this)} />
                        <label class="custom-control-label" for="customSwitch1">Построить несколько данных на одном графике</label>
                    </div>

                    <div class="collapse" id="collapseExample">
                        <div class="card card-body">

                            <div class="row">

                                <div class="col-6">

                                    <label class="" for="databox1">Данные</label>
                                    <div id="databox1">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="1" onClick={this.handleCheckboxClick.bind(this)} />
                                            <label class="form-check-label" for="inlineCheckbox1">Monthly mean total sunspot number</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="2" onClick={this.handleCheckboxClick.bind(this)} />
                                            <label class="form-check-label" for="inlineCheckbox2">13-month smoothed monthly total sunspot number</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-6">
                                    <label class="" for="databox2">Предсказания</label>
                                    <div id="databox2">
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="3" onClick={this.handleCheckboxClick.bind(this)} />
                                            <label class="form-check-label" for="inlineCheckbox3">Standard method prediction (Kalman)</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="4" onClick={this.handleCheckboxClick.bind(this)} />
                                            <label class="form-check-label" for="inlineCheckbox4">Combined method prediction (Kalman)</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input" type="checkbox" id="inlineCheckbox5" value="5" onClick={this.handleCheckboxClick.bind(this)} />
                                            <label class="form-check-label" for="inlineCheckbox5">McNish & Lincoln method prediction (Kalman)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="mt-5">

                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div>
            </div>

        )
    }
}