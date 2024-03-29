import React, { Component } from 'react'
import axios from 'axios'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);


export default class VisualisationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                yAxis: {
                    title: {
                        text: "Число пятен"
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                series: [],

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
                                        type: 'image/jpeg'
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

                                    var graphType = [];
                                    var grID = 0

                                    for (var i = 0; i < this.series.length; i++) {
                                        grID = this.series[i].options.id
                                        if (grID < 6)
                                            graphType.push(grID)
                                    }

                                    var dataJson = {
                                        title: "Sunspot number",
                                        charts: []
                                    }

                                    var promises = []
                                    for (var i = 0; i < graphType.length; i++) {
                                        promises.push(
                                            axios.get('/graph/plot', {
                                                params: { 'data': graphType[i] }
                                            })
                                                .then(res => {
                                                    dataJson.charts.push(
                                                        {
                                                            name: res.data.title,
                                                            dataType: res.data.titleY,
                                                            data: res.data.values
                                                        }
                                                    )
                                                })
                                        )
                                    }

                                    Promise.all(promises).then(() => {
                                        console.log("все промисы отработали")
                                        const url = window.URL.createObjectURL(new Blob([JSON.stringify(dataJson)]));
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', `${dataJson.title}.json`);
                                        document.body.appendChild(link);
                                        link.click();
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
                                    radius: 1
                                }
                            }
                        } 
                    }
                }
            }
        };

    }



    updateSeries = (graphType) => {

        axios.get('/graph/plot', {

            params: { 'data': graphType }
        })
            .then(res => {
                let { series } = this.state.chartOptions;

                series.push({
                    name: res.data.title,
                    zIndex: 1,
                    data: res.data.values,
                    turboThreshold: 0,
                    id: graphType
                }
                );
                if (graphType != "1" && graphType != "2") {
                    series.push({
                        type: 'arearange',
                        name: 'Uncertainty',
                        linkedTo: ':previous',
                        lineWidth: 0,
                        fillOpacity: 0.1,
                        zIndex: 0,
                        data: res.data.ranges,
                        id: graphType + 10,
                        marker: {
                            enabled: false
                        }
                    })
                }
                this.setState({
                    chartOptions: {
                        title: { text: "Число солнечных пятен" },
                        series
                    }
                });

            })
    }



    addSeries = (graphType) => {

        this.updateSeries(graphType)
    }

    deleteSeries = (graphType) => {

        let { title, series } = this.state.chartOptions;
        var newseries = series.filter(item => item.id != graphType);
        if (graphType != 1 && graphType != 2)
            newseries = newseries.filter(item => item.id != graphType + 10);
        series = newseries
        if (series.length == 0)
            title = { text: "График пока что пуст" }
        else
            title = { text: "Число солнечных пятен" }
        this.setState({
            chartOptions: {
                title,
                series
            }
        });
    }


    handleCheckboxClick = (e) => {
        if (e.target.checked)
            this.addSeries(e.target.value)
        else
            this.deleteSeries(e.target.value)
    }

    render() {
        const { chartOptions } = this.state;

        return (

            <div>
                <h1 ></h1>
                <h4 class="mt-5 text-center">Визуализация данных</h4>

                <div id="chooseDataForm" class="mt-3">

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

                <div class="mt-5">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div>
            </div >

        )
    }
}