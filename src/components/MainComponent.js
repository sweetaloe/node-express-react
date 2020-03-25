import React, { Component } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import img1 from '../pictures/download.svg'
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);

export default class MainComponent extends Component {


    constructor(props) {
        super(props);



        this.state = {
            chartOptions: {
                title: {

                },
                exporting: {
                    enabled: true,
                    menuItemDefinitions: {
                        // Custom definition
                        downloadJSON: {
                            onclick: function () {
                                this.exportChart({
                                    type: 'json'
                                })
                            },
                            text: 'Скачать JSON'
                        },
                        downloadPNG: {
                            text: 'Скачать PNG'
                        },
                        downloadJPEG: {
                            text: 'Скачать JPEG'
                        }


                    },
                    buttons: {
                        
                        contextButton: {
         
                            text: 'Сохранить',
                            textsize:20,
                            symbol: 'menu',
                            symbolStroke: '#0aa0aa',
                            menuItems: ['downloadPNG', 'downloadJPEG', 'separator', 'downloadJSON']
                            
                            
                        }
                    }
                },
                chart: {
                    type: 'spline',
                    zoomType: 'xy'
                },
                xAxis: {
                    categories: ['h', 'o', 'h', 'o'],
                },
                series: [
                    { data: [1, 2, 3, 4] }
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


    }
    render() {

        const { chartOptions } = this.state;

        return (

            <div>
                <button type="button" class="btn btn-success" onClick={this.updateSeries.bind(this)}>Построить график</button>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                />


            </div>
        )
    }
}
