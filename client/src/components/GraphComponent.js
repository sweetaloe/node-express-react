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
            dataType: ["1"],

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
                    scrollbar: {
                        enabled: true
                    }
               
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

                                    axios.get('http://localhost:5000/graph/plot', {
                                        headers: {
                                            'Access-Control-Allow-Origin': 'http://localhost:3000/graph/plot'
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

    addSeries = (e) => {
        e.preventDefault();
        let { series } = this.state.chartOptions;

        series.push({
            data: []
        }
        );

        this.setState({
            chartOptions: {
                series
            }
        });
    }

    updateSeries = () => {
        var link = 'http://localhost:5000/graph/plot'
        var link2 = 'http://localhost:3000/graph/plot'

        if (this.state.dataType != [""]) {
            var graphType = ""
            this.setState({
                chartOptions: {
                    series: []
                }
            });

            for (var i = 0; i < this.state.dataType.length; i++) {
                graphType = this.state.dataType[i]

                axios.get(link, {
                    headers: {
                        'Access-Control-Allow-Origin': link2
                    },
                    params: { 'data': graphType }
                })
                    .then(res => {
                        let { series } = this.state.chartOptions;


                        series.push({
                            name: res.data.title,
                            zIndex: 1,
                            data: res.data.values,
                            turboThreshold: 0
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
                                data: res.data.ranges
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

        }
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
            dataType: [e.target.value]
        })
    }

    handleToggleChange = (e) => {
        var select = document.getElementById("exampleFormControlSelect1")
        if (e.target.checked) {
            select.disabled = true
            this.setState({
                dataType: [""]
            })
        }
        else {
            select.disabled = false
            this.setState({
                dataType: [select.value]
            })
        }

    }
    handleCheckboxClick = (e) => {
        if (e.target.checked) {
            var a = this.state.dataType.concat(e.target.value)
            a = a.filter(el => el != "")
            a = a.sort()
            this.setState({
                dataType: a
            })
        }
        else {
            var a = this.state.dataType
            a = a.filter(el => el != e.target.value)
            a = a.sort()
            this.setState({
                dataType: a
            })
        }
    }

    render() {
        const { chartOptions } = this.state;

        return (
            <div>
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